#!/bin/bash -x

set -e

export HOST_IP=$(curl -m 2 http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null)
#HOST_IP=`curl -m 2 http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null`
if [ -z "$HOST_IP" ]; then
    python ecs_get_port.py
    result=$(python ecs_get_port.py)
    eval "$result"
fi

if [ "$#" -eq 0 ]; then
    python /work/hello.py
else
    exec "$@"
fi
