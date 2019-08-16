---
title: "클라우드 맵 만들기"
date: 2018-08-07T08:30:11-07:00
weight: 10
---

{{% notice info %}}
여기서 만드는 네임스페이스와 서비스이름은 소스에 하드코딩으로 들어가있습니다. 따라서 이름을 정확히 입력해야 합니다. 오타가 생겼다면 삭제하고 다시 만듭니다.
{{% /notice %}}

## 네임스페이스 생성

1. 서비스 에서 AWS Cloud Map 을 선택합니다.
1. **Create namespace** 를 선택합니다.
1. **Namespace name**은 tic-tac-toe 이고 **Instance discovery**타입은 API calls 입니다.
1. **Create namespace**를 선택합니다.
1. 네임스페이스가 생성되는데 시간이 조금 걸립니다.
1. 생성이 완료되면 화면이 갱신됩니다. 기다려도 반응이 없다면 새로고침을 합니다.
1. 생성된 tic-tac-toe 네임스페이스를 클릭해서 들어갑니다.

![Example Service](/images/tic-tac-toe/cloudmap-1.png)

## 서비스 생성

1. **Create service**를 선택합니다.
1. **service name**은 dedi-servers 로 입력합니다.
1. **Health check configuration**은 No health check를 선택합니다.
1. **Create service**를 선택합니다.

![Example Service](/images/tic-tac-toe/cloudmap-2.png)