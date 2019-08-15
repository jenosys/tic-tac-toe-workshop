#!/bin/bash

#$(aws ecr get-login --no-include-email --region ap-northeast-2)

docker build -t tic-tac-toe-client .

#docker tag tic-tac-toe-client:latest 100280XXXXXX.dkr.ecr.ap-northeast-2.amazonaws.com/tic-tac-toe-client:latest

#docker push 100280XXXXXX.dkr.ecr.ap-northeast-2.amazonaws.com/tic-tac-toe-client:latest
