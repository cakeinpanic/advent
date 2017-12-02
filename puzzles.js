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

function secondExtended(input) {
    function getLineDivided(line, index) {
        return line.map((number, i) => i === index ? 0 : number / line[index])
                   .filter(dividedNumber => !!dividedNumber && Math.ceil(dividedNumber) === Math.floor(dividedNumber));
    }

    return input
        .map(line => {
            let i = 0;
            let dividedLine = getLineDivided(line, i);
            while (!dividedLine.length) {
                dividedLine = getLineDivided(line, ++i);
            }
            return dividedLine[0];
        })
        .reduce((a, b) => a + b)
}
