//Celsius To Farenheit 연산 함수
function calculateCtoF(celsius) {
    var result = 0;

    result = (celsius * 9 / 5) + 32;

    console.log('Calculated Farenheit' + ' = ' + result);

    document.getElementById("CtoFResultParagraph").innerHTML = result;
}

//Celsius To Farenheit 연산 함수
function calculateFtoC(farenheit) {
    var result = 0;

    result = (farenheit - 32) * (5 / 9);

    console.log('Calculated Celsius' + ' = ' + result);

    document.getElementById("FtoCResultParagraph").innerHTML = result;
}

//입력한 값이 숫자인지 반환하는 함수
function isValidInput(number) {
    return !isNaN(Number(number))
}

var inputButton = document.getElementById("temperatureInputButton");

inputButton.onclick = function () {
    //온도 입력받기
    var isInputValid = false;
    var temperatureInput = 0;

    while (!isInputValid) {
        temperatureInput = prompt("변환할 온도를 입력해주세요.\n단위는 생략해주세요.", 0);
        console.log("Input Temperature Value = " + temperatureInput);
        //prompt 취소 Button check
        if (temperatureInput === null) {
            return;
        }

        isInputValid = isValidInput(temperatureInput);
        if (isInputValid === false) {
            alert("입력하신 값이 잘못되었습니다.\n옳바른 값을 입력해 주세요.");
        }
    }

    calculateInputToC(temperatureInput);
    calculateInputToF(temperatureInput);
    calculateInputToK(temperatureInput);

};