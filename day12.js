let input = require('./data/12');

function prepareInput(input) {
    let map = {};
    input.split('\n')
         .map(str => str.replace('<-->', '').split(/[^\d]+/))
         .forEach((data) => {
             map[data[0]] = data.slice(1);
         });
    return map;
}

function getGroup(map, key) {
    let newKeys = map[key].map(childKey => map[childKey]);
    let changed = false;

    newKeys.forEach((childKeys) => {
        childKeys.forEach(newKey => {
            if (newKey !== key && map[key].indexOf(newKey) === -1) {
                changed = true;
                map[key].push(newKey);
            }
        })
    });

    if (changed) {
        getGroup(map, key);
    }
}

function getFullGroupOfKey(map, startKey) {
    getGroup(map, startKey);
    return map[startKey];
}

function twelve(input, startKey) {
    let map = prepareInput(input);
    return getFullGroupOfKey(map, startKey).length + 1;
}


function twelveExtended(input) {
    let map = prepareInput(input);
    let keys = Object.keys(map);
    let groupsCount = 0;
    while (keys.length) {
        groupsCount++;
        let group = getFullGroupOfKey(map, keys[0]);

        group.forEach((key) => delete map[key]);
        delete map[keys[0]];

        keys = Object.keys(map);
    }

    return groupsCount;
}

console.log(twelve(input, '0'));
console.log(twelveExtended(input));