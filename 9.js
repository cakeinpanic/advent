let input = require('./data/9');

function removeAndCountTrash(input) {
    const trashRegexp = /\<([^>]*)\>/;
    let trashCount = 0;
    let foundTrash;

    input = input.replace(/\!./g, '');
    while (foundTrash = trashRegexp.exec(input)) {
        input = input.replace(foundTrash[0], '');
        trashCount += foundTrash[1].length;
    }

    return {
        cleanInput: input,
        trashCount
    };
}

function nine(input) {
    const groupRegexp = /\{((\d+ )+)\}/;

    input = removeAndCountTrash(input).cleanInput
                                      .replace(/[^\{^\}^\<^\>]/g, '')
                                      .replace(/\{\}/g, `1 `);


    while (groupRegexp.test(input)) {
        let result = groupRegexp.exec(input);
        let subNumber = result[1].replace(/ $/, '')
                                 .split(' ')
                                 .reverse()
                                 .map(n => +n + 1);

        subNumber.push(1);
        input = input.replace(result[0], subNumber.join(' ') + ' ')
    }

    return input.split(' ')
                .map(n => +n)
                .reduce((a, b) => a + b);
}


function nineExtended(input) {
    return removeAndCountTrash(input).trashCount;
}

console.log(nine(input));
console.log(nineExtended(input));