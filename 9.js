let input = require('./data/9');

function countSymbols(symbol, input) {
    let counter = 0;
    let reg = new RegExp(symbol, 'g')
    while (reg.test(input)) {
        counter++
    }
    return counter;
}

function nine(input) {
    const trashRegexp = /\<[^>]*\>/g;

    input = input.replace(/\!./g, '')
                 .replace(/[^\{^\}^\<^\>]/g, '')
                 .replace(trashRegexp, '')
                 .replace(/\{\}/g, `1 `)

    if (countSymbols('<', input) > 0 || countSymbols('>', input) > 0 ||
        countSymbols('{', input) !== countSymbols('}', input)) {
        throw new Error('wrong parse');
    }

    const sumGroupRegexp = /\{((\d+ )+)\}/;
    while (sumGroupRegexp.test(input)) {
        let result = sumGroupRegexp.exec(input);
        let subNumber = result[1].split(' ')
                                 .reverse()
                                 .map(n => +n + 1);

        // remove last phantom match
        subNumber.shift();
        subNumber.push(1);
        input = input.replace(result[0], subNumber.join(' ') + ' ')
    }

    return input.split(' ').map(n => +n).reduce((a, b) => +a + b);
}


console.log(nine(input));