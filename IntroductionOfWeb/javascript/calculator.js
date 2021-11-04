//최종 연산 함수
function calculate(firstInput, secondInput, operator) {
    var result = 0;

    var first = Number(firstInput);
    var second = Number(secondInput);

    if (operator === '+') {
        result = first + second;
    } else if (operator === '-') {
        result = first - second;
    } else if (operator === '*') {
        result = first * second;
    } else if (operator === '/') {
        result = first / second;
    } else if (operator === '%') {
        result = first % second;
    } else {
        console.log("That must Wrong result Debug This!!!!!");
    }

    console.log(first + ' ' + operator + ' ' + second + ' = ' + result);

    document.getElementById("inputParagraph").innerHTML = first + ' ' + operator + ' ' + second + ' = ' + result;
    document.getElementById("resultParagraph").innerHTML = result;
}

//입력한 Input이 숫자인지 아닌지 반환하는 함수
function isValidNumberInput(input) {
    if (isNaN(Number(input)) || input === "") {
        return false;
    } else {
        return true;
    }
}

//입력한 Input이 숫자인지 아닌지 반환하는 함수
function isEven(input) {
    let inputNumber = Number(input);

    return inputNumber % 2 === 0 ? true : false;
}

//입력한 Input이 숫자인지 아닌지 반환하는 함수
function typeText(input) {

    if (input === input.toUpperCase()) {
        return 1;
    } else if (input === input.toLowerCase()) {
        return 2;
    } else {
        return 3;
    }
}

//입력한 연산 종류가 적정한지 반환하는 함수
function isValidOperatorInput(operator) {
    if (operator === '+' ||
        operator === '-' ||
        operator === '*' ||
        operator === '/' ||
        operator === '%') {
        return true;
    } else {
        return false;
    }
}

var calculatorInputButton = document.getElementById("calculateButton");

calculatorInputButton.onclick = function () {

    //첫번째 숫자 입력 받기
    var firstInput = prompt("계산할 첫번째 숫자 하나를 입력해 주세요.");
    //prompt 취소 Button check
    if (firstInput === null) {
        return;
    }
    var isFirstInputValid = isValidNumberInput(firstInput);

    while (!isFirstInputValid) {
        alert("입력하신 값이 숫자가 아닙니다.\n옳바른 값을 입력해 주세요.");
        firstInput = prompt("숫자 하나를 입력해 주세요.");
        isFirstInputValid = isValidNumberInput(firstInput);
    }

    console.log("First Input is = " + firstInput);

    //연산 종류 입력 받기
    var operatorInput = prompt("연산 종류를 입력해 주세요.\n연산 종류 = (+, -, *, /, %)");
    //prompt 취소 Button check
    if (operatorInput === null) {
        return;
    }
    var isValidOperator = isValidOperatorInput(operatorInput);

    while (!isValidOperator) {
        alert("입력하신 값이 적절한 연산 Type이 아닙니다.\n옳바른 값을 입력해 주세요.");
        operatorInput = prompt("연산 종류를 입력해 주세요.\n연산 종류 = (+, -, *, /, %)");
        isValidOperator = isValidOperatorInput(operatorInput);
    }

    console.log("Operator input is = " + operatorInput);

    //두번째 숫자 입력 받기
    var secondInput = prompt("계산할 두번째 숫자 하나를 입력해 주세요.");
    //prompt 취소 Button check
    if (secondInput === null) {
        return;
    }
    var isSecondInputValid = isValidNumberInput(secondInput);

    while (!isSecondInputValid) {
        alert("입력하신 값이 숫자가 아닙니다.\n옳바른 값을 입력해 주세요.");
        secondInput = prompt("숫자 하나를 입력해 주세요.");
        isSecondInputValid = isValidNumberInput(secondInput);
    }

    console.log("Second Input is = " + secondInput);

    calculate(firstInput, secondInput, operatorInput);
};

let oddOrEvenButton = document.getElementById("oddOrEvenButton");

oddOrEvenButton.onclick = function () {
    //숫자 입력 받기
    var input = prompt("확인 할 숫자 하나를 입력해 주세요.");
    //prompt 취소 Button check
    if (input === null) {
        return;
    }
    var isInputValid = isValidNumberInput(input);

    while (!isInputValid) {
        alert("입력하신 값이 숫자가 아닙니다.\n옳바른 값을 입력해 주세요.");
        input = prompt("숫자 하나를 입력해 주세요.");
        isInputValid = isValidNumberInput(input);
    }

    console.log("Input is = " + input);

    let inputParagraph = document.getElementById("inputOddOrEven")
    let resultParagraph = document.getElementById("resultOddOrEven")

    inputParagraph.innerHTML = "입력하신 수는 " + input + "입니다.";

    if (isEven(input)) {
        resultParagraph.innerHTML = "짝수입니다.";
    } else {
        resultParagraph.innerHTML = "홀수입니다.";
    }

}

let upperOrLowerButton = document.getElementById("upperOrLowerButton");

upperOrLowerButton.onclick = function () {
    //숫자 입력 받기
    var input = prompt("확인 할 문장을 입력해 주세요.");
    //prompt 취소 Button check
    if (input === null) {
        return;
    }

    console.log("Input is = " + input);

    let inputParagraph = document.getElementById("inputUpperOrLower")
    let resultParagraph = document.getElementById("resultUpperOrLower")

    let type = typeText(input);

    inputParagraph.innerHTML = "입력하신 text는 " + input + "입니다.";

    if (type === 1) {
        resultParagraph.innerHTML = "대문자로 이루어진 문장입니다.";
    } else if (type === 2) {
        resultParagraph.innerHTML = "소문자로 이루어진 문장입니다.";
    } else if (type === 3) {
        resultParagraph.innerHTML = "보통 문장입니다.";
    }
}