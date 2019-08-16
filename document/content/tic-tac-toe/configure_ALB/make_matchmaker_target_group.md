---
title: "매치메이커 타겟 그룹 만들기"
date: 2018-08-07T08:30:11-07:00
weight: 3
---

1. EC2 서비스로 넘어갑니다.
1. 좌측 사이드 메뉴에서 **Target Groups**를 선택하고 **Create target group**을 선택하고 아래와 같이 입력합니다.

**Target group name**: matchmaker

**Target type**: instance

**VPC**: tic-tac-toe-vpc

**Port**: 8888

**Health check settings**/**Path**: /api/health

나머지 정보는 기본으로 둡니다.


![Example Service](/images/tic-tac-toe/target_group-matchmaking-1.png)

헬스체크 시간을 단축하기 위해 **Advanced health check settings**의 파라메터를 아래와 같이 수정합니다.

**Healthy threshold**: 2

**Interval**: 10

![Example Service](/images/tic-tac-toe/target_group-2.png)

