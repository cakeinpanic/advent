function getNext(prev, factor, divider) {
    let multiplied = (prev * factor);
    return multiplied - Math.floor(multiplied / divider) * divider;
}

function fifteen(inputA, inputB, totalPairs = 40000000) {
    const aFactor = 16807;
    const bFactor = 48271;
    const divider = 2147483647;

    let result = 0;
    const stabilizer = parseInt(new Array(16).fill(1).join(''), 2);

    for (let i = 0; i < totalPairs; i++) {
        inputA = getNext(inputA, aFactor, divider);
        inputB = getNext(inputB, bFactor, divider);
        const xorA = inputA & stabilizer;
        const xorB = inputB & stabilizer;

        if (xorA === xorB) {
            result++;
        }
    }
    return result;
}

console.log(fifteen(512, 191));