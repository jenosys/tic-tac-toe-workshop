---
title: "서버 준비 하기"
date: 2018-08-07T08:30:11-07:00
weight: 1
---


## 작업 실행

1. **ECS**/**Cluster**/tic-tac-toe-cluster 로 들어갑니다.
1. 탭 메뉴에서 **Tasks**를 선택햅니다.
1. **Run new Task**를 선택합니다.
1. 아래 내용으로 작업을 입력합니다.

**Launch type**: EC2

**Task Definition**: tic-tac-toe-server:1

**Number of tasks**: 10

나머지 값은 기본으로 둡니다.

**Run Task**을 선택합니다.

## 실행 결과

잠시 후 게임 서버들이 실행되는것을 볼 수 있습니다. `새로고침`아이콘을 눌러 상태를 갱신해서 볼 수 있습니다.

모든 작업의 상태가 RUNNING이 되기를 기다립니다.


![Example Service](/images/tic-tac-toe/run-dedis-1.png)

## 클라우드 맵에서 확인하기

1. **AWS Cloud Map** 서비스로 갑니다.
1. **tic-tac-toe**/**dedi-server**를 선택합니다.
1. 방금 띄운 게임 서버들이 자신의 정보를 클라우드 맵에 올린것을 볼 수 있습니다.

![Example Service](/images/tic-tac-toe/run-dedis-2.png)

## 대시보드에서 확인하기

1. 대시보드창으로 돌아갑니다.
1. 왼쪽 사이드 메뉴에서 모니터링을 선택합니다.
1. 준비중인 데디 서버들을 확인합니다.

![Example Service](/images/tic-tac-toe/run-dedis-3.png)