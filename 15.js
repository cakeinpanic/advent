const DIVIDER = 2147483647;
const AFACTOR = 16807;
const BFACTOR = 48271;

function getNext(prev, factor) {
    const multiplied = (prev * factor);
    return multiplied - Math.floor(multiplied / DIVIDER) * DIVIDER;
}

function generator(prev, factor, pickyDivider) {
    let result = getNext(prev, factor);

    if (pickyDivider) {
        return result % pickyDivider
            ? generator(result, factor, pickyDivider)
            : result;
    }
}

function generatorA(prev, isPicky) {
    return generator(prev, AFACTOR, isPicky ? 4 : 0);
}

function generatorB(prev, isPicky) {
    return generator(prev, BFACTOR, isPicky ? 8 : 0);
}


function fifteen(inputA, inputB, totalPairs = 40000000, isPicky = false) {
    let result = 0;
    const stabilizer = parseInt(new Array(16).fill(1).join(''), 2);

    for (let i = 0; i < totalPairs; i++) {
        inputA = generatorA(inputA, AFACTOR, isPicky);
        inputB = generatorB(inputB, BFACTOR, isPicky);

        const shiftedA = inputA & stabilizer;
        const shiftedB = inputB & stabilizer;

        if (shiftedA === shiftedB) {
            result++;
        }
    }
    return result;
}

function fifteenExtended(inputA, inputB) {
    return fifteen(inputA, inputB, 5000000, true);

}

console.log(fifteenExtended(512, 191));