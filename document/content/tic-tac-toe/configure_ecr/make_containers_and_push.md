---
title: "컨테이너로 묶어서 올리기"
date: 2018-08-07T08:30:11-07:00
weight: 10
---

1. 각 프로젝트에 필요한 환경을 다운로드 받습니다. 아래 명령어를 복사하여 Cloud9 터미널에 입력합니다.
```bash
cd ~/environment/tic-tac-toe-workshop/server/matchmaker/
npm install

cd ~/environment/tic-tac-toe-workshop/server/tic-tac-toe/
npm install

cd ~/environment/tic-tac-toe-workshop/client/dashboard/
npm install

cd ~/environment/tic-tac-toe-workshop/client/tic-tac-toe/
npm install
```

전체 프로젝트를 구성하는데 몇분정도 시간이 소요됩니다.


1. Cloud9 워크샵 터미널에서 다음 명령어를 입력합니다.

```bash
cd ~/environment/tic-tac-toe-workshop/server/matchmaker/
./build.sh
```

matchmaker 프로젝트를 빌드하고 컨테이너로 묶어서 ECR에 올라가는것을 볼 수 있습니다.
최초의 이미지 빌드와 푸시에는 시간이 오래 걸리지만 이후에는 캐시를 이용해서 매우 빠르게 진행됩니다.

{{% notice info %}}
만약 중간에 에러가 난다면 앞서 Push 명령어를 build.sh에 복사할때 실수했을 가능성이 높습니다.
다시 한번 확인해보세요.
{{% /notice %}}

에러가 나지 않았다면 ECR 메뉴에서 matchmaker를 선택하여 들어갔을때 새로운 이미지가 추가된것을 볼 수 있습니다.

![Example Service](/images/tic-tac-toe/ecr-5.png)

이후 나머지 3개의 프로젝트도 컨테이너로 묶어서 올립니다.
다음 명령어를 Cloud9에 입력하세요.

```bash
cd ~/environment/tic-tac-toe-workshop/server/tic-tac-toe/
./build.sh

cd ~/environment/tic-tac-toe-workshop/client/tic-tac-toe/
./build.sh

cd ~/environment/tic-tac-toe-workshop/client/dashboard/
./build.sh
```

