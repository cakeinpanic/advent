let input = require('./data/22');
let {getFilledArray, getTableElement, getNextElementCoordinates, turnLeft, turnRight, UP} = require('./utlis');

function prepareInput(input) {
    return input.split('\n').map(t => t.split(''));
}

class Cell {
    constructor(value) {
        this.infected = value === '#';
    }
}

class Map {
    constructor(input) {
        this.cells = prepareInput(input)
            .map((line) => line.map((symbol) => new Cell(symbol)));

        this.infectedMoves = 0;
        this.width = this.cells[0].length;
        this.height = this.cells.length;

        const enter = this.findEnter();
        this.direction = UP;
        this.currentCell = this.cells[enter.y][enter.x];

        this.x = enter.x;
        this.y = enter.y;


    };

    findEnter() {
        return {x: Math.floor(this.width / 2), y: Math.floor(this.height / 2)};
    }

    makeMove() {
        this.direction = this.currentCell.infected ? turnRight(this.direction) : turnLeft(this.direction);
        this.currentCell.infected = !this.currentCell.infected;

        if (this.currentCell.infected) {
            this.infectedMoves++;
        }

        const {x, y} = getNextElementCoordinates(this.x, this.y, this.direction);
        this.x = x;
        this.y = y;
        let newCell = getTableElement.call({table: this.cells}, this.y, this.x);

        if (!newCell) {
            this.expandMap();
            newCell = getTableElement.call({table: this.cells}, this.y, this.x);
        }

        this.currentCell = newCell;
    }

    expandMap() {
        this.width += 2;
        this.height += 2;
        this.cells.forEach(line => line.push(new Cell('.')));
        this.cells.forEach(line => line.unshift(new Cell('.')));

        this.cells.push(getFilledArray(this.width).map(() => new Cell('.')));
        this.cells.unshift(getFilledArray(this.width).map(() => new Cell('.')));

        this.x++;
        this.y++;
    }

    log() {
        console.log(this.cells.map(line => line.map(el => el.infected ? '#' : '.').join('')).join('\n'))
    }
}


function nineteen(input) {
    const maze = new Map(input);
    let i = 0;
    while (i++ < 10000) {
        maze.makeMove()
    }

    return maze.infectedMoves;
}


console.log(nineteen(input));