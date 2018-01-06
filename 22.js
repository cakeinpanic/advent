let input = require('./data/22');
let {getFilledArray, getTableElement, getOppositeDirection, getNextElementCoordinates, turnLeft, turnRight, UP} = require('./utlis');

function prepareInput(input) {
    return input.split('\n').map(t => t.split(''));
}

const CLEAN = 'clean';
const WEAKENED = 'weakened';
const INFECTED = 'infected';
const FLAGGED = 'flagged';

class Cell {
    constructor(value, extended) {
        this.status = value === '#' ? INFECTED : CLEAN;
        this.flags = extended ? [CLEAN, WEAKENED, INFECTED, FLAGGED] : [CLEAN, INFECTED];
    }

    increaseFlag() {
        const currentFlagIndex = this.flags.indexOf(this.status);
        this.status = this.flags[(currentFlagIndex + 1) % this.flags.length];
    }

    get infected() {
        return this.status === INFECTED;
    }
}

class Map {
    constructor(input, extended) {
        this.extended = extended;
        this.cells = prepareInput(input)
            .map((line) => line.map((symbol) => new Cell(symbol, this.extended)));

        this.getCell = getTableElement.bind({table: this.cells});
        this.infectedMoves = 0;
        this.width = this.cells[0].length;
        this.height = this.cells.length;

        const enter = this.findEnter();
        this.direction = UP;
        this.currentCell = this.cells[enter.y][enter.x];

        this.x = enter.x;
        this.y = enter.y;
    };

    changeDirection() {
        if (this.extended) {
            if (this.currentCell.status === WEAKENED) {
                return;
            }
            if (this.currentCell.status === FLAGGED) {
                this.direction = getOppositeDirection(this.direction);
                return;
            }
        }
        this.direction = this.currentCell.infected ? turnRight(this.direction) : turnLeft(this.direction);
    }

    findEnter() {
        return {x: Math.floor(this.width / 2), y: Math.floor(this.height / 2)};
    }

    makeMove() {
        this.changeDirection();
        this.currentCell.increaseFlag();

        if (this.currentCell.infected) {
            this.infectedMoves++;
        }

        const {x, y} = getNextElementCoordinates(this.x, this.y, this.direction);
        this.x = x;
        this.y = y;
        let newCell = this.getCell(this.y, this.x);

        if (!newCell) {
            this.expandMap();
            newCell = this.getCell(this.y, this.x);
        }

        this.currentCell = newCell;
    }

    expandMap() {
        this.width += 2;
        this.height += 2;
        this.cells.forEach(line => line.push(new Cell('.', this.extended)));
        this.cells.forEach(line => line.unshift(new Cell('.', this.extended)));

        this.cells.push(getFilledArray(this.width).map(() => new Cell('.', this.extended)));
        this.cells.unshift(getFilledArray(this.width).map(() => new Cell('.', this.extended)));

        this.x++;
        this.y++;
    }
}


function twentyTwo(input, moves = 10000, extended) {
    const maze = new Map(input, extended);
    let i = 0;
    while (i++ < moves) {
        maze.makeMove()
    }

    return maze.infectedMoves;
}

function twentyTwoExtended(input) {
    return twentyTwo(input, 10000000, true)
}

console.log(twentyTwo(input));
console.log(twentyTwoExtended(input));