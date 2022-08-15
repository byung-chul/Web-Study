# devtools-source

* 문제 Description
  * 쿠키와 세션으로 인증 상태를 관리하는 간단한 로그인 서비스입니다.
  * admin 계정으로 로그인에 성공하면 플래그를 획득할 수 있습니다.


# 문제 해결
* 문제로 제공된 python file 내부를 살펴보면, route함수를 통해 경로를 찾을 수 있었음
* 파일을 분석해본 결과
  * session_storage라는 전역변수와 users라는 user의 id, pw정보를 확인함
  * 처음에 sever file이 실행될때, admin의 session id가 생성되고, session_storage에 저장됨
  * /admin 경로를 요청 시 session_storage를 return하여 admin의 session id를 찾을 수 있었음
  * 파일에서 확인한 users 내부에서 id와 pw인 guest/guest 정보를 이용하여 /login으로 접속하여 계정으로 로그인을 하고, browser에 cookie를 저장하도록 함
  * 개발자 도구 -> application -> cookie에서 해당 cookie를 찾은 후 session id를 아까 찾은 admin의 session id로 변경함
  * server file에서 확인한 /경로로 요청하여 Flag값을 찾아냄

# 문제 해결 어려웠던 부분
* 처음에, admin의 session id를 확인하는 부분까지는 전혀 어려움이 없었음
* 이후에 이거를 어떻게 사용하여야 하나 고민하다가 개발자 도구 내부에 cookie를 찾았는데 아무것도 없었음
  * cookie를 server로부터 설정받지 못했으니 당연히 없던거였음
  * server code를 다시 확인하면서, Login에 성공하였을 경우에 response에 set_cookie를 하는곳이 있는 점을 확인함
  * 생각해보니 강의에서 배운 내용임
    * Server에서 set_cookie로 cookie 설정하면, browser에서 받아서 저장함
* guest계정으로 Login 진행한 후 설정되어있는 cookie를 admin의 session id로 바꿔버림