---
title: "매치 메이킹 작업 정의"
date: 2018-08-07T08:30:11-07:00
weight: 11
---

1. 서비스에서 ECS로 이동
1. 사이드 메뉴에서 **Task Definitions** 선택하고 **Create new Task Definition** 선택
1. launch type을 **EC2**로 선택하고 **Next step** 선택
1. 아래 내용을 입력합니다.

**Task Definition Name**: matchmaker

**Task Role**: tic-tac-toe-task-role

**Network Mode**: Bridge

**Task execution role**: tic-tac-toe-task-role

**Task memory**: 256

**Task CPU**: 512
![Example Service](/images/tic-tac-toe/task-definition-matchmaker-1.png)

**Add container**를 선택합니다. 컨테이너 정보를 입력하는 모달창이 뜨는데 여기에 아래 내용을 입력합니다.

**Container name**: matchmaker

**Image**: matchmaker 컨테이너 이미지 이름과 리비전을 넣습니다. 100280XXXXXX.dkr.ecr.us-west-2.amazonaws.com/matchmaker:latest 의 형식입니다.

**Port mappings**항목에서 Host는 0, Container Port는 8888을 입력합니다.
![Example Service](/images/tic-tac-toe/task-definition-matchmaker-2.png)

**HELATHCHECK**/**Command**영역에 다음 내용을 넣습니다.
```
CMD-SHELL,curl -f http://localhost:8888/api/health || exit 1
```
다른 수치는 아래 이미지를 참고합니다.
![Example Service](/images/tic-tac-toe/task-definition-matchmaker-3.png)


**ENVIRONMENT** 항목에서 컨테이너에게 넘길 환경변수를 설정합니다.
필요한 환경변수는 3개 입니다.

AWS_REGION: us-west-2

ECS_CLUSTER_NAME: tic-tac-toe-cluster

ECS_TASK_DEFINITION: tic-tac-toe-server

![Example Service](/images/tic-tac-toe/task-definition-matchmaker-4.png)


아래로 내려가서 **Log configuration** 항목의 Auto-configure CloudWatch Logs를 활성화 합니다.

**Add**를 선택합니다. 이미 한번 적용했다면 버튼 이름은 **Update**로 변경됩니다.


**Create** 를 선택해서 작업을 만듭니다.

{{% notice info %}}
마지막에 `Create`를 누르지 않고 창을 닫으면 작업 정의가 만들어지지 않습니다!
{{% /notice %}}