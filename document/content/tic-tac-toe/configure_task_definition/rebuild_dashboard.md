---
title: "대시보드 컨테이너 업데이트"
chapter: false
weight: 20
---

dashboard 소스코드에는 접속해야할 matchmaker 주소와 게임 클라이언트를 다운로드 할 주소가 필요합니다.
이 값을 넣어서 다시 빌드로 묶어서 리포지토리에 올리도록 합니다.

1. **EC2** 서비스로 넘어갑니다.
1. 왼쪽 사이드 메뉴에서 **Load Balancers** 를 선택햅니다.
1. matchmaker-ALB 를 선택합니다.
1. 하단에 뜨는 정보중에서 Description / DNS name 을 복사해 놓습니다. 

![Example Service](/images/tic-tac-toe/dashboard-rebuld-1.png)

1. 이번에는 tic-tac-toe-client-ALB 를 선택합니다.
1. 하단에 뜨는 정보중에서 Description / DNS name 을 복사해 놓습니다. 
1. Cloud9 워크샵으로 이동합니다.
1. dashboard 프로젝트 밑에 있는 .env.production 파일을 편집합니다.

```
cd ~/environment/tic-tac-toe-workshop/client/dashboard/
vim .env.production
```

파일에는 리액트 빌드시에 사용하는 REACT_APP_API_URL, REACT_APP_CLIENT_URL 환경변수가 있습니다.
이곳에 앞서 복사해놓은 ALB 주소를 각각 적습니다.

API_URL이 matchmaker-ALB 주소이고, CLIENT_URL 이 tic-tac-toe-client-ALB 주소 입니다.

vim이 익숙치 않으시다면 창을 닫고 왼측에 나타난 .env.production 파일을 더블 클릭 해서 편집하시고 저장하시면 됩니다.

{{% notice info %}}
주소의 시작부분에 http://가 빠지지 않도록 주의하세요.
{{% /notice %}}
{{% notice warning %}}
주소를 잘 넣었는지 확인하시기 바랍니다. 이곳에 정확한 주소를 넣지 않으면 이후에 데모가 제대로 돌아가지 않게 됩니다. 반대로 이후 데모에서 페이지를 찾을 수 없다는 에러가 난다면 이곳을 확인해보시길 바랍니다.
{{% /notice %}}

수정된 dashboard 를 빌드해서 컨테이너로 묶고, 리포지토리에 올립니다. 우리는 이 과정을 build.sh 파일로 묶어놨기 때문에 쉽게 할 수 있습니다. 
아래 명령어를 터미널에 입력합니다.
```
cd ~/environment/tic-tac-toe-workshop/client/dashboard/
sh build.sh
```

명령어 수행이 끝나고 **ECS** 서비스/**Repositories**/**dashboard** 를 가보면 방금 올린 새로운 이미지가 올라온것을 볼 수 있습니다.

![Example Service](/images/tic-tac-toe/dashboard-rebuld-2.png)