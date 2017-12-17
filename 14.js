const {makeKnotHash} = require('./10');
const {getFilledArray, getTableElement} = require('./utlis');


const input = 'ffayrhll';

function getLine(input, onlyUsed) {
    return makeKnotHash(input)
        .split('')
        .map((letter) => parseInt(letter, 16).toString(2))
        .map((binary) => {
            if (!onlyUsed) {
                return new Array(4 - binary.length).fill(0).join('') + binary;
            }
            return binary.split('').filter(n => n === '1').join('')
        })
        .join('');
}

function fourteen(input, base = 128) {
    let table = getFilledArray(base).map((el, i) => `${input}-${i}`)
                                    .map(string => getLine(string, true))
                                    .join('');

    return table.length;
}


function fourteenExtended(input, base = 128) {
    let table = getFilledArray(base).map((el, i) => `${input}-${i}`)
                                    .map(string => getLine(string).split(''));


    function findNeighbours(y, x) {
        if (getTableElement.call({table},y, x) == 1) {
            table[y][x] = 0;
            findNeighbours(y - 1, x);
            findNeighbours(y + 1, x);
            findNeighbours(y, x - 1);
            findNeighbours(y, x + 1);
            return 1;
        }
        return 0;
    }

    let numberOfGroups = 0;
    for (let i = 0; i < base; i++) {
        for (let j = 0; j < base; j++) {
            numberOfGroups += findNeighbours(i, j);
        }
    }
    return numberOfGroups;
}

console.log(fourteenExtended(input));