function remainder(t) {
    return t - Math.floor(t);
}

function closest(t) {
    return remainder(t) > 0.5 ? Math.ceil(t) : Math.floor(t);
}

function third(input) {
    let sqr = closest(Math.sqrt(input));
    let fullSqr = sqr * sqr;
    let steps = {
        down: 0, up: 0, left: 0, right: 0
    };

    if (sqr % 2) {
        steps.down = Math.floor(sqr / 2);
        steps.right = Math.floor(sqr / 2);
        if (input > fullSqr) {
            steps.right++;
            steps.up = input - 1 - fullSqr;
        } else {
            steps.left = fullSqr - input;
        }
    } else {
        steps.left = (sqr / 2);
        steps.up = sqr / 2 - 1;
        if (input > fullSqr) {
            steps.left++;
            steps.down = input - 1 - fullSqr;
        } else {
            steps.right = fullSqr - input;
        }

    }
    return Math.abs(steps.left - steps.right) + Math.abs(steps.up - steps.down);
}

third(347991)

// 37 36  35  34  33  32 31
// 38 17  16  15  14  13 30
// 39 18   5   4   3  12 29
// 40 19   6   1   2  11 28
// 41 20   7   8   9  10 27
// 42 21  22  23   24 25 26
// 43 44  45  46   47 48 49