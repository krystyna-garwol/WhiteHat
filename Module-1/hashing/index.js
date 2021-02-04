const msg = "Lorem Ijjaaaaaaaajjpsum";
const tokens = msg.split("")
let blocks = [];
let slice = 0;
const blockSize = 8;
while (slice < tokens.length) {
    blocks.push(tokens.slice(slice, slice += blockSize));
}

while (blocks[blocks.length - 1].length < 8) {
    blocks[blocks.length - 1].push("a")
}

blocks = blocks.map(block => block.map(char => char.charCodeAt()))

function hashBlocks(blocks) {
    const state = [8, 24, 81, 90, 38]

    blocks.forEach(block => {
        state[0] = block[2] + state[3]
        state[1] = state[2] << state[4]
        state[2] = block[1] * block[3]
        state[3] = block.reduce((a, b) => a + b, state[4])
        state[4] = block[0] << block[3]
    })
    return state.join("");
}

const setFixedLen = (state) => {
    if (state.length > 20) {
        return state.substring(0, 20);
    } else {
        let split = state.split('')
        while (split.length < 20) {
            split.push(1);
        }
        return split.join("");
    }
}

const addLettersToHash = (hash) => {
    let array = hash.split('')
    const newList = array.map((no, i) => {
        if ((i + 1) % 2 == 0) {
            return String.fromCharCode(94 + i);
        } else return no;
    })
    return newList.join('');
}

const hash = addLettersToHash(setFixedLen(hashBlocks(blocks)));
console.log(hash);

