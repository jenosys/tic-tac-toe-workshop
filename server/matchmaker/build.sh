#!/bin/bash

#$(aws ecr get-login --no-include-email --region ap-northeast-2)

docker build -t matchmaker .

#docker tag matchmaker:latest 1002807XXXXXX.dkr.ecr.ap-northeast-2.amazonaws.com/matchmaker:latest

#docker push 100280XXXXXX.dkr.ecr.ap-northeast-2.amazonaws.com/matchmaker:latest
