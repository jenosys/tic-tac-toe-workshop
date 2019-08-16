---
title: "매치메이커 서비스 만들기"
date: 2018-08-07T08:30:11-07:00
weight: 3
---

매치메이커 서비스는 matchmaker-ALB와 EC2 작업을 연동한 Restful 웹서비스가 될 예정입니다.

매치 메이커 서버에는 서비스 상태를 모니터링하고 변경사항을 클라이언트에게 보내주는 로직이 들어있습니다. 따라서 2개 이상의 서버가 뜨면 동작이 
이상해 질 수 있습니다. 그래서 1개의 작업만 유지되도록 설정했습니다.

1개의 작업이라도 서비스로 등록하면 작업이 비정상 종료되거나 호스트가 비정상 종료되더라도 ECS가 다시 띄워주므로 활용가치가 있습니다.


## 서비스 구성

1. 서비스 생성을 선택합니다.
1. 아래와 같이 입력합니다.

**Launch type**: EC2

**Task Definition**: Family: matchmaker, Revision: 1

**Service name**: matchmaker

**Number of tasks**: 1

다른 옵션은 기본값을 사용합니다.

**Next step** 을 선택합니다.


## 네트워크 구성

아래와 같이 입력합니다.

**Cluster VPC**: tic-tac-toe-vpc

**Subnets**: 선택 가능한 2개의 서브넷 모두 선택

**Security groups**
1. **Edit** 선택
1. **Select existing security group** 선택
1. WebServer-SG 선택

**Auto-assign public IP** ENABLED

**Load balancer type**: Application Load Balancer

**Service IAM role**: 대시보드 서비스를 만들때 자동 생성한 IAM 역할이 있습니다. 이것을 선택합니다.

**Load balancer name**: matchmaker-ALB

**Container to load balance**/**Add to load balancer** 선택

**Production listener port**: matchmaker:0:8888 을 로드밸런서에 추가(Add to load balancer)

**Target group name**: matchmaker

**Enable service discovery integration**: 선택 제거

**Next step** 선택

## 오토 스케일링

Do not adjust the service's desired count 선택

## 리뷰

**Create Service**를 선택하여 서비스 생성


## 서비스 생성 후

서비스가 작업을 만들고 이 작업이 ALB의 헬스체크를 통과하기까지 시간이 조금 걸립니다. 작업의 state가 RUNNING이 된 후에 2~3분을 기다린 후 
http://<ALB 주소>/api/health 를 입력했을때 200이 출력되면 정상입니다.

