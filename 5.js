// http://adventofcode.com/2017/day/5

function jumper(input, changeOffset) {
    input = [].concat(input);
    let currentPosition = 0;
    let stepsCount = 0;

    function makeStep(index) {
        currentPosition += input[index];
        input[index] = changeOffset(input[index]);
        stepsCount++;
    }

    while (currentPosition > -1 && currentPosition < input.length) {
        makeStep(currentPosition);
    }

    return stepsCount;
}

function fifth(input) {
    return jumper(input, (a) => ++a);
}

function fifthExtended(input) {
    return jumper(input, (a) => a >= 3 ? a-1 : a+1);
}
