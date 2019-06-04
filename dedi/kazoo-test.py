from kazoo.client import KazooClient
from kazoo.client import KazooState

zk = KazooClient()
zk.start()
children = zk.get_children('/')
print(children)
ret = zk.ensure_path("/test")
print(ret)
zk.stop()