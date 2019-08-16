---
title: "ECS 작업을 위한 IAM 역할 만들기"
chapter: false
weight: 1
---

ECS 작업이 사용할 IAM 역할을 만듭니다. 

## 역할 생성

1. IAM 에 가서 **Roles** 를 선택합니다.
1. **Create role**을 선택합니다.
1. 위에서부터 순서대로 **AWS service**/**Elastic Container Service**/**Elastic Container Service Task** 를 선택합니다.
![Example Service](/images/tic-tac-toe/iamrole-for-task-1.png)

## 퍼미션 생성


Create role 화면에서 다음 퍼미션을 찾아서 추가합니다.

AmazonEC2ContainerRegistryReadOnly

AmazonECS_FullAccess

AWSCloudMapFullAccess

CloudWatchLogsFullAccess

**Next**를 선택하여 Review 페이지까지 이동합니다.

## 리뷰

**Role name** 에는 tic-tac-toe-task-role 을 입력하고 **Create role**을 선택합니다.
![Example Service](/images/tic-tac-toe/iamrole-for-task-2.png)


