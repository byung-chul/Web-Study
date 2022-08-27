# simple-sqli

* 문제 Description
  * 로그인 서비스입니다.\
  SQL INJECTION 취약점을 통해 플래그를 획득하세요. 플래그는 flag.txt, FLAG 변수에 있습니다.

# 문제 분석 및 해결
* 분석
  * 문제로 제공된 python file 내부를 살펴보면서, 각각의 route함수를 먼저 살펴봄
  * 각 route mapping
    * /
      * index.html 띄움
    * /login
      * get request의 경우엔, 단순하게 로그인 페이지를  띄워줌
      * post request 시에 쿼리문 결과의 0번째가 admin인   경우에 Flag를 띄워줌
        ```SQL
        select * from users where userid="{userid}  " and userpassword="{userpassword}"
        ```
  * DATABASE 구성 SQL
    * userid와 userpassword를 column으로 갖는   users라는 table을 만든다 
      ```SQL
      create table users(userid char(100),  userpassword char(100));
      ```
    * 초기 Default data 삽입
      ```SQL
      insert into users(userid, userpassword)   values ("guest", "guest"), ("admin", "  {binascii.hexlify(os.urandom(16)).decode  ("utf8")}");
      ```
* 해결
  * SQL Injection을 사용해서 admin에 관련된 query결과문을 가져오면, 종류에 상관없이 Flag를 얻을 수 있음
  * 위의 /login post 시에 사용하는 sql을 살펴보면, SELECT * 로 되어있기 때문에, userid가 admin이 되도록 하면 admin에 대한 모든것을 가져오기 때문에 flag를 얻을 수 있음
  * /login page로 이동하여 userid에 sql injection이 되도록 입력
    * userid = admin" --
    * password = 아무거나 입력 (xxxxx로 입력함)
    * 내부에서 수행될 SQL문
      ```SQL
      select * from users where userid="admin" --  " and userpassword="xxxxx"
      ```
    * 위의 SQL수행 시 admin의 password에 상관없이 admin의 정보를 전부 가져옴