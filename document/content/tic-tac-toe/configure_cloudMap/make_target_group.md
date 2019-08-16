---
title: "타겟 그룹 만들기"
date: 2018-08-07T08:30:11-07:00
weight: 3
---

EC2 서비스로 넘어간다.
타겟 그룹을 선택하고 **Create target group**을 선택하고 아래와 같이 입력한다.

**Target group name**: matchmaker

**Target type**: IP

**VPC**: tic-tac-toe-vpc

**Health check settings**/**Path**: /api/health
![Example Service](/images/tic-tac-toe/target_group-1.png)

헬스체크 시간을 단축하기 위해 **Advanced health check settings**의 파라메터를 아래와 같이 수정한다.


**Healthy threshold**: 3

**Interval**: 10

![Example Service](/images/tic-tac-toe/target_group-2.png)


위와 같은 방법으로 2개의 타겟 그룹을 더 만든다.
달라지는것은 **Target group name**와 **Health check settings**/**Path**다.

**Target group name**: dashboard

**Health check settings**/**Path**: /


**Target group name**: tic-tc-toe-client

**Health check settings**/**Path**: /


![Example Service](/images/tic-tac-toe/target_group-3.png)