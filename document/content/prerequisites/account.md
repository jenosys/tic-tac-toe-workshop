---
title: "AWS 계정 생성"
chapter: false
weight: 1
---

{{% notice warning %}}
여러분의 계정은 새로운 IAM 역활(role)을 만들거나 다른 퍼미션(permission)을 만들 수 있는 권한이 있어야 합니다.
{{% /notice %}}

1. 관리자 권한이 있는 AWS 계정이 없다면: [여기를 눌러 새로 만드세요](https://aws.amazon.com/getting-started/)

1. Once you have an AWS account, ensure you are following the remaining workshop steps
as an IAM user with administrator access to the AWS account:
[Create a new IAM user to use for the workshop](https://console.aws.amazon.com/iam/home?#/users$new)

1. 사용자 내용을 적습니다:
![Create User](/images/iam-1-create-user.png)

1. Attach the AdministratorAccess IAM Policy:
![Attach Policy](/images/iam-2-attach-policy.png)

1. Click to create the new user:
![Confirm User](/images/iam-3-create-user.png)

1. Take note of the login URL and save:
![Login URL](/images/iam-4-save-url.png)
