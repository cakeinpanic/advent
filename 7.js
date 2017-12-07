function findMasterLeaf(input) {
    return input.find(leaf => {
        let parent = input.find(parentLeaf => parentLeaf.children.indexOf(leaf.name) > -1);
        return !parent;
    });
}

function getByName(name, array) {
    return array.find(leaf => leaf.name === name);
}

function findBadWeightIndex(leafs) {
    let index = 0;
    while (index < leafs.length - 1) {
        let badLeaf = leafs[index];
        if (badLeaf !== leafs[index + 1]) {
            return index + 1;
        }
        index++;

    }
    return -1;
}


function getWeightDiff(weightsArray, badLeafIndex) {
    let goodLeafIndex = (badLeafIndex + 1) % weightsArray.length;
    return weightsArray[badLeafIndex] - weightsArray[goodLeafIndex];

}

function countLeafWeight(leaf, array) {
    if (leaf.children.length === 0) {
        return leaf.weight;
    }

    return leaf.weight + leaf.children
                             .map(child => countLeafWeight(getByName(child, array), array))
                             .reduce((a, b) => a + b);
}


function seven(input) {
    return findMasterLeaf(input).name;
}

function sevenExtended(input) {
    let weightBalancer = 0;

    function findBadLeafWeight(leaf) {
        let children = leaf.children.map(child => getByName(child, input));
        let childrenWeight = children.map(child => countLeafWeight(child, input));
        let badLeafIndex = findBadWeightIndex(childrenWeight);

        weightBalancer = weightBalancer === 0 ? getWeightDiff(childrenWeight, badLeafIndex) : weightBalancer;

        if (badLeafIndex === -1) {
            return leaf.weight;
        }
        return findBadLeafWeight(children[badLeafIndex]);
    }

    return findBadLeafWeight(findMasterLeaf(input)) - weightBalancer;
}
