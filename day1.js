import { fetchInput } from './fetchInput.js';

const input = await fetchInput(1);
const nums = input.split(/\s+/).slice(0, -1);

const a = [];
const b = [];
for (let i = 0; i < nums.length; i++) {
    if (i % 2 === 0) {
        a.push(nums[i]);
    } else {
        b.push(nums[i]);
    }
}

a.sort((a, b) => a - b);
b.sort((a, b) => a - b);
let distance = 0;
for (let i = 0; i < a.length; i++) {
    distance += Math.abs(a[i] - b[i]);
}
console.log('Distance:', distance);

let similarity = 0;
for (const element of a) {
    similarity += element * b.filter(num => num === element).length;
}
console.log('Similarity:', similarity);
