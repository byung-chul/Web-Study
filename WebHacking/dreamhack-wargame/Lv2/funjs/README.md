# funjs

* Dreamhack CTF Season 1 Round #4에 출시된 문제

* 문제 Description
  * 입력 폼에 데이터를 입력하여 맞으면 플래그, 틀리면 NOP !을 출력하는 HTML 페이지입니다.\
main 함수를 분석하여 올바른 입력 값을 찾아보세요 !

# 문제 해결
* 결국 입력폼 데이터를 어떻게 처리하는지에 대해 파악해야했음
* NOP !을 출력하는 부분을 먼저 찾아서 Reversing으로 분석했음
  * flag 변수가 결국 비교에 사용되는 변수
  * flag 변수는 난독화 되어있긴 하지만, 결국 User가 form에 입력한 변수
* 67번째줄 if문
  * flag의 길이를 확인하는 조건문임
  * 길이가 36가 아니면 예외처리로 빠지게 됨 -> NOP ! 나옴
* 71번째줄 for문
  * flag의 길이를 돌면서 한자리씩 비교함
  * 72번째 줄 if문
    * flag의 한자리 한자리를 비교하는 구문
    * 정확히 뭘 의미하는지는 모르겠지만 flag의 각 자리가 operator[i % operator[_0x374fd6(0x17c)]](_0x4949[i], _0x42931[i])가 되어야 했음
* 개발자 도구 console에 위의 비교 대상을 String으로 변환시켜 완전한 Flag를 얻음
```javascript
result = ''
for (i = 0x0; i < 36; i++){
    result += String.fromCharCode(operator[i % operator[_0x374fd6(0x17c)]](_0x4949[i], _0x42931[i]));
}
```
* 최종적으로 Flag인 DH{cfd4a77a013ea616d3d5cc0ddf87c1ea}를 얻을 수 있었음
* 
# 문제 해결 어려웠던 부분
* 처음에 파일 내부의 javascript code가 난독화되어 있어 읽기 매우 어려웠음
  * 개발자 디버깅 기능 중 변수 등을 편하게 볼 수 있어서 아주 큰 도움이 됨
