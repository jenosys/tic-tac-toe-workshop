---
title: "ECS EC2를 위한 IAM 역할 만들기"
chapter: false
weight: 1
---

ECS 클러스터의 EC2가 사용할 IAM 역할을 만듭니다. 

1. IAM 에 가서 **Roles** 를 선택합니다.
1. **Create role**을 선택합니다.
1. 위에서부터 순서대로 **AWS service**/**EC2**/**Elastic Container Service** 를 선택합니다.
1. 하단에 새롭게 표시되는 Select your use case에서 **EC2 Role for Elastic Container Service**를 선택합니다.
1. **Next: Permissions**를 선택합니다.
![Example Service](/images/tic-tac-toe/iamrole-for-ec2-1.png)

1. 반복적으로 **Next:**를 눌러 Review페이지까지 진행합니다.
1. Role name 에는 tic-tac-toe-ecs-role 을 입력하고 **Create role**을 선택합니다.
![Example Service](/images/tic-tac-toe/iamrole-for-ec2-2.png)


