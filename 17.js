const input = 359;

function getSequence(input, lastValue = 2017, getFirstOnly = false) {
    const seq = [0];
    let currentIndex = 0;

    for (let i = 1; i <= lastValue; i++) {
        currentIndex = (currentIndex + input) % seq.length + 1;
        if (getFirstOnly && currentIndex !== 1) {
            seq.push(0);
        } else {
            seq.splice(currentIndex, 0, i);
        }
    }

    if (getFirstOnly) {currentIndex = 0}
    return seq[currentIndex + 1];
}

function seventeen(input) {
    return getSequence(input);
}

function seventeenExtended(input) {
    return getSequence(input, 50000000, true);
}

console.log(seventeen(input));
console.log(seventeenExtended(input));