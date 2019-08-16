---
title: "ALB 만들기"
date: 2018-08-07T08:30:11-07:00
weight: 11
---

## 매치메이커 로드밸런서 생성

### 매치메이커 로드밸런서 설정

1. 사이드 메뉴에서 **Load Balancers** 메뉴를 선택하고 **Create Load Balancer**를 선택한다.
1. Application Load Balancer를 선택한다.
1. 아래와 같이 내용을 채운다. 적혀있지 않으면 기본값을 그냥 둔다.

**Name**: matchmaker-ALB

**Availablility Zones** 의 **VPC**: tic-tac-toe-vpc

**Availability Zones**의 모든 항목을 체크.

**Next** 선택

![Example Service](/images/tic-tac-toe/alb-1.png)

### 보안 설정

HTTPS를 사용하지 않아서 나오는 경고는 무시하고 **Next**선택

### 보안 그룹 설정

1. Security Groups 에서 **Create a new security group** 선택
1. **Security group name**: WebServer-SG  입력
1. 포트 설정은 그대로
1. **Next** 선택

![Example Service](/images/tic-tac-toe/alb-2.png)


### 라우팅 설정

Routing 설정에서 아래와 같이 입력

**Target group**: Existing target group

**Name**: matchmaker 선택

![Example Service](/images/tic-tac-toe/alb-3.png)


Review 화면까지 **Next**선택

### 리뷰

**Create** 선택하고 ALB 생성


## 대시보드 로드밸런서

매치메이커 로드밸런서와 만드는 방식은 동일하며, 파라메터만 다음과 같이 입력한다.


**Name**: dashboard-ALB

**Availablility Zones** 의 **VPC**: tic-tac-toe-vpc

**Availability Zones**의 모든 항목을 체크.

**Security Group**: 앞서 만든 WebServer-SG을 선택한다.

**Target group**: Existing target group

**Name**: dashboard 선택


## 클라이언트 로드밸런서

대시보드 로드밸런서와 만드는 방식은 동일하며, 파라메터만 다음과 같이 입력한다.

**Name**: tic-tac-toe-client-ALB

**Availablility Zones** 의 **VPC**: tic-tac-toe-vpc

**Availability Zones**의 모든 항목을 체크.

**Security Group**: 앞서 만든 WebServer-SG을 선택한다.

**Target group**: Existing target group

**Name**: tic-tac-toe-client 선택

