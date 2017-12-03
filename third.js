function closestSquareBase(input) {
    let ceil = Math.pow(Math.ceil(input), 2);
    let floor = Math.pow(Math.floor(input), 2);

    return ceil - input * input > input * input - floor
        ? Math.floor(input)
        : Math.ceil(input)
}

function getSteps(input) {
    let sqr = closestSquareBase(Math.sqrt(input));
    let fullSqr = sqr * sqr;
    let coeff = 1;
    let steps = {
        down: 0, right: 0
    };

    if (!(sqr % 2)) {
        coeff = -1;
        steps.right = 1;
    }

    steps.right += coeff * Math.floor(sqr / 2);
    steps.down += coeff * Math.floor(sqr / 2);

    if (input > fullSqr) {
        steps.right += coeff;
        steps.down -= coeff * (input - 1 - fullSqr);
    } else {
        steps.right -= coeff * (fullSqr - input);
    }

    return steps;
}

function third(input) {
    let steps = getSteps(input);
    return Math.abs(steps.right) + Math.abs(steps.down)
}

function thirdExtended(input) {
    let res = [];
    let n = Math.ceil(Math.pow(input, 1 / 4));
    let center = Math.ceil(n / 2);

    for (let k = 1; k < n * n + 1; k++) {
        let steps = getSteps(k);
        let x = center + steps.right - 1;
        let y = center + steps.down;

        if (!res[y]) {
            res[y] = [];
        }

        res[y][x] = k === 1 ? 1 : 0
            + getElement(y - 1, x)
            + getElement(y + 1, x)
            + getElement(y - 1, x + 1)
            + getElement(y + 1, x + 1)
            + getElement(y - 1, x - 1)
            + getElement(y + 1, x - 1)
            + getElement(y, x - 1)
            + getElement(y, x + 1);

        if (res[y][x] > input) {
            return res[y][x];
        }
    }

    function getElement(y, x) {
        return res[y] && res[y][x] || 0;
    }
}

console.log(third(347991))
console.log(thirdExtended(347991))
console.log(thirdExtended(1000))
