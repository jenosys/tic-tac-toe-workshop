---
title: "워크샵 생성"
chapter: false
weight: 10
---

{{% notice warning %}}
The Cloud9 workspace should be built by an IAM user with Administrator privileges,
not the root account user. Please ensure you are logged in as an IAM user, not the root
account user.
{{% /notice %}}

<!---
{{% notice info %}}
This workshop was designed to run in the **Oregon (us-west-2)** region. **Please don't
run in any other region.** Future versions of this workshop will expand region availability,
and this message will be removed.
{{% /notice %}}
-->

{{% notice tip %}}
Ad blocker나 tracking blocker는 Cloud9 사용에 방해를 줄 수 있습니다. 그러므로 해당 기능을 끄거나, Cloud9 도메인에서 사용하지 않도록 해주세요.
또한 Cloud9 은 쿠키를 필요로 합니다. 화이트리스팅은 다음 링크를 참고바랍니다. [specific domains]( https://docs.aws.amazon.com/cloud9/latest/user-guide/troubleshooting.html#troubleshooting-env-loading).
{{% /notice %}}

### Launch Cloud9 in your closest region:
{{< tabs name="Region" >}}
{{{< tab name="Oregon" include="us-west-2.md" />}}
{{< /tabs >}}

- **Create environment** 을 선택합니다. 
- 이름을 **tic-tac-toe-workshop** 으로 지정하고 나머지는 모두 기본 옵션으로 둡니다.
- 워크샵이 시작되면, **welcome tab** 과 **lower work area** 을 닫고 메인 작업창 메뉴를 통해 새 **terminal** 을 엽니다.:
![c9before](/images/c9before.png)

- 워크샵은 다음과 같은 모습이어야 합니다.:
![c9after](/images/c9after.png)

- 이 테마를 적용하고 싶다면, Cloud9의 메뉴에서 순서대로 선택하세요. **View / Themes / Solarized / Solarized Dark**
in the Cloud9 workspace menu.
