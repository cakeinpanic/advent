function first(input, step = 1) {
    input = input.split('').map(digit => +digit);

    let subResult = input
        .filter((digit, i) => input[(i + step) % input.length] === digit);

    if (subResult[subResult.length - 1] === subResult[0]) {
        subResult.pop();
    }

    subResult.push(0);

    return subResult.reduce((a, b) => a + b);
}

function second(input) {
    return input
        .map(line => Math.max(...line) - Math.min(...line))
        .reduce((a, b) => a + b)
}

