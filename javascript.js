const clear = document.querySelector('#clear');
const dot = document.querySelector('#dot');
const equal = document.querySelector('#equal');
const buttons = document.querySelectorAll('button');
const digits = document.querySelectorAll('.digits');
const counts = document.querySelectorAll('.counts');
const upDisplay = document.querySelector('.upDisplay');
const lowDisplay = document.querySelector('.lowDisplay');
let repeat = 0;
let userInput = [];
let front, back, mid, result;
let dotcount = 0;

function reformat(result) {
    if (Number.isInteger(result)) {
        return result;
    }

    else {
        return result.toFixed(3);
    }
}
let add = function (a, b) {
    result = a + b;
    return reformat(result);
}

let subtract = function (a, b) {
    result = a - b;
    return reformat(result);
}

let multiply = function (a, b) {
    result = a * b;
    return reformat(result);
}

let divide = function (a, b) {
    result = a / b;
    return reformat(result);
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

function addInput(digit) {
    userInput.push(digit.target.textContent);
}

buttons.forEach(function (button) {
    if (button.id === "clear") {
        button.addEventListener('click', function () {
            userInput = [];
            front = 0;
            back = 0;
            mid = '';
            repeat = 0;
            dotcount = 0;
            upDisplay.textContent = '';
            lowDisplay.textContent = '';
        });
    }
    else if (button.id === "del") {
        button.addEventListener('click', function () {
            if (userInput[userInput - 1] === ".") {
                dotcount--;
            }
            userInput.pop();
            lowDisplay.textContent = userInput.join('');
        });
    }

    else if (button.className === "digits") {
        button.addEventListener('click', function (digit) {
            userInput.push(digit.target.textContent);
            if (button.id === "dot") {
                dotcount++;
                if (dotcount > 1) {
                    alert('unable to insert more than one "." !!!')
                    userInput.pop();
                }
            }
            // display.value = userInput;
            if (mid) {
                upDisplay.textContent = front + ' ' + mid;
                lowDisplay.textContent = userInput.join('');
            }
            else {
                lowDisplay.textContent = userInput.join('');
            }
        });
    }
})

counts.forEach(function (count) {
    count.addEventListener('click', function (event) {
        if (repeat === 0) {
            front = +userInput.join('');
            mid = event.target.textContent;
            lowDisplay.textContent = front + ' ' + mid;
            userInput = [];
            dotcount = 0;
            repeat = 1;
        }

        else if (repeat === 1) {
            back = +userInput.join('');
            if (back === 0) {
                alert('unable to divide by 0! Please reenter!!!');
            }
            else {
                upDisplay.textContent = front + ' ' + mid + ' ' + back + ' =';
                front = +operate(front, mid, back);
                mid = event.target.textContent;
                if (mid !== "=") {
                    lowDisplay.textContent = front + ' ' + mid;
                    userInput = [];
                    dotcount = 0;
                }

                else {
                    lowDisplay.textContent = front;
                    userInput = [front];
                    let out = front;
                    repeat = 0;
                    if (front.toString().includes('.')) {
                        dotcount = 1;
                    }
                    else{
                        dotcount=0;
                    }
                }
            }
        }
    })
})

// equal.addEventListener('click', function () {
//     back = +userInput.join('');
//     console.log(front, mid, back);
//     upDisplay.textContent = front + ' ' + mid + ' ' + back + '=';
//     front = operate(front, mid, back);
//     lowDisplay.textContent = front;
//     console.log(front);
//     userInput = [];
// })





