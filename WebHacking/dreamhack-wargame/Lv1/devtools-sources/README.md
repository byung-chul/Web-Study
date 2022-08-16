# devtools-source

* 문제 Description
  * 개발자 도구의 Sources 탭 기능을 활용해 플래그를 찾아보세요.


# 문제 해결
* Directory 내부에서 검색을 이용하여 특정 Flag값을 찾을 수 있었음

# 문제 해결 어려웠던 부분
* index.html 내부에서 개발자 도구를 켜고, source tab에서 File들의 매핑이 정상적으로 이뤄지지 않고, 오류가 발생하여 개발자 도구 내에서는 찾을 수 없었음
  * vsCode에서 (command + shift + f)를 이용하여 찾음
* flag를 찾으라고 해서 flag을 이용하여 검색을 하였는데 찾을 수 없었음
  * 기존 문제들에서 나오던 형태인 DH{ 를 이용하여 검색해서 Flag를 찾음
