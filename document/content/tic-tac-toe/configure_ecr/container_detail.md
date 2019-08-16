---
title: "프로젝트 알아보기"
date: 2018-08-07T08:30:11-07:00
weight: 11
---

잠시 쉬어가며, 각 프로젝트와 컨테이너를 알아봅니다.


Dashboard

리액트로 만들어진 대시보드 겸 클라이언트 본체 입니다.
게임 클라이언트로 비유하자면 로비에서 채팅을 하거나 상점을 보거나 하는  `상태`를 대표합니다.
대시보드로써는 현재 떠 있는 데디 서버의 리스트와 상태, 몇가지 명령을 내릴 수 있습니다.

빌드 후엔 단순한 웹페이지인데 nginx로 컨텐이너화 시켜서 스태틱 파일을 배포하게 됩니다.
server/Dockerfile을 참고하세요.


MatchMaker

node.js로 만들어진 통합서버 입니다. 대시보드의 서버이기도 하고 매치 메이커기도 하고 모니터링 서버이기도 합니다.
node.js 의 서버 기능으로 Restful API 서비스를 제공하고 WebSocket 서비스를 합니다.


Tic-Tac-Toe 클라이언트

WebSocket을 사용하는 1:1 게임 클라이언트 입니다.
빌드 후에 NginX와 묶어서 클라이언트 파일 배포를 하는 컨테이너가 됩니다.


Tic-Tac-Toe 서버

Tic-Tac-Toe 클라이언트를 받아주는 데디서버입니다.
서버가 뜨거나 죽을때, 유저가 접속할때등 상태가 변할때마다 AWS CloudMap에 내 상태를 기록하여 MatchMaker서버가 데디케이티드 서버들의 상태를 추적하기 쉽게 합니다. 
서버가 뜰때 스스로에 대한 정보를 얻기위해 복잡한 Dockerfile과 entrypoint 를 가지고 있습니다.

{{% notice info %}}
Tic-Tac-Toe 게임은 오픈소스를 가져다 사용했습니다.
사용된 기술이 궁금하신 분들은 직접 방문해보셔도 좋습니다.
[tic-tac-toe multiplayer](https://github.com/endel/tic-tac-toe)
{{% /notice %}}
