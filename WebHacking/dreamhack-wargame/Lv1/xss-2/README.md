# xss-1

* 문제 Description
  * 여러 기능과 입력받은 URL을 확인하는 봇이 구현된 서비스입니다.\
    XSS 취약점을 이용해 플래그를 획득하세요. 플래그는 flag.txt, FLAG 변수에 있습니다.


# 문제 해결
* 문제로 제공된 python file 내부를 살펴보면서, 각각의 route함수를 먼저 살펴봄
* 각 route mapping
  * /
    * index.html 띄움
  * /vuln
    * request로 받은 parma이란 이름의 parameter를 화면에 띄움
  * /flag
    * 단순한 GET Request는 관련 html만 띄움
    * POST의 경우, request.form에서 param이란 parameter를 이용하여 check_xss를 진행함
  * /memo
    * request에서 memo parameter를 받아서 memo_text를 계속 추가함
* check_xss()
  * param과 cookie를 받아서 http://127.0.0.1:8000/vuln?param={urllib.parse.quote(param)} 를 요청함
* /memo로 가보면, 누가 Hello라고 되어있는 걸 봐선 누가 접속했었음
  * 그 사람 쿠키를 탈취해야함
* /flag 내부로 이동하여 param을 입력
  ```HTML
  <script>location.href = "/memo?memo=" + document.cookie;</script>
  ```