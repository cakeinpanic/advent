const input = require('./data/16');
let {shiftArray} = require('./utlis');

const SPIN = 's';
const EXCHANGE = 'x';
const PARTNER = 'p';

const {getFilledArray} = require('./utlis');


function prepareInput(input) {
    return input.split(',')
                .map((str) => {
                    const movement = str.split('').splice(0, 1).join('');
                    const digits = str.substr(1).split('/');
                    if (movement === SPIN) {
                        return {movement, step: digits[0]}
                    }
                    if (movement === EXCHANGE) {
                        return {movement, position1: digits[0], position2: digits[1]}
                    }
                    if (movement === PARTNER) {
                        return {movement, letter1: digits[0], letter2: digits[1]}
                    }
                });
}


function sixten(input) {
    const steps = prepareInput(input);
    const startCharCode = 'a'.charCodeAt(0);
    let sequence = getFilledArray(16).map((el, i) => String.fromCharCode(i + startCharCode));

    function exchange(position1, position2) {
        let a = sequence[position2];
        sequence[position2] = sequence[position1];
        sequence[position1] = a;
    }

    steps.forEach(step => {
        switch (step.movement) {
            case SPIN:
                sequence = shiftArray(sequence, step.step);
                break;
            case EXCHANGE:
                exchange(step.position1, step.position2);
                break;
            case PARTNER:
                exchange(sequence.indexOf(step.letter1), sequence.indexOf(step.letter2));
                break;
        }
    });

    return sequence.join('');

}

console.log(sixten(input));