export async function fetchInput(day) {
    const url = `https://adventofcode.com/2024/day/${day}/input`;
    const cookie = await Deno.readTextFile('.session_cookie');
    const response = await fetch(url, {
        headers: {
            'Cookie': `session=${cookie.trim()}`
        }
    });
    const body = await response.text();
    return body;
}
