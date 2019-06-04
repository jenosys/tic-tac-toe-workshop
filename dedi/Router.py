import Env
from Service import Service

service = Service.instance
app = service.app

@app.route('/', methods=['GET'])
def hello():
        return """Address: %s:%s""" % (Env.HOST_IP, Env.HOST_PORT)

@app.route('/activate', methods=['GET'])
def activate():
    if service.activate():
        return "activated"
    else:
        return "fail"

@app.route('/stop', methods=['GET'])
def shutdown():
    service.stop()
    return "shutdown"
