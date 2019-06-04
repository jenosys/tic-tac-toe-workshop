
import logging
import sys
import traceback
import threading
import os

from flask import Flask, jsonify, request
from werkzeug.exceptions import NotFound
import boto3
from kazoo.client import KazooClient
from kazoo.client import KazooState

from State import State
import Env



class Service:
    instance = None

    def __init__(self):
        Service.instance = self

        self.state = State.PROVISION
        logging.basicConfig()        
        self.zk = KazooClient(hosts=Env.ZOOKEEPER_IP + ":" + Env.ZOOKEEPER_PORT)
        self.app = Flask(__name__)
        
    
    def zk_session_handler(self, state):
        if state == KazooState.LOST:
            # Register somewhere that the session was lost
            print("zk session lost")
        elif state == KazooState.SUSPENDED:
            # Handle being disconnected from Zookeeper
            print("zk session suspended")
        elif state == KazooState.CONNECTED:
            # Handle being connected/reconnected to Zookeeper
            print("zk session connected\n")
            self.state = State.READY
    
    
    def activate(self):
        if self.state == State.READY:
            self.state = State.RUN

            self.zk.delete("/ready/" + Env.HOST_IP)
            self.zk.create("/run/" + Env.HOST_IP, self.state.name.encode(), ephemeral=True)

            t = threading.Timer(10, self.stop)
            t.start()
            
            return True
        else:
            return False


    def start(self):
        try:
            self.zk.add_listener(self.zk_session_handler)
            self.zk.start()
            
            self.zk.ensure_path("/ready/")
            self.zk.ensure_path("/run/")
            
            self.zk.create("/ready/" + Env.HOST_IP, self.state.name.encode(), ephemeral=True)

            import Router

            self.State = State.PROVISION
            
            print("Service started")
            self.app.run(host='0.0.0.0', port=int(Env.HOST_PORT), debug=False)

        except Exception:
            exc_type, exc_value, exc_traceback = sys.exc_info()
            traceback.print_exception(exc_type, exc_value, exc_traceback, limit=2, file=sys.stdout)


    def stop(self):
        self.state = State.STOP
        self.zk.stop()

        print("Service shutdown")
        
        os._exit(0)