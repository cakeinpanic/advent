let input = require('./data/11');

function getCount(input, str) {
    return input.filter(el => el === str).length;
}

function replaceOpposite(sortedSteps, first, second, replace) {
    // first should be alphabetially first
    if (second < first) {
        return replaceOpposite(sortedSteps, second, first, replace);
    }

    sortedSteps = [].concat(sortedSteps);

    let firstCount = getCount(sortedSteps, first);
    let secondCount = getCount(sortedSteps, second);

    let edited = !(firstCount === 0 || secondCount === 0);

    if (edited) {
        let addCount = Math.min(firstCount, secondCount);

        sortedSteps.splice(sortedSteps.indexOf(second), addCount);
        sortedSteps.splice(sortedSteps.indexOf(first), addCount);

        if (!!replace) {
            sortedSteps = sortedSteps
                .concat(new Array(addCount).fill(replace))
                .sort();
        }
    }

    return {
        sortedSteps, edited
    };
}


function eleven(steps) {
    steps = steps.sort();
    let edited = true;

    let groups = [
        ['nw', 'se'],
        ['ne', 'sw'],
        ['n', 's'],
        ['se', 'sw', 's'],
        ['n', 'se', 'ne'],
        ['ne', 'nw', 'n'],
        ['ne', 's', 'se'],
        ['nw', 's', 'sw'],
        ['nw', 'ne', 'n'],
        ['n', 'sw', 'nw']
    ];

    while (edited) {
        edited = false;
        groups.forEach(group => {
            let newSteps = replaceOpposite(steps, ...group);
            edited = newSteps.edited || edited;
            steps = newSteps.sortedSteps;
        });
    }

    return steps.length;
}

function elevenExtended(steps) {
    let distances = steps.map((step, i) => eleven(steps.slice(0, i)));
    return Math.max(...distances, eleven(steps));

}

console.log(eleven(input.split(',')));
console.log(elevenExtended(input.split(',')));
