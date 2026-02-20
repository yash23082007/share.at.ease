import { codeExists } from '../models/FileRecord.js';

const CHARS = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

function randomChar() {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
}

function generateCode() {
    const suffix = Array.from({ length: 4 }, randomChar).join('');
    return `EASE-${suffix}`;
}

export async function generateUniqueCode() {
    let code;
    let attempts = 0;
    do {
        code = generateCode();
        attempts++;
        if (attempts > 100) throw new Error('Could not generate unique code');
    } while (await codeExists(code));
    return code;
}
