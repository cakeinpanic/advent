// http://adventofcode.com/2017/day/3

function splitAndSort(input, splitter = ' ') {
    return input.split(splitter).sort();
}

function isPassphraseInvalid(input) {
    return splitAndSort(input)
        .some((word, i, arr) => word === arr[i + 1]);
}

function isPassphraseInvalidAsAnagramm(input) {
    let words = input.split(' ')
        .map((word) => splitAndSort(word, '').join(''))
        .join(' ');

    return isPassphraseInvalid(words)
}

function fourth(input, useAnagramm = false) {
    let validator = useAnagramm ? isPassphraseInvalidAsAnagramm : isPassphraseInvalid;

    return input.reduce((count, phrase) =>
            validator(phrase) ?
                --count
                : count,
        input.length);
}

function fourthExtended(input) {
    return fourth(input, true);
}