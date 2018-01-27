let input = [63, 144, 180, 149, 1, 255, 167, 84, 125, 65, 188, 0, 2, 254, 229, 24].join(',');

let {shiftArray, getFilledArray} = require('./utlis');

function makeKnot(list, currentPosition, step) {
    list = shiftArray(list, -currentPosition);

    let substr = list
        .slice(0, step)
        .reverse();

    list.splice(0, step, ...substr);

    return shiftArray(list, currentPosition);
}

function makeAllKnots(list, lengths, skipSize = 0, currentPosition = 0) {
    lengths.forEach(step => {
        list = makeKnot(list, currentPosition, step);
        currentPosition = (currentPosition + step + skipSize) % list.length;
        skipSize++;
    });

    return {list, currentPosition, skipSize};
}

function makeHash(list, base = 16) {
    return getFilledArray(list.length / base)
        .map((el, i) => list.splice(0, base))
        .map(arr => arr.reduce((a, b) => a ^ b))
        .map(el => {
            let t = el.toString(16);
            return t.length === 1 ? `0${t}` : t;
        })
        .join('');
}


function ten(lengths, base = 256) {
    lengths = lengths.split(',');
    let list = getFilledArray(base).map((el, i) => i);
    let result = makeAllKnots(list, lengths).list;

    return result[0] * result[1];
}

function tenExtended(lengthsString) {
    return makeKnotHash(lengthsString, 256);
}

function makeKnotHash(lengthsString, base = 256) {
    let list = getFilledArray(base).map((el, i) => i);

    let additionalLengths = [17, 31, 73, 47, 23];
    let lengths = lengthsString.split('').map(el => el.charCodeAt(0)).concat(additionalLengths);

    let skipSize = 0;
    let currentPosition = 0;

    new Array(64).fill(0).forEach(() => {
        let subResult = makeAllKnots(list, lengths, skipSize, currentPosition);
        skipSize = subResult.skipSize;
        currentPosition = subResult.currentPosition;
        list = subResult.list;
    });

    return makeHash(list);
}


module.exports = {makeKnotHash};
