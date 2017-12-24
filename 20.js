const input = require('./data/20');

function prepareInput(input){
return input
.split('\n')
.map(str=>str.split(', '))
.map(coords=>{
    const regexp = /(\-?\d+),(\-?\d+),(\-?\d+)/;
    const p = regexp.exec(coords[0]).splice(1,3);
    const v = regexp.exec(coords[1]).splice(1,3);
    const a = regexp.exec(coords[2]).splice(1,3);
    return {p,v,a}
})
}


function countPosition(element){
return element.p.reduce((a,b)=>Math.abs(a)+Math.abs(b));
}

function anyGettingCloser(parts){
return parts.filter(part=>part.movingCloser).length > 0;
}
function twenty(input){
const parts = prepareInput(input);
const step = 0;
parts.forEach(element => {
    element.currentPosition = countPosition(element);
});

while(parts.length > 0) {
    parts.forEach(element => {
        const prev = element.currentPosition;
        element.v = element.v.map((coord,i) => coord + element.a[i]);
        element.p = element.p.map((coord,i) => coord + element.v[i]);
        const current = countPosition(element);

        if (element.movingCloser && current > prev) {
            element.closestPosition = prev;
        }

        element.movingCloser = current < prev;  
        element.currentPosition = current;
    });

    parts.filter(part=>)
}
}

console.log(twenty(input))