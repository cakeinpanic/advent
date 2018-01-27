let input = require('./data/21');
let {getFilledArray} = require('./utlis');


function preparePatterns(input) {
    const result = {};

    input.split('\n').forEach(t => {
        let [from, to] = (t.replace(/\//g, '')).split(' => ');

        getPatternOptions(lineAsMap(from))
            .forEach(option => {
                result[option] = to;
            })
    });
    return result;
}

function getPatternOptions(map) {
    const map1 = rotateMap(map);
    const map2 = rotateMap(map1);
    const map3 = rotateMap(map2);

    return []
        .concat(...[
            flipMap(map),
            flipMap(map1),
            flipMap(map2),
            flipMap(map3)
        ])
        .map(mapAsLine);

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

function getSubMap(startMap, startX, startY, size) {
    return getFilledArray(size)
        .map((v, i) => startMap[startY + i]
            .join('')
            .substr(startX, size)
            .split('')
        );
}

function mapAsLine(map) {
    return map.map(line => line.join('')).join('')
}

function lineAsMap(string) {
    const size = Math.sqrt(string.length);
    return getFilledArray(size).map((v, i) => string.substr(i * size, size).split(''));
}

function joinMapsHorizontally(maps) {
    return maps.reduce((prev, current) => prev.map((line, i) => line.concat(current[i])))
}

function joinMaps(maps) {
    const mapsInRow = Math.sqrt(maps.length);

    return [].concat(
        ...getFilledArray(mapsInRow)
            .map(() => joinMapsHorizontally(maps.splice(0, mapsInRow)))
    );
}


class Map {
    constructor(input, patterns) {
        this.mapAsLine = input;
        this.patterns = patterns;
    };

    splitOnSubMaps() {
        const width = Math.pow(this.mapAsLine.length, .5);
        const twoDimensionMap = lineAsMap(this.mapAsLine);
        const splitSize = width % 2 === 0 ? 2 : 3;

        let maps = [];
        for (let i = 0; i < width; i += splitSize) {
            for (let j = 0; j < width; j += splitSize) {
                maps.push(getSubMap(twoDimensionMap, j, i, splitSize));
            }
        }

        const newMaps = maps.map(mapAsLine)
                            .map((mapAsLine) => this.patterns[mapAsLine])
                            .map(lineAsMap);

        this.mapAsLine = mapAsLine(joinMaps(newMaps));
    }


}


function twentyOne(input, steps =5) {
    const patterns = preparePatterns(input);
    const startGrid = `.#...####`;

    const maze = new Map(startGrid, patterns);
    let i = 0;
    while (i++ < steps) {
        maze.splitOnSubMaps();

    }

    return maze.mapAsLine.replace(/\./g, '').length;
}

function twentyOneExtended(input) {
   return twentyOne(input, 18)
}

console.log(twentyOne(input));
console.log(twentyOneExtended(input));