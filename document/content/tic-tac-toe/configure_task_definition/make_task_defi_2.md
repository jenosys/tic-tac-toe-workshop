---
title: "게임 서버 작업 정의"
date: 2018-08-07T08:30:11-07:00
weight: 12
---

두번째 작업 정의는 tic-tac-toe-server 를 만듭니다.
앞서 matchmaker 작업 정의를 참고하여 아래 항목을 적용한 작업 정의를 만들면 됩니다. 

**launch type**: EC2

**Task Definition Name**: tic-tac-toe-server

**Task Role**: tic-tac-toe-task-role

**Network Mode**: Bridge

**Task execution role**: tic-tac-toe-task-role

**Task memory**: 256

**Task CPU**: 256


**Add container**를 선택합니다. 컨테이너 정보를 입력하는 모달창이 뜨는데 여기에 아래 내용을 입력합니다.

**Container name**: tic-tac-toe-server

**Image**: tic-tac-toe-server 컨테이너 이미지 이름과 리비전을 넣습니다. 100280XXXXXX.dkr.ecr.us-west-2.amazonaws.com/tic-tac-toe-server:latest 의 형식입니다.

**Port mappings**항목에서 Host는 0, Container Port는 3553을 입력합니다.

**HELATHCHECK** 항목은 입력하지 않습니다.

**ENVIRONMENT** 항목에서 컨테이너에게 넘길 환경변수를 설정합니다.
필요한 환경변수는 3개 입니다.

AWS_DEFAULT_REGION: us-west-2

AWS_REGION: us-west-2

NODE_ENV: production

**Log configuration**/**Auto-configure CloudWatch Logs**: 활성화 