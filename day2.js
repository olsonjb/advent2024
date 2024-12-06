import { fetchInput } from './fetchInput.js';

const reports = (await fetchInput(2)).split('\n').slice(0, -1);

function validateReports(reports, dampener = false) {
    let validCount = 0;
    for (const report of reports) {
        const levels = report.split(' ');
        let valid = true;

        const validateReport = (levels) => {
            let direction = 0;
            let prev = undefined;
            for (let level of levels) {
                level = parseInt(level);
                if (prev === undefined) {
                    prev = level;
                    continue;
                }

                // Step size between levels is 1 - 3
                if (Math.abs(prev - level) < 1 || Math.abs(prev - level) > 3) {
                    return false;
                }

                // All increasing/decreasing in same direction
                if (prev < level) {
                    if (direction === 0) {
                        direction = 1;
                    } else if (direction === -1) {
                        return false;
                    }
                } else if (prev > level) {
                    if (direction === 0) {
                        direction = -1;
                    } else if (direction === 1) {
                        return false;
                    }
                }

                prev = level;
            }
            return true;
        }

        valid = validateReport(levels);
        if (dampener && !valid) {
            // Try validating the report with one level dampened at a time.
            // Note: I would have preferred a more scalable dampener, as this only works for one, but it works 🤷🏽‍♂️.
            for (let i = 0; i < levels.length; i++) {
                const dampenedLevels = [...levels];
                dampenedLevels.splice(i, 1);
                valid = validateReport(dampenedLevels);
                if (valid) {
                    break;
                }
            }
        }

        if (valid) {
            validCount++;
        }
    }

    console.log(`Valid reports (dampener ${dampener}):`, validCount);
}

validateReports(reports);
validateReports(reports, true);