import { fetchInput } from './fetchInput.js';

const testInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;

const input = await fetchInput(5);
const lines = input.trim().split('\n');

const ruleLines = lines.filter(line => line.includes('|'));
const updateLines = lines.filter(line => line.includes(','));

// Parse the rules
const rules = [];
for (const ruleLine of ruleLines) {
    const [before, after] = ruleLine.split('|').map(str => parseInt(str));
    rules.push({ before, after });
}

// Part 1
let sumMiddles = 0;
for (const updateLine of updateLines) {
    const pages = updateLine.split(',').map(str => parseInt(str));

    let isValid = true;
    for (let i = 0; i < pages.length; i++) {
        const page = pages.at(i);
        // Get all rules that apply to this page
        // Note: this will only get the rules that require this page to come *before* another page, but since both pages have to be present for the rule to apply that is enough
        const pageRules = rules.filter(rule => rule.before === page);

        // Check that each rule is followed for the current page
        for (const { after } of pageRules) {
            const afterPageIdx = pages.indexOf(after);
            if (afterPageIdx < i && afterPageIdx !== -1) {
                isValid = false;
                break;
            }
        }
    }

    // Add the middle element to our sum if the update is valid
    if (isValid) {
        sumMiddles += pages[Math.floor(pages.length / 2)];
    }
}

console.log('Sum of middle elements of valid updates:', sumMiddles);

// Part 2
let sumInvalidMiddles = 0;
for (const updateLine of updateLines) {
    const pages = updateLine.split(',').map(str => parseInt(str));

    const brokenRules = [];
    let isValid = true;
    for (let i = 0; i < pages.length; i++) {
        const page = pages.at(i);
        // Get all rules that apply to this page
        // Note: this will only get the rules that require this page to come *before* another page, but since both pages have to be present for the rule to apply that is enough
        const pageRules = rules.filter(rule => rule.before === page);

        // Check that each rule is followed for the current page
        for (const pageRule of pageRules) {
            const afterPageIdx = pages.indexOf(pageRule.after);
            if (afterPageIdx < i && afterPageIdx !== -1) {
                isValid = false;
                brokenRules.push(pageRule);
            }
        }
    }

    // If not valid, sort according to our page rules
    if (!isValid) {
        const sortedPages = [...pages];
        
        // For each broken rule, move the "after" page to be immediately after the "before" page
        for (const { before, after } of brokenRules) {
            const beforeIdx = sortedPages.indexOf(before);
            const afterIdx = sortedPages.indexOf(after);
            if (beforeIdx > afterIdx) {
                sortedPages.splice(beforeIdx, 1);
                sortedPages.splice(afterIdx, 0, before);
            }
        }
        sumInvalidMiddles += sortedPages[Math.floor(pages.length / 2)];
    }
}
console.log('Sum of middle elements of sorted invalid updates:', sumInvalidMiddles);