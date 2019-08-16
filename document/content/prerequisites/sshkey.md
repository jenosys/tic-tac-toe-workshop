---
title: "SSH 키 생성하기"
chapter: false
weight: 31
---

SSH키를 생성하기 위해 아래 명령어를 Cloud9에서 수행하세요. 이 키는 앞으로 ECS 클러스터 워커 노드에 접속할때 사용할 것입니다.

```bash
ssh-keygen
```

{{% notice tip %}}
`엔터`를 3번 눌러서 명령어를 완료 하면 됩니다.
{{% /notice %}}

만든 퍼블릭 키를 EC2 리전에 업로드 합니다.:

```bash
aws ec2 import-key-pair --key-name "tic-tac-toe" --public-key-material file://~/.ssh/id_rsa.pub
```