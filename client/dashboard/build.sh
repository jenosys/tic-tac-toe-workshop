#!/bin/bash

#$(aws ecr get-login --no-include-email --region ap-northeast-2)

docker build -t dashboard .

#docker tag dashboard:latest 100280XXXXXX.dkr.ecr.ap-northeast-2.amazonaws.com/dashboard:latest

#docker push 100280XXXXXX.dkr.ecr.ap-northeast-2.amazonaws.com/dashboard:latest
