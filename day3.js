import { fetchInput } from './fetchInput.js';

const input = await fetchInput(3);

// Part 1
const regex = /mul\(\d{1,3},\d{1,3}\)/g;
const matches = input.match(regex);

const evalMul = (match, sum) => {
    const [a, b] = match.slice(4, -1).split(',');
    return sum + (a * b);
}

const mulSum = matches.reduce((sum, match) => evalMul(match, sum), 0);
console.log('Sum:', mulSum);

// Part 2
const conditionalRegex = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g
const conditionalMatches = input.match(conditionalRegex);

let active = true;
let conditionalSum = 0;
for (const match of conditionalMatches) {
    if (match === 'do()') {
        active = true;
    } else if (match === 'don\'t()') {
        active = false;
    } else if (active) {
        conditionalSum = evalMul(match, conditionalSum);
    }
}
console.log('Conditional Sum:', conditionalSum);