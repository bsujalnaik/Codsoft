// script.js
document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const clearButton = document.getElementById('clear');
    const equalsButton = document.getElementById('equals');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    let secondOperand = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            
            if (!isNaN(value) || value === '.') {
                handleNumber(value);
            } else if (['+', '-', '*', '/'].includes(value)) {
                handleOperator(value);
            }
        });
    });

    clearButton.addEventListener('click', clearDisplay);
    equalsButton.addEventListener('click', calculate);

    function handleNumber(num) {
        currentInput += num;
        display.innerText = currentInput;
    }

    function handleOperator(op) {
        if (currentInput === '') return;

        if (firstOperand === '') {
            firstOperand = currentInput;
        } else if (secondOperand === '') {
            secondOperand = currentInput;
        }

        operator = op;
        currentInput = '';
    }

    function clearDisplay() {
        currentInput = '';
        firstOperand = '';
        secondOperand = '';
        operator = '';
        display.innerText = '';
    }

    function calculate() {
        if (currentInput !== '') {
            secondOperand = currentInput;
        }

        if (firstOperand === '' || secondOperand === '' || operator === '') return;

        const result = operate(firstOperand, secondOperand, operator);
        display.innerText = result;
        currentInput = result;
        firstOperand = result;
        secondOperand = '';
        operator = '';
    }

    function operate(num1, num2, operator) {
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);

        switch (operator) {
            case '+':
                return n1 + n2;
            case '-':
                return n1 - n2;
            case '*':
                return n1 * n2;
            case '/':
                return n1 / n2;
            default:
                return 0;
        }
    }
});
