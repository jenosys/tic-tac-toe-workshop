---
title: "클라이언트 서비스 만들기"
date: 2018-08-07T08:30:11-07:00
weight: 2
---

클라이언트 서비스는 tic-tac-toe-client-ALB와 FARGATE 작업을 연동한 웹서비스가 될 예정입니다.
앞 페이지의 생성 경험을 살려 아래 값대로 서비스를 생성해 주시기 바랍니다.

## 서비스 구성

**Launch type**: FARGATE

**Task Definition**: Family: tic-tac-toe-client, Revision: 1

**Service name**: tic-tac-toe-client

**Number of tasks**: 2

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

**Load balancer name**: tic-tac-toe-client-ALB

**Container to load balance**/**Add to load balancer** 선택

**Production listener port**: 80:HTTP 선택

**Target group name**: tic-tac-toe-client 선택

**Enable service discovery integration**: 선택 제거

**Next step** 선택

## 오토 스케일링

Do not adjust the service's desired count 선택

## 리뷰

**Create Service**를 선택하여 서비스 생성


## 서비스 생성 후

브라우저 주소창에 tic-tac-toe-client-ALB 의 주소를 넣고 정상 동작하는지 확인합니다.
