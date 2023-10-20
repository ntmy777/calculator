const buttons = document.querySelectorAll('button');
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
            if (userInput[userInput.length - 1] === ".") {
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
            upDisplay.textContent = front + ' ' + mid;
            
            if (mid === "=") {
                lowDisplay.textContent = front;
                repeat = 0;
                userInput = [front];
                if (front.toString().includes('.')) {
                    dotcount = 1;
                }
                else {
                    dotcount = 0;
                }
            }
            else{
                lowDisplay.textContent = '';
                repeat = 1;
                userInput = [];
                dotcount = 0;
            }
            
        }

        else if (repeat === 1) {
            // mid = event.target.textContent;
            back = +userInput.join('');
            if (back === 0) {
                if (mid === "/") {
                    alert('unable to divide by 0! Please reenter!!!');
                }
                else if (mid === "=") {
                    upDisplay.textContent = front + " " + mid;
                    lowDisplay.textContent = front;
                    userInput = [front];
                    if (front.toString().includes('.')) {
                        dotcount = 1;
                    }
                    else {
                        dotcount = 0;
                    }
                    repeat = 0;
                
                }
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
                    if (front.toString().includes('.')) {
                        dotcount = 1;
                    }
                    else {
                        dotcount = 0;
                    }
                    repeat = 0;
                } 
            }    
        }
    })
})

document.addEventListener('keydown', function (event) {
    let key = event.key;
    if (key === "Backspace") {
        if (userInput[userInput.length - 1] === ".") {
            dotcount--;
        }
        userInput.pop();
        lowDisplay.textContent = userInput.join('');
    }

    else if ((key >= '0' && key <= '9') || key === ".") {
        userInput.push(key);
        if (key === ".") {
            dotcount++;
            if (dotcount > 1) {
                alert('unable to insert more than one "." !!!')
                userInput.pop();
            }
        }
        if (mid) {
            upDisplay.textContent = front + ' ' + mid;
            lowDisplay.textContent = userInput.join('');
        }
        else {
            lowDisplay.textContent = userInput.join('');
        }
    }

    else if (key === "+" || key === "-" || key === "*" || key === "/" || key === "=") {
        if (key === "/" || key === "=") {
            event.preventDefault();
        }
        if (repeat === 0) {
            front = +userInput.join('');
            mid = key;
            upDisplay.textContent = front + ' ' + mid;
            lowDisplay.textContent = '';
            if (mid === "=") {
                lowDisplay.textContent = front;
            }
            userInput = [];
            dotcount = 0;
            repeat = 1;
        }

        else if (repeat === 1) {
            back = +userInput.join('');
            console.log(typeof key, key, typeof back, back);
            if (back === 0) {
                if (mid === "/") {
                    alert('unable to divide by 0! Please reenter!!!');
                }
                else if (mid === "=") {
                    upDisplay.textContent = front + " " + mid;
                    lowDisplay.textContent = front;
                    userInput = [front];
                    // console.log(userInput);
                    if (front.toString().includes('.')) {
                        dotcount = 1;
                    }
                    else {
                        dotcount = 0;
                    }
                    repeat = 0;
                }
            }

            else {
                upDisplay.textContent = front + ' ' + mid + ' ' + back + ' =';
                front = +operate(front, mid, back);
                // console.log(front);
                mid = key;
                if (mid !== "=") {
                    lowDisplay.textContent = '';
                    lowDisplay.textContent = front + ' ' + mid;
                    console.log(front, mid);
                    userInput = [];
                    dotcount = 0;
                }
                else {
                    lowDisplay.textContent = front;
                    userInput = [front];
                    if (front.toString().includes('.')) {
                        dotcount = 1;
                    }
                    else {
                        dotcount = 0;
                    }
                    repeat = 0;
                } 
            }    
        }

    }
})