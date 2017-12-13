let input = require('./data/13');

let {getFilledArray} = require('./utlis');


function prepareInput(input) {
    let max = 0;
    let res = {};
    input.split('\n')
         .forEach((str) => {
             let parsed = /(\d+): (\d+)/.exec(str);

             res[+parsed[1]] = +parsed[2];
             max = +parsed[1];
         });


    return getFilledArray(max + 1).map((el, i) => {
        if (res[i]) {
            return getFilledArray(+res[i]);
        }
        return null;
    });

}


function moveMark(level) {
    if (!level) {
        return;
    }
    let markPosition = level.findIndex(el=>!!el);
    let currntMark = level[markPosition];
    let newMark = currntMark;

    if (currntMark === 1 && ++markPosition === level.length) {
        markPosition -= 2;
        newMark = -1;
    }

    if (currntMark === -1 && --markPosition === -1) {
        markPosition += 2;
        newMark = 1;
    }

    level.fill(0);
    level[markPosition] = newMark;
    return level;
}

function thirteen(input) {
    input = prepareInput(input);
    input.forEach((level)=>{level && (level[0] = 1)});

    let severity = 0;
    input.forEach((el, position)=>{
        if (input[position] && input[position][0] !== 0) {
            severity += position * input[position].length
        }
        input = input.map(moveMark);
    });

    return severity;

}

console.log(thirteen(input))