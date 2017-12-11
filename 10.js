let input = [63, 144, 180, 149, 1, 255, 167, 84, 125, 65, 188, 0, 2, 254, 229, 24];

function shiftArray(input, index) {
    input = [].concat(input);
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


function ten(lengths, base = 256) {
    let list = new Array(base).fill(1).map((el, i) => i);
    let skipSize = 0;
    let currentPosition = 0;

    lengths.forEach(step => {

        list = shiftArray(list, -currentPosition)

        let substr = list
            .slice(0, step)
            .reverse();

        list.splice(0, step, ...substr);
        list = shiftArray(list, currentPosition);

        currentPosition = (currentPosition + step + skipSize) % list.length;

        skipSize++;
    });

    return list[0] * list[1];
}

console.log(ten(input));
