# Carve Party

* Dreamhack CTF Season 1 Round #2에 출시된 문제

* 문제 Description
** 할로윈 파티를 기념하기 위해 호박을 준비했습니다! 호박을 10000번 클릭하고 플래그를 획득하세요!

# 문제 해결
* html을 열고, Web Browser의 개발자 도구 console에서 javascript를 실행하여 for문 이용하여 해결
```javascript
for(i=0; i<=10000; i++){
 $('#jack-target').trigger("click")
}
```
를 추가하여 10000번까지 Click Evnet를 전달하여 해결함

# 문제 해결 실패 과정
* 처음에 개발자도구 내부에서 Click Event에 대해 break를 걸고 counter값을 10001로 변경하여 해결하고자 함
** 옳은 방법이 아닌건지 Flag값이 이상하게 나오면서 정답이 아님
