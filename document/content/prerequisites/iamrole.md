---
title: "워크샵을 위한 IAM 역할 만들기"
chapter: false
weight: 25
---


1. 다음 링크를 따라가서 역할을 만듭니다. [관리자 권한을 포함하는 IAM 역할 생성 페이지](https://console.aws.amazon.com/iam/home#/roles$new?step=review&commonUseCase=EC2%2BEC2&selectedUseCase=EC2&policies=arn:aws:iam::aws:policy%2FAdministratorAccess)
1. **AWS service** 그리고 **EC2** 이 선택됐는지 확인하고, **Next: Permissions** 를 선택합니다.
1. **AdministratorAccess** 가 선택됐는지 확인하고, **Next: Tags** 를 선택합니다.
1. **Next: Review** 를 클릭합니다.
1. 이름에 **tic-tac-toe-workshop-admin** 를 넣고 **Create Role** 를 선택합니다.
![createrole](/images/createrole.png)
