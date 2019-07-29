import os
import socket

# set environment

HOST_IP = os.environ.get("HOST_IP", "localhost")
HOST_PORT = os.environ.get("PORT_TCP_80", "8888")
ZOOKEEPER_IP = os.environ.get("ZOOKEEPER_IP", socket.gethostbyname(socket.gethostname()))
ZOOKEEPER_PORT = os.environ.get("ZOOKEEPER_PORT", "2181")
