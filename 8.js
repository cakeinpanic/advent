class Registry {

    constructor() {
        this._registry = [];
        this.absoluteMax = 0;
    }

    get (key) {
        if (!this._registry[key]) {
            this._registry[key] = 0;
        }
        return this._registry[key];
    }


    add(key, value) {
        this.get(key);
        this._registry[key] += value;

        this.absoluteMax = (this.absoluteMax < this._registry[key]) ? this._registry[key] : this.absoluteMax;
    }

    getMax() {
        return Math.max(...Object.keys(this._registry).map(key => this._registry[key]));
    }
}

function prepareSteps(input) {
    return input.map(step => {
        let newStep = {letter: step[0]};
        newStep.amount= step[1] === 'dec' ? -step[2] : step[2];
        newStep.condition = step[3].replace('if ', '');

        return newStep;
    });
}


function eight(input, findAAbsoluteMaximum) {
    let registry = new Registry();

    input = prepareSteps(input);

    input.forEach(step => {

        let conditionLetter = /\w+/.exec(step.condition)[0];
        let conditionValue = registry.get(conditionLetter);
        let condition = eval((step.condition).replace(/\w+/, conditionValue));
        if (condition) {
            registry.add(step.letter, step.amount);
        }

    });

    return findAAbsoluteMaximum ? registry.absoluteMax : registry.getMax();
}


function eightExtended(input) {
    return eight(input, true);
}

let input = require('./data/8');

console.log(eight(input));
console.log(eightExtended(input));


