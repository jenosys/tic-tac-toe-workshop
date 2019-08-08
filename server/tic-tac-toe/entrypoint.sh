#!/bin/bash -x

set -e

if [ "$1" = "npm" ]; then
    HOST_IP=$(curl --silent --connect-timeout 2 http://169.254.169.254/latest/meta-data/public-ipv4 || echo "0.0.0.0")

    if [ $HOST_IP != "0.0.0.0" ] ; then
        export HOST_IP=$HOST_IP

        # PORT_TCP_XXXX
        result=$(python ecs_get_port.py)
        eval "$result"
    fi
fi

exec "$@"
