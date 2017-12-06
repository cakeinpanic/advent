// http://adventofcode.com/2017/day/1

function countCapthca(input, step = 1) {
    input = input.split('').map(digit => +digit);

    let result = 0;
    // reduce can be used, but readability would be worse
    input.forEach((digit, i) => result += input[(i + step) % input.length] === digit ? digit : 0);

    return result;
}

function first(input) {
    return countCapthca(input);
}

function firstExtended(input) {
    return countCapthca(input, input.length / 2);
}