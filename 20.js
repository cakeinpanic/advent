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
function twenty(input){
input = prepareInput(input);
console.log(input)
}

console.log(twenty(input))