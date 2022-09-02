# image-storage

* 문제 Description
  * php로 작성된 파일 저장 서비스입니다.\
    파일 업로드 취약점을 이용해 플래그를 획득하세요. 플래그는 /flag.txt에 있습니다.

# 문제 분석 및 해결
* 분석
  * 문제로 제공된 php file을 살펴보면서, 각각의 route함수를 먼저 살펴봄
  * 각 route mapping
    * index.php
      * main page에 관련된 php
    * list.php
      * ./uploads/ directory에 있는 file들을 list로 보여줌
      * 각각의 list요소들은 a tag로 해당 file을 open하는 방식으로 linking 되어 있음
    * upload.php
      * file을 입력받아서 해당 file을 ./uploads/에 저장함

* 해결
  * list.php에서 저장되어 있는 file을 실행하여 내가 업로드한 file을 열 수 있음
  * php로 구성된 web shell을 띄워서 shell처럼 사용하도록함
  * web shell의 명령어로 cat /flag.txt 실행
  * flag 발견!!!!!