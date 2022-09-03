# web-ssrf

* 문제 Description
  * flask로 작성된 image viewer 서비스 입니다.\
    SSRF 취약점을 이용해 플래그를 획득하세요. 플래그는 /app/flag.txt에 있습니다.

# 문제 분석 및 해결
* 분석
  * 문제로 제공된 python file을 살펴보면서, 각각의 route함수를 먼저 살펴봄
  * main
    * 현재 directory기준으로 HTTP Server를 하나 만들어서 새로운 thread를 생성하여 돌림
      * Local Server 생성
        ```Python
        local_host = "127.0.0.1"
        local_port = random.randint(1500, 1800)
        local_server = http.server.HTTPServer(
            (local_host, local_port), http.server.SimpleHTTPRequestHandler
        )
        ```
      * thread 분리 후 start
        ```
        def run_local_server():
          local_server.serve_forever()

        threading._start_new_thread(run_local_server, ())
        ```
  * 각 route mapping
    * /
      * index.html을 띄워줌
    * /img_viewer
      * get의 경우
        * img_view.html그냥 띄워줌
      * post의 경우
        * form에서 url을 받아서 해당 url로 request를 보냄 이후 받아온 content를 base64로 encoding하여 img tag에서 보여줌
        * url에 대한 처리
          * form으로 받아온 url[0]이 /이면 현재 실행중인 8000번 port로 request보냄
          * urlparse 이후에 location에 localhost나 127.0.0.1이 있으면 request를 보낼 수 없도록 처리되어 있다.
          ```python
          if url[0] == "/":
            url = "http://localhost:8000" + url
          elif ("localhost" in urlp.netloc) or ("127.0.0.1" in urlp.netloc):
            data = open("error.png", "rb").read()
            img = base64.b64encode(data).decode("utf8")
            return render_template("img_viewer.html", img=img)
          ```

* 해결
  * url form에 먼저 /flag.txt를 입력 해봤음
    * 결과로 나온 base64 encidong 내용 decoding해봄 -> 제대로 나오지 않고 404 error 반환
  * app.py에서 새로운 tread로 생성한 http server에 request를 보내보기로 함
    * host는 127.0.0.1이니 localhost와 동일함
      * image_view에서 해당 값들에 대해 request요청을 막아놔서 우회가 필요함
      * 아래의 값들은 위의 case에서 우회시에 사용하기도 하는 값들
        * http://vcap.me/
        * http://0x7f.0x00.0x00.0x01/
        * http://0x7f000001/
        * http://2130706433/
        * http://Localhost/
        * http://127.0.0.255/
      * http://Localhost/를 사용하기로 함
    * port는 1500 ~ 1800사이 랜덤값
      * pyhon script를 사용하여 brutal force로 돌아가면서 찾아보기로 함
        * 1500 ~ 1800까지 돌아가면서 request를 보내고, 정상적인 값이 돌아오는 것이 맞는 port임
      * 위의 방법으로 특정 port 번호를 얻을 수 있었음
  * img_viewer에서 http://Localhost:특정포트/flag.txt 전송 -> 나온 image source base64 decoding -> flag 획득!!

* 겪었던 문제
  * 왜 image_viewer에서 /flag.txt를 했을 떄, 안되었는지는 아직도 잘 모르겠음
    * SimpleHTTPRequestHandler에 대해 다시한번 알아봐야 할 듯
    * localhost:8000으로 실행한 server와 새로운 thread로 실행한 server가 directory구조가 다른가...?