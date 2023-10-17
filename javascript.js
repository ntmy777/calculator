let add = function (a, b) {
    return a + b;
}

let subtract = function (a, b) {
    return a - b;
}

let multiply = function (a, b) {
    return a * b;
}

let divide = function (a, b) {
    return (a / b);
}

let num1, op, num2;

let operate = function (num1, op, num2) {
    switch (op) {
        case "+":
            return add(num1, num2);
            break;

        case "-":
            return subtract(num1, num2);
            break;

        case "*":
            return multiply(num1, num2);
            break;

        case "/":
            return divide(num1, num2);
            break;
    }
}

const digit1 = document.querySelector('#digit1');
const digit2 = document.querySelector('#digit2');
const digit3 = document.querySelector('#digit3');
const digit4 = document.querySelector('#digit4');
const digit5 = document.querySelector('#digit5');
const digit6 = document.querySelector('#digit6');
const digit7 = document.querySelector('#digit7');
const digit8 = document.querySelector('#digit8');
const digit9 = document.querySelector('#digit9');
const digit0 = document.querySelector('#digit0');
const clear = document.querySelector('#clear');
const dot = document.querySelector('#dot');
const equal = document.querySelector('#equal');
const buttons = document.querySelectorAll('button');
let userInput = [];
let count = true;

function addInput(digit) {
    userInput.push(digit.target.textContent);
}

buttons.forEach(function (button) {
    if (button.id === "clear"){
        button.addEventListener('click', function () {
            userInput = [];
        });
    }
    else if (button.id === "del"){
        button.addEventListener('click', function () {
            userInput.pop();
        });
    }
    else if (button.id !== "equal") {
        button.addEventListener('click', addInput);
    }
})

equal.addEventListener('click', function () {
    console.log(userInput.join(''));
    console.log(userInput);
    userInput = [];
})





