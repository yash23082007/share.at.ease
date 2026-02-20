/**
 * Derive an AES-256 key from smartCode + salt using SHA-256
 */
async function deriveKey(smartCode, salt) {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(smartCode + salt),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
    );

    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: encoder.encode(salt),
            iterations: 100000,
            hash: 'SHA-256',
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
}

/**
 * Encrypt file buffer with AES-256-GCM
 */
export async function encryptFile(fileBuffer, smartCode, serverSalt) {
    const key = await deriveKey(smartCode, serverSalt);
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        fileBuffer
    );

    return { encrypted, iv };
}

/**
 * Decrypt file buffer with AES-256-GCM
 */
export async function decryptFile(encryptedBuffer, iv, smartCode, serverSalt) {
    const key = await deriveKey(smartCode, serverSalt);
    const ivCopy = new Uint8Array(iv);

    return crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: ivCopy },
        key,
        encryptedBuffer
    );
}

/**
 * Pack encrypted data + IV into a single blob for upload
 */
export function packEncryptedFile(encrypted, iv) {
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encrypted), iv.length);
    return new Blob([combined]);
}

/**
 * Unpack downloaded blob into IV + encrypted data
 */
export function unpackEncryptedFile(data) {
    const bytes = new Uint8Array(data);
    const iv = new Uint8Array(bytes.slice(0, 12));
    const encrypted = bytes.slice(12).buffer;
    return { iv, encrypted };
}

/**
 * Read a File as ArrayBuffer
 */
export function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}
