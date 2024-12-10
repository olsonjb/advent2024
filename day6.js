import { fetchInput } from './fetchInput.js';

const testInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`;

const input = await fetchInput(6);
const lines = input.split('\n').slice(0, -1);

// Part 1
let rows = lines.map(line => line.split(''));
let guardRow = rows.findIndex(row => row.includes('^'));
let guardCol = rows[guardRow].indexOf('^');
let direction = 'U';

function guardIsInBounds() {
    return guardRow >= 0 && guardRow < rows.length && guardCol >= 0 && guardCol < rows[0].length;
}

function moveGuard() {
    switch (direction) {
        case 'U':
            if (rows.at(guardRow - 1)?.at(guardCol) === '#') {
                direction = 'R';
            } else {
                guardRow--;
            }
            break;
        case 'R':
            if (rows.at(guardRow)?.at(guardCol + 1) === '#') {
                direction = 'D';
            } else {
                guardCol++;
            }
            break;
        case 'D':
            if (rows.at(guardRow + 1)?.at(guardCol) === '#') {
                direction = 'L';
            } else {
                guardRow++;
            }
            break;
        case 'L':
            if (rows.at(guardRow)?.at(guardCol - 1) === '#') {
                direction = 'U';
            } else {
                guardCol--;
            }
            break;
    }
}

while (guardIsInBounds()) {
    rows[guardRow][guardCol] = 'X';
    moveGuard();
}

const xCount = rows.flat().filter(char => char === 'X').length;
console.log('Visited positions:', xCount);

// Part 2
// Reset the guard
rows = lines.map(line => line.split(''));
guardRow = rows.findIndex(row => row.includes('^'));
guardCol = rows[guardRow].indexOf('^');
direction = 'U';

// Anywhere we cross a row/column that has a path we've already crossed (i.e. we cross a column with an up path and we're going left), one direction off, we could loop

let loopCount = 0;
function getCharsInDirection(direction) {
    switch (direction) {
        case 'U':
            return rows.slice(0, guardRow + 1).map(row => row[guardCol]);
        case 'R':
            return rows[guardRow].slice(guardCol);
        case 'D':
            return rows.slice(guardRow).map(row => row[guardCol]);
        case 'L':
            return rows[guardRow].slice(0, guardCol + 1);
    }
}

function checkForLoop() {
    if (
        // up path on or above us
        (getCharsInDirection('U').filter(chars => chars.includes('U')).length && direction === 'L') ||
        // left path on or to the left of us
        (getCharsInDirection('L').filter(chars => chars.includes('L')).length && direction === 'D') ||
        // down path on or below us
        (getCharsInDirection('D').filter(chars => chars.includes('D')).length && direction === 'R') ||
        // right path on or to the right of us
        (getCharsInDirection('R').filter(chars => chars.includes('R')).length && direction === 'U')
    ) {
        loopCount++;
    }
}

while (guardIsInBounds()) {
    checkForLoop();
    rows[guardRow][guardCol] += direction;
    moveGuard();
}

console.log('Passes test case');
console.log('(FAILS) Loop obstacle positions:', loopCount);