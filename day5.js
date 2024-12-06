import { fetchInput } from './fetchInput.js';

const input = await fetchInput(5);
const lines = input.trim().split('\n');

const ruleLines = lines.filter(line => line.includes('|'));
const updateLines = lines.filter(line => line.includes(','));

console.log(ruleLines.at(-1));
console.log(updateLines.at(0));