from flask import Flask, jsonify
import boto3
from werkzeug.exceptions import NotFound
import os
import socket
from kazoo.client import KazooClient
from kazoo.client import KazooState
import logging

# set environment
ENV_HOST_IP = os.environ.get("HOST_IP", "localhost")
ENV_HOST_PORT = os.environ.get("PORT_TCP_80", "8888")
ENV_ZOOKEEPER_IP = os.environ.get("ZOOKEEPER_IP", socket.gethostbyname(socket.gethostname()))
ENV_ZOOKEEPER_PORT = os.environ.get("ZOOKEEPER_PORT", "2181")

SERVER_NAME = ENV_HOST_IP + ":" + ENV_HOST_PORT

print(ENV_ZOOKEEPER_IP)

app = Flask(__name__)
#zk = KazooClient(hosts=ENV_ZOOKEEPER_IP + ":" + ENV_ZOOKEEPER_PORT)
zk = KazooClient()

# kazoo handler

def my_listener(state):
    if state == KazooState.LOST:
        # Register somewhere that the session was lost
        print("LOST")
    elif state == KazooState.SUSPENDED:
        # Handle being disconnected from Zookeeper
        print("SUSPENDED")
    elif state == KazooState.CONNECTED:
        # Handle being connected/reconnected to Zookeeper
        print("zookeeper connected\n")
        #ret = zk.ensure_path("/servers/")
        #print(ret)

zk.add_listener(my_listener)


# flask hander

@app.route('/', methods=['GET'])
def hello():
    return """
<pre>
Hello, World!

Public Address: %s:%s
</pre>""" % (ENV_HOST_IP, ENV_HOST_PORT)

@app.route('/activate', methods=['GET'])
def activate():
    print("/servers/" + ENV_HOST_IP)
    zk.create("/servers/" + ENV_HOST_IP, b"hi", None, True)
    return "activated"


if __name__ == '__main__':
    logging.basicConfig()

    zk.start()
    zk.ensure_path("/servers/")
    
    print('Server Start: {0}\n'.format(SERVER_NAME))

    app.run(host='0.0.0.0', port=int(ENV_HOST_PORT), debug=True)
