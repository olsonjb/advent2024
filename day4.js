import { fetchInput } from './fetchInput.js';

const input = await fetchInput(4);
const lines = input.split('\n').slice(0, -1);

// Part 1
let count = 0;
for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
        if (lines.at(i)?.at(j) === 'X') {
            // Up
            if ( i >= 3 &&
                lines.at(i - 1)?.at(j) === 'M' &&
                lines.at(i - 2)?.at(j) === 'A' &&
                lines.at(i - 3)?.at(j) === 'S'
            ){
                count++;
            }
            // Down
            if ( i <= lines.length - 4 &&
                lines.at(i + 1)?.at(j) === 'M' &&
                lines.at(i + 2)?.at(j) === 'A' &&
                lines.at(i + 3)?.at(j) === 'S'
            ){
                count++;
            }
            // Left
            if ( j >= 3 &&
                lines.at(i)?.at(j - 1) === 'M' &&
                lines.at(i)?.at(j - 2) === 'A' &&
                lines.at(i)?.at(j - 3) === 'S'
            ){
                count++;
            }
            // Right
            if ( j <= lines[0].length - 4 &&
                lines.at(i)?.at(j + 1) === 'M' &&
                lines.at(i)?.at(j + 2) === 'A' &&
                lines.at(i)?.at(j + 3) === 'S'
            ){
                count++;
            }
            // Up-Left
            if ( i >= 3 && j >= 3 &&
                lines.at(i - 1)?.at(j - 1) === 'M' &&
                lines.at(i - 2)?.at(j - 2) === 'A' &&
                lines.at(i - 3)?.at(j - 3) === 'S'
            ){
                count++;
            }
            // Up-Right
            if ( i >= 3 && j <= lines[0].length - 4 &&
                lines.at(i - 1)?.at(j + 1) === 'M' &&
                lines.at(i - 2)?.at(j + 2) === 'A' &&
                lines.at(i - 3)?.at(j + 3) === 'S'
            ){
                count++;
            }
            // Down-Left
            if ( i <= lines.length - 4 && j >= 3 &&
                lines.at(i + 1)?.at(j - 1) === 'M' &&
                lines.at(i + 2)?.at(j - 2) === 'A' &&
                lines.at(i + 3)?.at(j - 3) === 'S'
            ){
                count++;
            }
            // Down-Right
            if ( i <= lines.length - 4 && j <= lines[0].length - 4 &&
                lines.at(i + 1)?.at(j + 1) === 'M' &&
                lines.at(i + 2)?.at(j + 2) === 'A' &&
                lines.at(i + 3)?.at(j + 3) === 'S'
            ){
                count++;
            }
        }
    }
}

console.log('XMAS count:', count);

// Part 2
function getOppositeLetter(letter) {
    switch (letter) {
        case 'M':
            return 'S';
        case 'S':
            return 'M';
    }
}

let xCount = 0;
for (let i = 0; i < lines.length - 2; i++) {
    for (let j = 0; j < lines[0].length - 2; j++) {
        const topLeft = lines.at(i)?.at(j);
        if (topLeft === 'M' || topLeft === 'S') {
            const bottomLeft = lines.at(i + 2)?.at(j);
            if (bottomLeft === 'M' || bottomLeft === 'S') {
                const center = lines.at(i + 1)?.at(j + 1);
                const topRight = lines.at(i)?.at(j + 2);
                const bottomRight = lines.at(i + 2)?.at(j + 2);
                if (
                    center === 'A' &&
                    bottomRight === getOppositeLetter(topLeft) && 
                    topRight === getOppositeLetter(bottomLeft)
                ) {
                    xCount++;
                }
            }
        }
    }
}
console.log('X-MAS count:', xCount);