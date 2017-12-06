let input = [14, 0, 15, 12, 11, 11, 3, 5, 1, 6, 8, 4, 9, 1, 8, 4];

function biggestIndex(input) {
    return input.indexOf(Math.max(...input));
}

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

function haveSequenceInMemory(memory, input) {
    return memory.some(sequence => sequence.every((value, i) => value === input[i]));
}

function countSteps(inititalInput, countCyclomaticSteps = false) {
    let input = [].concat(inititalInput);
    let steps = 0;
    let memory = [];

    while (!haveSequenceInMemory(memory, input)) {
        steps++;
        memory.push(copyArray(input));

        let currentBlockIndex = biggestIndex(input);
        input = shiftArray(input, -currentBlockIndex);

        while (input[0] / input.length >= 1) {
            input[0] -= input.length;
            input = input.map(value => ++value);
        }

        if (input[0] > 0) {
            for (let i = 1; i <= input[0]; i++) {
                input[i]++;
            }
            input[0] = 0;
        }

        input = shiftArray(input, currentBlockIndex);
    }

    if (countCyclomaticSteps) {
        return countSteps(input);
    }

    return steps;
}


function six(input) {
    return countSteps(input);
}

function sixExtended(input) {
    return countSteps(input, true);
}

console.log(six(input));
console.log(sixExtended(input));
