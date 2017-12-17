const {makeKnotHash} = require('./10');
const {getFilledArray} = require('./utlis');

function getLine(input, onlyUsed) {
    let t = makeKnotHash(input)
        .split('')
        .map((letter) => parseInt(letter, 16).toString(2))
        .map((binary) => {
            if (!onlyUsed) {
                return new Array(4 - binary.length).fill(0).join('') + binary;
            }
            return binary.split('').filter(n => n==='1').join('')
        })
        .join('');

    return t
}

function fourteen(input, base = 128) {
    let table = getFilledArray(base).map((el, i) => `${input}-${i}`)
                                    .map(string => getLine(string, true))
                                    .join('');

    return table.length;
}

console.log(fourteen('ffayrhll'))