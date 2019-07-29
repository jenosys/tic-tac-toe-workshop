#!/bin/bash

$(aws ecr get-login --no-include-email --region ap-northeast-2)

docker build -t dedi-sample .

docker tag dedi-sample:latest 100280769988.dkr.ecr.ap-northeast-2.amazonaws.com/dedi-sample:latest

docker push 100280769988.dkr.ecr.ap-northeast-2.amazonaws.com/dedi-sample:latest
