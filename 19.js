let input = require('./data/19');
let {getNextTableElement, removeFromArray, getOppositeDirection, DOWN, UP, LEFT, RIGHT} = require('./utlis');

function prepareInput(input) {
    return input.split('\n').map(t => t.split('').map((t) => t === ' ' ? '' : t));
}

class Cell {
    constructor(x, y, value, symbols) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.directions = [];
        this.setAvailableDirections(symbols)
    }

    setAvailableDirections(symbols) {
        const availableDirections = [];
        if (this.value === ' ') {
            return;
        }

        if (this.value !== '-') {
            availableDirections.push(UP, DOWN);
        }

        if (this.value !== '|') {
            availableDirections.push(RIGHT, LEFT);
        }

        this.directions = availableDirections
            .filter(direction => getNextTableElement(symbols, this.x, this.y, direction));

    }
}

class Maze {
    constructor(input) {
        this.alphabet = '';
        this.steps = 0;
        this.canGoFurther = true;

        const symbols = prepareInput(input);

        this.cells = symbols
            .map((line, y) => line.map((symbol, x) => new Cell(x, y, symbol, symbols)));

        const enter = this.findEnter();
        this.direction = enter.direction;
        this.currentCell = this.cells[enter.y][enter.x];

    };

    findEnter() {
        const width = this.cells[0].length;
        const height = this.cells.length;

        for (let i = 0; i < width; i++) {
            if (this.cells[0][i].value === '|') {
                return {direction: DOWN, y: 0, x: i};
            }
            if (this.cells[height - 1][i].value === '|') {
                return {direction: UP, y: height - 1, x: i};
            }

        }

        for (let i = 0; i < height; i++) {
            if (this.cells[i][0].value === '-') {
                return {direction: RIGHT, y: i, x: 0};
            }
            if (this.cells[i][width - 1].value === '-') {
                return {direction: LEFT, y: i, x: width - 1};
            }

        }
    }

    makeMove() {
        let newCell = getNextTableElement(this.cells, this.currentCell.x, this.currentCell.y, this.direction);

        if (this.currentCell.value === '+' || !newCell || !newCell.value) {
            const available = this.currentCell.directions;

            removeFromArray(available, this.direction);
            removeFromArray(available, getOppositeDirection(this.direction));

            this.direction = available[0];

            if (!this.direction) {
                this.canGoFurther = false;
            } else {
                newCell = getNextTableElement(this.cells, this.currentCell.x, this.currentCell.y, this.direction);
            }
        }

        if (/\w/.test(this.currentCell.value)) {
            this.alphabet += this.currentCell.value;
        }

        this.steps++;
        this.currentCell = newCell;
    }
}



function nineteen(input) {
    const maze = new Maze(input);

    while (maze.canGoFurther) {
        maze.makeMove()

    }
    return [maze.alphabet, maze.steps];
}

console.log(nineteen(input));