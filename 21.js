let input = require('./data/21');
let {getFilledArray, getTableElement, getOppositeDirection, getNextElementCoordinates, turnLeft, turnRight, UP} = require('./utlis');


function getOptions(map) {

    const map3 = rotateMap(map);
    const map4 = rotateMap(map3);
    const map5 = rotateMap(map4);

    return [].concat(...[flipMap(map), flipMap(map3), flipMap(map4), flipMap(map5)])
        .map(mapAsLine).filter((el, i, arr) => arr.indexOf(el) === i);

}

function flipMap(map) {
    const map1 = map.map(line => line.reverse());
    const map2 = map.reverse();
    return [map1, map2];
}

function rotateMap(map) {
    const res = getFilledArray(map.length).map(() => getFilledArray(map.length));
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map.length; j++) {
            res[i][j] = map[map.length - j - 1][i];
        }
    }
    return res;
}

function preparePatterns(input) {
    const result = {};
    input.split('\n').forEach(t => {
        let [from, to] = (t.replace(/\//g, '')).split(' => ');
        const options = getOptions(lineAsMap(from));
        options.forEach(option => {
            result[option] = to;
        })


    });
    return result;
}

function prepareMapInput(input) {
    return input.split('\n').map(t => t.split(''));
}

function getSubMap(startMap, startX, startY, size) {
    return getFilledArray(size).map((v, i) => startMap[startY + i].join('').substr(startX, size).split(''))
}

function mapAsLine(map) {
    return map.map(line => line.join('')).join('')
}

function lineAsMap(string) {
    const size = Math.sqrt(string.length);
    return getFilledArray(size)
        .map((v, i) => string.substr(i * size, size).split(''));
}

function joinMaps(maps, newSize) {
    const mapSize = maps[0].length;
    const mapsInRow = newSize / mapSize;
    console.log(newSize, mapSize, maps.length)
    let p = 0;
    const newMap = getFilledArray(newSize).map(() => [])
    for (let j = 0; j < mapsInRow; j++) {
        for (let k = 0; k < mapSize; k++) {
            const rowIndex = j * mapsInRow + k;
            const submapStartIndex = j;
            console.log(rowIndex, submapStartIndex);
            newMap[rowIndex] = newMap[rowIndex].concat
            (...getFilledArray(mapsInRow)
                .map((t, i) => maps[submapStartIndex + i][k]));
        }
        p++;
    }
    return newMap;
}


class Map {
    constructor(input, patterns) {
        this.mapAsLine = input;
        this.patterns = patterns;
    };

    splitOnSubMaps() {
        const width = Math.pow(this.mapAsLine.length, .5);
        const twoDimensionMap = lineAsMap(this.mapAsLine);
        const newSize = width % 2 === 0 ? 2 : 3;

        let maps = [];
        for (let i = 0; i <= width / newSize + 1; i += newSize) {
            for (let j = 0; j <= width / newSize + 1; j += newSize) {
                maps.push(getSubMap(twoDimensionMap, j, i, newSize));
            }
        }

        const newMaps = maps.map(mapAsLine)
            .map((mapAsLine) => this.detectPattern(mapAsLine))
            .map(lineAsMap);

        const newMap = joinMaps(newMaps, newMaps.length * newSize);
        this.mapAsLine = mapAsLine(newMap);
        console.log(this.mapAsLine)
    }

    detectPattern(mapAsLine) {
        return this.patterns[mapAsLine];
    }


}


function twentyOne(input) {
    const patterns = preparePatterns(input);
    const startGrid = `.#...####`;

    const maze = new Map(startGrid, patterns);
    let i = 0;
    while (i++ < 5) {
        maze.splitOnSubMaps();

    }

    return maze.mapAsLine.replace('.', '').length;
}

console.log(twentyOne(input));