const input = require('./data/20');

function prepareInput(input) {
    return input
        .split('\n')
        .map(str => str.split(', '))
        .map((coords, i) => {
            const regexp = /(\-?\d+),(\-?\d+),(\-?\d+)/;
            const p = regexp.exec(coords[0]).splice(1, 3).map((t) => +t);
            const v = regexp.exec(coords[1]).splice(1, 3).map((t) => +t);
            const a = regexp.exec(coords[2]).splice(1, 3).map((t) => +t);
            return {p, v, a, i}
        })
}

function removeCollided(parts) {
    const collided = {};
    parts.forEach((element) => {
        const key = element.p.reduce((a, b) => a.toString() + b.toString());
        if (collided[key]) {
            collided[key].push(element.i)
        } else {
            collided[key] = [element.i]
        }
    });

    const indexesToBeCollided = Array.prototype.concat
        .apply([], ...Object.keys(collided)
            .map(key => collided[key].length > 1 ? collided[key] : []));

    return indexesToBeCollided.length
        ? parts.filter(element => {
            return !(indexesToBeCollided.includes(element.i))
        })
        : parts;
}


function countPosition(element) {
    return element.p.reduce((a, b) => Math.abs(a) + Math.abs(b));
}

function makeStep(element) {
    element.v = element.v.map((coord, i) => coord + element.a[i]);
    element.p = element.p.map((coord, i) => coord + element.v[i]);

    element.currentPosition = countPosition(element);
    return element;
}


function twentyExtended(input) {
    let parts = prepareInput(input);

    for (let i = 0; i < 100000; i++) {
        parts = removeCollided(parts)
            .map(makeStep);
    }

    return parts.length;

}

function twenty(input) {
    const parts = prepareInput(input);

    for (let i = 0; i < 1000; i++) {
        parts.forEach(makeStep);
    }

    const minP = Math.min(...parts.map((element) => element.currentPosition));
    return parts.find(element => element.currentPosition === minP).i;

}

console.log(twentyExtended(input))