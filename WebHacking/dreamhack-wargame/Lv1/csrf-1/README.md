# csrf-1

* 문제 Description
  * 여러 기능과 입력받은 URL을 확인하는 봇이 구현된 서비스입니다.\
    CSRF 취약점을 이용해 플래그를 획득하세요.

# 문제 해결
* 문제로 제공된 python file 내부를 살펴보면서, 각각의 route함수를 먼저 살펴봄
* 각 route mapping
  * /
    * index.html 띄움
    * session_id를 기준으로 username 확인함
    * admin계정으로 로그인 시 Flag나타남
  * /vuln
    * request로 받은 parma이란 이름의 parameter를 화면에 띄움
    * 내부에서 frame, script, on에 대한 XSS공격을 막기 위해 *로 변환하는 Logic이 있음
  * /flag
    * 단순한 GET Request는 관련 html만 띄움
    * POST의 경우, request.form에서 param이란 parameter를 이용하여 check_cerf를 진행함
    * POST request만 해도 admin관련한 session_id가 랜덤하게 생성되어 저장됨
  * /login
    * login 성공 시 session_id 새로 만들고, cookie설정하도록 함
  * change_password
    * parameter로 pw를 받음, 쿠키에 담긴 session_id를 받음
    * session_id를 기준으로 해당되는 username이 있는지 확인함
      * 로그인 기록이 있어야함
    * user의 password를 변경함 
* check_cerf()
  * param과 cookie를 받아서 http://127.0.0.1:8000/vuln?param={urllib.parse.quote(param)} 를 요청함
* 내 Cookie에 admin의 session_id가 담겨있어야함
  * /flag 에서 POST하게 되면, 내부에서 새로만든 admin의 session_id를 이용하여 내가 admin인척 할 수 있음
* /change_password를 이용해 admin의 password를 변경하고, admin으로 Login 해야함
* /flag 내부로 이동하여 param을 입력
  ```HTML
  <img src="http://127.0.0.1:8000/change_password?pw=admin">
  ```