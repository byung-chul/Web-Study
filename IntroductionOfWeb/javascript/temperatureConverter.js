//Celsius To Farenheit 연산 함수
function calculateCtoF(celsius) {
    return (celsius * 9 / 5) + 32;
}

//Celsius To Kelvin 연산 함수
function calculateCtoK(celsius) {
    return celsius + 273.15;
}

//Farenheit To Celsius 연산 함수
function calculateFtoC(farenheit) {
    return (farenheit - 32) * (5 / 9);
}

//Kelvin To Celsius 연산 함수
function calculateKtoC(kelvin) {
    return kelvin - 273.15;
}

//계산된 결과값을 입력한 input의 반대에 넣어주는 과정
function showResult(output, result) {
    console.log("Converted Result = " + result);
    output.value = result;
}

var input = document.getElementById("inputTemperature");
var inputSelector = document.getElementById("inputSelector");
var output = document.getElementById("outputTemperature");
var outputSelector = document.getElementById("outputSelector");

input.onchange = function () { inputConvert(input, inputSelector, outputSelector, output) };
outputSelector.onchange = function () { inputConvert(input, inputSelector, outputSelector, output) };
output.onchange = function () { inputConvert(output, outputSelector, inputSelector, input) };
inputSelector.onchange = function () { inputConvert(output, outputSelector, inputSelector, input) };

function inputConvert(input, inputSelector, outputSelector, output) {
    var inputValue = Number(input.value);
    var outputValue = Number(output.value);
    var inputSelectorIndex = inputSelector.selectedIndex;
    var outputSelectorIndex = outputSelector.selectedIndex;

    var result = 0;

    console.log("input Value = " + inputValue);
    console.log("output Value = " + outputValue);
    console.log("input Value Selector Index = " + inputSelectorIndex);
    console.log("output Value Selector Index = " + outputSelectorIndex);

    switch (inputSelectorIndex) {
        case 0:
            //From Celsius
            console.log("From Celsius");
            switch (outputSelectorIndex) {
                case 0:
                    //To Celsius
                    console.log("To Celsius");
                    console.log("Input Type And Output Type Same");
                    result = inputValue;
                    break;
                case 1:
                    //To Farenheit
                    console.log("To Farenheit");
                    result = calculateCtoF(inputValue);
                    break;
                case 2:
                    //To Kelvin
                    console.log("To Kelvin");
                    result = calculateCtoK(inputValue);
                    break;
            }
            break;
        case 1:
            //From Farenheit
            console.log("From Farenheit");
            switch (outputSelectorIndex) {
                case 0:
                    //To Celsius
                    console.log("To Celsius");
                    result = calculateFtoC(inputValue);
                    break;
                case 1:
                    //To Farenheit
                    console.log("To Farenheit");
                    console.log("Input Type And Output Type Same");
                    result = inputValue;
                    break;
                case 2:
                    //To Kelvin
                    console.log("To Kelvin");
                    result = calculateCtoK(calculateFtoC(inputValue));
                    break;
            }
            break;
        case 2:
            //From Kelvin
            console.log("From Kelvin");
            switch (outputSelectorIndex) {
                case 0:
                    //To Celsius
                    console.log("To Celsius");
                    result = calculateKtoC(inputValue);
                    break;
                case 1:
                    //To Farenheit
                    console.log("To Farenheit");
                    result = calculateCtoF(calculateKtoC(inputValue));
                    break;
                case 2:
                    //To Kelvin
                    console.log("To Kelvin");
                    console.log("Input Type And Output Type Same");
                    result = inputValue;
                    break;
            }
            break;
    }

    showResult(output, result);
}