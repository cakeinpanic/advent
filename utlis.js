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


function turnRight(direction) {
    switch (direction) {
        case LEFT:
            return UP;
        case RIGHT:
            return DOWN;
        case UP:
            return RIGHT;
        case DOWN:
            return LEFT;
    }
}

function turnLeft(direction) {
    return turnRight(getOppositeDirection(direction));
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

function getNextTableElement(table, oldX, oldY, direction) {
    const {x, y} = getNextElementCoordinates(oldX, oldY, direction);
    return getTableElement.call({table}, y, x);
}

function getNextElementCoordinates(x, y, direction) {
    if (direction === DOWN) {
        return {x, y: ++y};
    }
    if (direction === UP) {
        return {x, y: --y};
    }
    if (direction === LEFT) {
        return {x: --x, y};
    }
    if (direction === RIGHT) {
        return {x: ++x, y};
    }

}

module.exports = {
    shiftArray, removeFromArray,
    getNextTableElement,
    copyArray, getFilledArray,
    getTableElement,
    turnLeft, turnRight,
    getNextElementCoordinates,
    getOppositeDirection,
    DOWN, UP, RIGHT, LEFT
};