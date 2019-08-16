---
title: "게임 서버를 파게이트로 띄우기"
date: 2018-08-07T08:30:11-07:00
weight: 2
---

앞서 게임서버는 EC2 타입의 작업으로 띄웠습니다. EC2 타입은 EC2 클러스터를 필요로 합니다. 이번에는 서버리스 타입인 파게이트로 게임서버를 만들어서 띄워보겠습니다.

## 작업 정의 추가

1. **ECS**/**Task Definitions**/tic-tac-toe-server 를 선택합니다.
1. 가장 최근 리비전을 선택합니다. (문서대로 왔다면 tic-tac-toe-server:1) 입니다.
1. 상단의 **Create new revision** 을 선택합니다.
1. 몇가지만 바꿔서 Fargate타입으로 바꿉니다. 아래 내용을 입력하세요.

**Task Definition Name**: tic-tac-toe-server-fargate

**Network Mode**: awsvpc

**Requires compatibilities**: FARGATE 만 선택

**Task memory**: 0.5GB

**Task CPU**: 0.25 vCPU

하단의 **Create** 선택

![Example Service](/images/tic-tac-toe/dedi-fargate-1.png)


새롭게 tic-tac-toe-server-fargate 작업 정의가 생긴것을 볼 수 있습니다.

![Example Service](/images/tic-tac-toe/dedi-fargate-2.png)

## 작업 실행

1. **Cluster**/tic-tac-toe-cluster 를 선택합니다.
1. **Tasks** 탭을 선택하고 **Run new Task**를 선택합니다.
1. 아래처럼 입력합니다.

**Launch type**: FARGATE

**Task Definition**: tic-tac-toe-server-fargate:1

**Number of tasks**: 5

**Cluster VPC**: tic-tac-toe-vpc

**Subnets**: 선택가능한 모든 서브넷

**Security groups**: **Edit선택**

- tic-tac-toe-server-SG 를 만든적 있다면, 이것을 선택합니다.

- 처음이라면

1. **Create new security group**을 선택하고 이름에 tic-tac-toe-server-SG 을 입력합니다.
1. 인바운드 규칙을 CUSTOM TCP 3553로 입력합니다.
1. **Save** 를 선택합니다.

![Example Service](/images/tic-tac-toe/dedi-fargate-3.png)

**Auto-assign public IP**: ENABLED

**Run Task**를 선택하여 작업을 수행합니다.


![Example Service](/images/tic-tac-toe/dedi-fargate-4.png)


## 대시보드에서 확인

콘솔에서 파게이트 게임 서버가 뜨는것을 확인 할 수 있습니다.

이후 대시보드로 돌아가서 보면 파게이트 게임 서버가 추가로 준비하고 있습니다.

![Example Service](/images/tic-tac-toe/dedi-fargate-5.png)


