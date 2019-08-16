---
title: "대시보드 서비스 만들기"
date: 2018-08-07T08:30:11-07:00
weight: 1
---

대시보드 서비스는 daboard ALB와 FARGATE 작업을 연동한 웹서비스가 될 예정입니다.

## 서비스 구성

1. **ECS** 서비스로 갑니다.
1. 앞서 만든 tic-tac-toe-cluster를 선택합니다.
1. 탭 메뉴에서 **Services**를 선택하고 **Create**를 선택합니다.
1. 아래와 같이 입력합니다.

**Launch type**: FARGATE

**Task Definition**: Family: dashboard, Revision: 1


{{% notice info %}}
실수 없이 잘 따라오셨다면 dashboard 작업 정의는 1개의 리비전을 가지고 있습니다. 혹 개정을 하셨다면 가장 최신 리비전을 선택하시면 됩니다. 우리는 중간에 dashboard 컨테이너를 새로 묶어서 올린적이 있습니다. 컨테이너 리비전과 작업 정의 리비전은 다른것임을 염두하셔야 합니다. 
{{% /notice %}}

**Service name**: dashboard

**Number of tasks**: 2

다른 옵션은 기본값을 사용합니다.

**Next step** 을 선택합니다.

![Example Service](/images/tic-tac-toe/service-dashbard-1.png)



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

**Service IAM role**: Create new role

**Load balancer name**: dashboard-ALB

**Container to load balance**/**Add to load balancer** 선택

**Production listener port**: 80:HTTP 선택

**Target group name**: dashboard

**Enable service discovery integration**: 선택 제거

**Next step** 선택

![Example Service](/images/tic-tac-toe/service-dashbard-2.png)


![Example Service](/images/tic-tac-toe/service-dashbard-3.png)

## 오토 스케일링

Do not adjust the service's desired count 선택

## 리뷰

**Create Service**를 선택하여 서비스 생성


## 서비스 생성 후

제대로 설정을 하고 서비스를 생성하면, 잠시 후 해당 서비스에서 2개의 FARGATE 작업이 실행됩니다.
state가 PROVISIONING => PENDING => RUNNING 단계로 바뀌고나면 브러우저 주소창에 dashboard ALB의 주소를 입력하여 접속해봅니다.

![Example Service](/images/tic-tac-toe/service-dashbard-4.png)

축하합니다! 성공적으로 첫번째 웹 서비스를 띄웠습니다.
아직 매치메이커 서버가 없기때문에 페이지가 아무런 응답을 하지 않습니다.
계속 진행해서 모든 서비스를 띄워보겠습니다.
