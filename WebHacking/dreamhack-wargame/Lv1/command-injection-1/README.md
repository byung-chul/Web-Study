# command-injection-1

* 문제 Description
  * 특정 Host에 ping 패킷을 보내는 서비스입니다.\
  Command Injection을 통해 플래그를 획득하세요. 플래그는 flag.py에 있습니다.

# 문제 분석 및 해결
* 분석
  * 문제로 제공된 python file 내부를 살펴보면서, 각각의 route함수를 먼저 살펴봄
  * 각 route mapping
    * /
      * index.html 띄움
    * /ping
      * get request의 경우엔, 단순하게 관련 페이지를  띄워줌
      * post request 시에 host라는 이름의 form에서 data를 가져와서 ping system method를 호출하도록 함
        ```python
        cmd = f'ping -c 3 "{host}"'
        ```
  * ping.html 내부 form 형식
    ```HTML
    <input type="text" class="form-control" id="Host" placeholder="8.8.8.8" name="host" pattern="[A-Za-z0-9.]{5,20}" required>
    ```
    * 일반적인 command Injection으로 form에 작성 시 pattern에서 다 막힘
    
  
* 해결
  * 우선, ping command가 고정되어있고, command Injection으로 추가적인 명령을 실행하기 위해선 form의 pattern부터 처리해야했음
    * chrome 개발자 도구에서 해당 pattern을 지운후에 form 양식을 사용하도록 함
  * 위의 명령어를 보면, "{host}"로 "에 대한 처리가 들어가 있음
  * 다음으로, flag.py의 위치를 찾기 위해 현재 접속한 directory내의 파일들을 확인함
    * 8.8.8.8";ls" 입력
  * flag.py를 현재 directory에서 확인이 가능했음
  * 8.8.8.8"; cat flag.py"
    * 위의 내용을 form안에 입력해서 cat flag.py를 추가적으로 실행할 수 있도록 함