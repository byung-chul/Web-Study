# cookie

* 문제 Description
  * 쿠키로 인증 상태를 관리하는 간단한 로그인 서비스입니다.\
admin 계정으로 로그인에 성공하면 플래그를 획득할 수 있습니다.

# 문제 해결
* 문제로 주어진 Server File app.py내부를 살펴보면, / Request 시 \
  Request의 cookie 내용인 username을 이용하여 admin을 확인함
* Server File 내부에서 guest / guest 계정 정보를 이용하여 Login을 1회 진행
  * 위의 작업으로 browser의 내부에 cookie저장 됨
* 개발자 도구 -> Application -> Cookies 내부에서 username에 해당하는 value를 admin으로 변경
* 이후에 / 로 Request 
* 최종적으로 Flag인 DH{7952074b69ee388ab45432737f9b0c56}를 얻을 수 있었음
