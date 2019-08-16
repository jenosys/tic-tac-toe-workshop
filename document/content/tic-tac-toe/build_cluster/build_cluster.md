---
title: "ECS 클러스터 생성하기"
chapter: true
weight: 2
---

## ECS 클러스터 생성하기

1. 상단의 왼쪽의 **Services** 메뉴를 통해 ECS로 넘어갑니다.
1. 상단 우측 메뉴에서 현재 리전이 **Oregon**인지 확인합니다.
1. 왼쪽 사이드 메뉴에서 **Cluster**를 선택하고 **Create Cluster**를 선택합니다.
1. 클러스터 종류는 **EC2 Linux + Networking** 을 선택하고 **Next step**을 선택합니다.
![Example Service](/images/tic-tac-toe/cluster-build-1.png)
1. **Cluster name** 에 tic-tac-toe-cluster 를 적습니다.
**EC2 instance type**은 m5.2xlarge를 선택합니다.
**Number of instances**는 3을 입력합니다.
**key pair**는 앞서 만든 tic-tac-toe 을 선택합니다.
![Example Service](/images/tic-tac-toe/cluster-build-2.png)

1. **Networking**항목에서 **Create VPC**를 선택해서 새로운 VPC를 생성합니다.
**CIDR block** 및 **Subnet** 설정은 그대로 둡니다.
1. **Container instance IAM role**은 앞서 만든 tic-tac-toe-ecs-role 을 넣습니다.
1. 하단의 **Create**를 선택하여 다음으로 넘어갑니다.
![Example Service](/images/tic-tac-toe/cluster-build-3.png)

1. 클러스터와 VPC가 생성되는데 시간이 조금 필요합니다.
만들어진 VPC 아이디를 기억하고 있으면 편리합니다.

![Example Service](/images/tic-tac-toe/cluster-build-4.png)
