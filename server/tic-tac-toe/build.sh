#!/bin/bash

#$(aws ecr get-login --no-include-email --region ap-northeast-2)

docker build -t tic-tac-toe-server .

#docker tag tic-tac-toe-server:latest 100280XXXXXX.dkr.ecr.ap-northeast-2.amazonaws.com/tic-tac-toe-server:latest

#docker push 100280XXXXXX.dkr.ecr.ap-northeast-2.amazonaws.com/tic-tac-toe-server:latest
