# file-download-1

* 문제 Description
  * File Download 취약점이 존재하는 웹 서비스입니다.\
  flag.py를 다운로드 받으면 플래그를 획득할 수 있습니다.

# 문제 분석 및 해결
* 분석
  * 문제로 제공된 python file을 살펴보면서, 각각의 route함수를 먼저 살펴봄
  * main
    * 기존에 /upload directory가 있는지 확인 후 있으면 지운 뒤 다시 만든다.
  * 각 route mapping
    * /
      * index.html을 띄워줌
        * 내부에서는 현재 /upload directory 내부에 있는 file 들을 list로 보여줌
        * 해당 list를 click 시 /read?name={file이름} request call을 보냄
          ```HTML
          <li><a href="/read?name={{ file }}">{{ file }}</a></li>
          ``` 
    * /upload
      * get의 경우
        * upload.html그냥 띄워줌
      * post의 경우
        * form에서 file name과 contents를 받아서 /upload에 file을 만들어줌
        * file 이름에 ..이 들어간 경우엔 upload하지 못하게 됨
    * /read
      * request.args.get("name")으로 file 이름을 받아서 해당 file을 열고, read.html에서 file name과 file의 contents를 보여줌

* 해결
  * 먼저 /upload에서 제목 memo , content 12345로 file 하나를 만들도록 함
  * main page에서 해당 memo를 click 한 후 나오는 url에서 name parameter를 ../flag.py로 바꿔줌
    * dreamhack 접속 Page URL/read?name=../flag.py
  * flag 발견!!!!!
  * 이후에 생각해보니 따로 파일을 만들어서 저장하는 과정은 없이 바로 request를 dreamhack 접속 Page URL/read?name=../flag.py로 하면 됨 

* 겪었던 문제
  * 처음 문제에서 flag.py를 다운로드 하면 flag를 얻을 수 있다고해서 계속 download를 어떻게 해야할 지 고민을 함
  * 관련해서 엄청 찾아봤음 -> 생각해보니깐 download 후에 확인할 수 있는게 있나..... 고민 -> !!!!!!????? 확인할 수 있는게 download 한 후에 내용 확인하는거 아닌가...? -> 내용확인은 download하지 않고, file contents만 확인하면 되잖아? -> /read?name={filename} 여기서 flag.py를 읽도록 하면 되겠네 -> flag 획득!!!