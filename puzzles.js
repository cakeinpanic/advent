function first(input, step = 1) {
    input = input.split('').map(digit => +digit);

    let result = 0;
    // reduce can be used, but readability would be worse
    input.forEach((digit, i) => result += input[(i + step) % input.length] === digit ? digit : 0);

    return result;
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
