function copyArray(array) {
    return [].concat(array);
}

function shiftArray(input, index) {
    input = copyArray(input);
    while (index > 0) {
        index--;
        input.unshift(input.pop());
    }
    while (index < 0) {
        index++;
        input.push(input.shift());
    }
    return input;
}

function getFilledArray(length) {
    return new Array(length)
        .fill(0)
}

module.exports = {shiftArray, copyArray, getFilledArray};