---
title: "IAM 셋팅 업데이트"
chapter: false
weight: 30
---

{{% notice info %}}
Cloud9은 IAM 자격증명을 다이나믹하게 관리합니다. 이번 실습은 직접 만든 IAM 역할을 이용할 것이기 때문에 이 기능을 끄도록 합니다.
{{% /notice %}}

- 워크샵으로 돌아가서 톱니 아이콘을 클릭하거나 새 탭을 선택하고 Preferences 를 선택합니다.
- **AWS SETTINGS** 을 고르고
- **AWS managed temporary credentials** 을 끕니다.
- Preferences 탭을 닫습니다.
![c9disableiam](/images/c9disableiam.png)

임시 자격증명이 사용되지 않도록 확실히 하기 위해 자격증명 설정파일을 지웁니다.
```
rm -vf ${HOME}/.aws/credentials
```

현재 리전을 기본으로 aws cli 를 설정합니다.:
```
export ACCOUNT_ID=$(aws sts get-caller-identity --output text --query Account)
export AWS_REGION=$(curl -s 169.254.169.254/latest/dynamic/instance-identity/document | jq -r '.region')

echo "export ACCOUNT_ID=${ACCOUNT_ID}" >> ~/.bash_profile
echo "export AWS_REGION=${AWS_REGION}" >> ~/.bash_profile
aws configure set default.region ${AWS_REGION}
aws configure get default.region
```

### IAM 역할 확인

[GetCallerIdentity](https://docs.aws.amazon.com/cli/latest/reference/sts/get-caller-identity.html) CLI 커맨드를 사용하여 Cloud9에서 IAM 역할을 제대로 사용하는지 확인합니다.
```
aws sts get-caller-identity

```

<!--
First, get the IAM role name from the AWS CLI.
```bash
INSTANCE_PROFILE_NAME=`basename $(aws ec2 describe-instances --filters Name=tag:Name,Values=aws-cloud9-${C9_PROJECT}-${C9_PID} | jq -r '.Reservations[0].Instances[0].IamInstanceProfile.Arn' | awk -F "/" "{print $2}")`
aws iam get-instance-profile --instance-profile-name $INSTANCE_PROFILE_NAME --query "InstanceProfile.Roles[0].RoleName" --output text
```
-->

결과 메세지에는 아래 이름이 포함되어 있어야 합니다.:
```output
tic-tac-toe-workshop-admin
```

#### VALID

_Arn_ 에 앞서 만든 역할 이름과 인스턴스 ID가 포함되어있다면 다음으로 진행해도 좋습니다.

```output
{
    "Account": "100280XXXXXX", 
    "UserId": "AROAROWJTDXCGSE7QNRM4:i-054b03469a316c027", 
    "Arn": "arn:aws:sts::100280XXXXXX:assumed-role/tic-tac-toe-workshop-admin/i-054b03469a316c027"
}
```