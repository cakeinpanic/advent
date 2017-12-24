let input = require('./data/18');

const JUMP = 'jgz';

class Instruction {
    constructor() {
        this.library = {};
    }

    getValue(str) {
        const int = parseInt(str);
        if (isNaN(int)) {
            return this.library[str] === undefined ? 0 : this.library[str];
        }
        return int;
    }

    snd(register) {
        this.lastPlayed = {
            register,
            freq: this.library[register]
        }
    }

    set (register, value) {
        this.library[register] = this.getValue(value);
    }

    mul(register, value) {
        this.library[register] = this.getValue(register) * this.getValue(value);
    }

    add(register, value) {
        this.library[register] = this.getValue(register) + this.getValue(value);
    }

    mod(register, value) {
        this.library[register] = this.library[register] % this.getValue(value);
    }

    rcv(value) {
        if (this.getValue(value)) {
            this.library[this.lastPlayed.register] = this.lastPlayed.freq;
            return true;
        }
    }
}

function prepareInput(input) {
    return input.split('\n')
                .map((str) => {
                    const movement = /\w{3}/.exec(str)[0];
                    const register = str[4];
                    const value = str.substr(6);
                    return {movement, register, value}
                });
}


function eighteen(input) {
    const steps = prepareInput(input);
    const instruction = new Instruction();
    for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        if (step.movement === JUMP) {
            if (instruction.getValue(step.register) !== 0) {
                i += instruction.getValue(step.value);
                if (i < 0 || i >= steps.length) {
                    break;
                }
                i--;
            }
        } else {
            const wasRecovered = instruction[step.movement](step.register, step.value);

            if (wasRecovered) {
                return instruction.lastPlayed.freq;
            }
        }

    }

    return instruction.lastPlayed.freq;
}

// input = `set a 1
// add a 2
// mul a a
// mod a 5
// snd a
// set a 0
// rcv a
// jgz a -1
// set a 1
// jgz a -2`;
console.log(eighteen(input));