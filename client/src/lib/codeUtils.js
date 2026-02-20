const CHARS = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // removed 0, O, I, 1

function randomChar() {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export function generateSmartCode() {
    const prefix = 'EASE';
    const suffix = Array.from({ length: 4 }, randomChar).join('');
    return `${prefix}-${suffix}`;
}

export function isValidSmartCode(code) {
    return /^EASE-[23456789A-HJ-NP-Z]{4}$/.test(code);
}

export function formatSmartCode(input) {
    const clean = input.toUpperCase().replace(/[^23456789A-HJ-NP-Z-]/g, '');

    if (clean.startsWith('EASE-')) {
        return 'EASE-' + clean.slice(5, 9);
    }

    if (clean.length <= 4) return clean;
    return clean.slice(0, 4) + '-' + clean.slice(4, 8);
}
