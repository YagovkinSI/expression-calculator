function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    var leters = expr.split("");
    var stack = [];
    var element = "";
    for (var i = 0; i < leters.length; i++) {
        
        if (leters[i].match(/[0-9]/)) {
            element += leters[i];
            continue;
        }

        if (element.length > 0) {
            stack.push(parseInt(element))
            element = [];
        }

        if (leters[i] == " ")
            continue;
        else
            stack.push(leters[i]);        
    }
    if (element.length > 0) {
        stack.push(parseInt(element))
        element = [];
    }
    return calculate(stack);
}

function calculate(stack) {

    var count = 0;
    while (stack.length > 1 && stack.length != count) {
        count = stack.length;
        var result = 0;
        var bracets = get_bracets(stack);
        var isBracets = bracets[0] > 0;
        if (isBracets) {
            var newStack = [];
            for (var i = bracets[0]; i <= bracets[1]; i++)
                newStack.push(stack[i]);
            result = calculate(newStack);
            var newStack = [];
            for (var j = 0; j < bracets[0] - 1; j++) {
                newStack.push(stack[j]);
            }
            newStack.push(result);
            for (var j = bracets[1] + 2; j < stack.length; j++) {
                newStack.push(stack[j]);
            }
            stack = newStack;
            continue;
        }

        var multy = true;
        while (multy) {
            multy = false;
            for (var i = 1; i < stack.length - 1; i++) {
                if (stack[i] == "*") {
                    stack = operation(stack, "*", i);
                    multy = true;
                    break;
                }
                else if (stack[i] == "/") {
                    stack = operation(stack, "/", i);
                    multy = true;
                    break;
                }
            }
        }

        var plus = true;
        while (plus) {
            plus = false;
            for (var i = 1; i < stack.length - 1; i++) {
                if (stack[i] == "+") {
                    stack = operation(stack, "+", i);
                    plus = true;
                    break;
                }
                else if (stack[i] == "-") {
                    stack = operation(stack, "-", i);
                    plus = true;
                    break;
                }
            }
        }
    }
    return stack[0];
}

function get_bracets(stack) {
    var open = 0;
    var close = stack.length - 1;
    for (var i = 0; i < stack.length; i++) {
        if (stack[i] == "(")
            open = i + 1;
        else if (stack[i] == ")") {
            if (open == 0)
                throw new Error("ExpressionError: Brackets must be paired");
            close = i - 1;
            break;
        }
    }
    if (open > 0 && close == stack.length - 1 && stack[stack.length - 1] != ")")
        throw new Error("ExpressionError: Brackets must be paired");
    return [open, close];
}

function operation(stack, operator, i) {
    var result = 0;
    switch (operator) {
        case "*":
            result = stack[i - 1] * stack[i + 1];
            break;
        case "/":
            if (stack[i + 1] == 0)
                throw new Error("TypeError: Division by zero.");
            result = stack[i - 1] / stack[i + 1];
            break;
        case "+":
            result = stack[i - 1] + stack[i + 1];
            break;
        case "-":
            result = stack[i - 1] - stack[i + 1];
            break;
    }    
    var newStack = [];
    for (var j = 0; j < i - 1; j++) {
        newStack.push(stack[j]);
    }
    newStack.push(result);
    for (var j = i + 2; j < stack.length; j++) {
        newStack.push(stack[j]);
    }
    return newStack;
}

module.exports = {
    expressionCalculator
}