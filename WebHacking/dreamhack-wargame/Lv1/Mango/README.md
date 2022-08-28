# Mango

* 문제 Description
  * 이 문제는 데이터베이스에 저장된 플래그를 획득하는 문제입니다.\
    플래그는 admin 계정의 비밀번호 입니다.\
    플래그의 형식은 DH{…} 입니다.\
    {‘uid’: ‘admin’, ‘upw’: ‘DH{32alphanumeric}’}

# 문제 분석 및 해결
* 분석
  * 문제로 제공된 javascript file(nodejs / express) 내부를 살펴보면서, 각각의 route함수를 먼저 살펴봄
  * 각 route mapping
    * /
      * guest 계정으로 Login을 진행한 결과를 화면에 띄워줌
    * /login
      * get request의 경우엔, query로 들어온 req.query를 filter 함수 내부에서 한번 filtering 진행
        ```
        const BAN = ['admin', 'dh', 'admi'];
        ```
      * mongoDB에 연결해서 user table에서 uid와 upw를 기준으로 find 진행하여 result가 있는 경우에, uid값을 보여줌
      * login에 성공 시 uid만 보여주기 때문에, blind noSQL Injection을 진행해야 함
  * 문제에서 Database 저장 방식에 대해 알려줌
    ```
    flag is in db, {'uid': 'admin', 'upw': 'DH{32alphanumeric}'}
    ```
* 해결
  * Python Script을 이용해서 Brutal로 문제를 해결해야 함
  * 문제에서 32자리수 라는점과 내부가 alphanumeric으로 되어있다는 정보를 줬음
    * 비교할 문자열을 한정 지을 수 있음
      ```python
      ALPHANUMERIC = string.digits + string.ascii_letters
      ```
    * 32자리수를 돌면서 비교할 문자열들을 처음부터 하나씩 비교하도록 함
      ```python
      for i in range(32):
        for ch in ALPHANUMERIC:
      ```
    * response로 넘어온 값 (uid)가 admin인 경우에, 비어있던 문자열에 좀전에 비교한 ALPHANUMERIC[ch]값을 하나씩 추가하도록 함
  * query로 보낼 mongoDB의 regex 구성
    ```python
    response = requests.get(
            f'{HOST}/login?uid[$regex]=ad.in&upw[$regex]=D.{{{flag}{ch}')
    ```
    * uid에 ad가 포함되어 있고, upw가 여태 모은 flag값에 찾을 ch를 붙인 값으로 시작하는 값을 찾도록 함
# 느낀점
* 결국에 중요한것은 regex등을 어떻게 잘 사용하나의 문제가 될듯함
  * 이 부분에 대한 공부가 중요해보임
* 사실상 python code자체는 어려운 부분이 없음