const DOWN = 'down';
const UP = 'up';
const LEFT = 'left';
const RIGHT = 'right';


function getOppositeDirection(direction) {
    switch (direction) {
        case LEFT:
            return RIGHT;
        case RIGHT:
            return LEFT;
        case UP:
            return DOWN;
        case DOWN:
            return UP;
    }
}


function copyArray(array) {
    return [].concat(array);
}

function removeFromArray(arr, el) {
    let index = arr.indexOf(el);
    if (index > -1) arr.splice(index, 1)
}


function shiftArray(input, index) {
    input = copyArray(input);
    while (index > 0) {
        index--;
        input.unshift(input.pop());
    }
    while (index < 0) {
        index++;
        input.push(input.shift());
    }
    return input;
}

function getFilledArray(length) {
    return new Array(length)
        .fill(0)
}

function getTableElement(y, x) {
    return this.table[y] && this.table[y][x] || 0;
}

function getNextTableElement(table, x, y, direction) {
    if (direction === DOWN) {
        y++;
    }
    if (direction === UP) {
        y--;
    }
    if (direction === LEFT) {
        x--;
    }
    if (direction === RIGHT) {
        x++;
    }

    return getTableElement.call({table}, y, x);
}
module.exports = {
    shiftArray, removeFromArray,
    getNextTableElement,
    copyArray, getFilledArray,
    getTableElement,
    getOppositeDirection,
    DOWN, UP, RIGHT, LEFT
};