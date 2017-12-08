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
        let newStep = [step[0]];
        newStep[1] = step[1] === 'dec' ? -step[2] : step[2];
        newStep[2] = step[3].replace('if ', '');

        return newStep;
    });
}


function eight(input, findAAbsoluteMaximum) {
    let registry = new Registry();

    input = prepareSteps(input);

    input.forEach(step => {
        let letter = step[0];

        let conditionLetter = /\w+/.exec(step[2])[0];
        let conditionValue = registry.get(conditionLetter);
        let condition = eval((step[2]).replace(/\w+/, conditionValue));
        if (condition) {
            registry.add(letter, step[1]);
        }

    });

    return findAAbsoluteMaximum ? registry.absoluteMax : registry.getMax();
}


function eightExtended(input) {
    return eight(input, true);
}

console.log(eight(input));
console.log(eightExtended(input));