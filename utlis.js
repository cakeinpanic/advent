
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

module.exports = {shiftArray, copyArray};