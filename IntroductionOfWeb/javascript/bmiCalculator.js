//최종 연산 함수
function calculateBMI(weight, height) {
    var result = 0;

    result = weight / Math.pow(height,2);

    console.log('Calculated BMI' + ' = ' + result);

    document.getElementById("resultParagraph").innerHTML = result;
}

//입력한 키와 몸무게가 적절한 값인지 반환하는 함수
function isValidInput(number) {
    return Number(number) === 0 ? false : !isNaN(Number(number))
}

var calculatorInputButton = document.getElementById("calculateButton");

calculatorInputButton.onclick = function () {

    var height = 0;
    var weight = 0;

    var isHeightInputValid = false;
    
    //키 입력 받기
    while (!isHeightInputValid) {
        var heightInput = prompt("계산할 키를 입력해 주세요.\n단위는 m입니다.\n예)1.75m");
        console.log("Input Height Value = " + heightInput);
        //prompt 취소 Button check
        if (heightInput === null) {
            return;
        }
        var heightInputLength = heightInput.length;

        if (heightInput.slice(-2) == 'cm' ||
            heightInput.slice(-2) == 'CM') {

            //혹시나 m가아닌 cm로입력한 경우에 대한 예외처리는 친절하게 해줌
            height = heightInput.slice(0, heightInputLength - 2);
            //cm단위로 입력한 경우 m단위로 변경
            height = height / 100;

        } else if (heightInput.slice(-1) == 'm' ||
            heightInput.slice(-1) == 'M') {

            //Input에 m단위까지 입력한 경우에 대한 처리
            height = heightInput.slice(0, heightInputLength - 1);

        } else {
            height = heightInput;
        }

        isHeightInputValid = isValidInput(height);
        if (isHeightInputValid === false) {
            alert("입력하신 값이 잘못되었습니다.\n옳바른 값을 입력해 주세요.");
        }
    }

    var isWeightInputValid = false;
    
    //몸무게 입력 받기
    while (!isWeightInputValid) {
        var weightInput = prompt("계산할 몸무게를 입력해 주세요.\n단위는 kg입니다.\n예)65kg");
        console.log("Input Weight Value = " + weightInput);
        //prompt 취소 Button check
        if (weightInput === null) {
            return;
        }
        var weightInputLength = weightInput.length;

        if (weightInput.slice(-2) == 'kg' ||
            weightInput.slice(-2) == 'KG') {

            //Input에 kg단위까지 입력한 경우
            weight = weightInput.slice(0, heightLength - 2);

        } else if (weightInput.slice(-1) == 'g' ||
            weightInput.slice(-1) == 'G') {

            //Input에 g단위까지 입력한 경우에 대한 처리
            weight = weightInput.slice(0, heightLength - 1);
            //g단위로 입력한 경우 kg단위로 변경
            weight = weight / 1000;

        } else {
            weight = weightInput;
        }
        isWeightInputValid = isValidInput(weight);
        if (isWeightInputValid === false) {
            alert("입력하신 값이 잘못되었습니다.\n옳바른 값을 입력해 주세요.");
        }
    }

    console.log("Refined Height Value = " + height);
    console.log("Refined Weight Value = " + weight);

    calculateBMI(weight, height);
};