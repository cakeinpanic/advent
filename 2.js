// http://adventofcode.com/2017/day/2

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
