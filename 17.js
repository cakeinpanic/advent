function seventeen(input) {
    function move(currentIndex, diff) {
        return (currentIndex + diff ) % seq.length;
    }

    let currentIndex = 0;
    const seq = [0];
    for (let i = 1; i <= 2017; i++) {
        currentIndex = move(currentIndex, input);
        seq.splice(++currentIndex, 0, i);
    }
    return seq[currentIndex];
}

console.log(seventeen(359));