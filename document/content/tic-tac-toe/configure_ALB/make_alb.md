---
title: "ALB 만들기"
date: 2018-08-07T08:30:11-07:00
weight: 10
---

1. 사이드 메뉴에서 **Load Balancers** 메뉴를 선택하고 **Create Load Balancer**를 선택한다.
1. Application Load Balancer를 선택한다.
1. 아래와 같이 내용을 채운다. 적혀있지 않으면 기본값을 그냥 둔다.

**Name**: matchmaker-ALB

**Availablility Zones** 의 **VPC**: tic-tac-toe-vpc

**Availability Zones**의 모든 항목을 체크.

**Next** 선택

![Example Service](/images/tic-tac-toe/alb-1.png)

HTTPS를 사용하지 않아서 나오는 경고는 무시하고 **Next**선택

1. Security Groups 에서 **Create a new security group** 선택
1. **Security group name**: WebServer-SG  입력
1. 포트 설정은 그대로
1. **Next** 선택

![Example Service](/images/tic-tac-toe/alb-2.png)

Routing 설정에서 아래와 같이 입력

**Target group**: Existing target group

**Name**: matchmaker 선택

![Example Service](/images/tic-tac-toe/alb-3.png)


Review 화면까지 **Next**선택

**Create** 선택하고 ALB 생성


이후 2개의 ALB를 더 만든다. 방식은 위와 동일하며 이름과 **Target group**만 다르다.

- dashboard-ALB

**Name**: dashboard-ALB

**Security Group**: 앞서 만든 WebServer-SG

**Target group**: dashboard

- tic-tac-toe-client-ALB

**Name**: tic-tac-toe-client-ALB

**Security Group**: 앞서 만든 WebServer-SG

**Target group**: tic-tac-toe-client

