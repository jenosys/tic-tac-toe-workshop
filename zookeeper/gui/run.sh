#!/bin/bash

docker run --rm -d -p 9090:9090 -v zk-web-conf.clj:/.zk-web-conf.clj gui
