import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';

export function ensureUploadDir() {
    if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }
}

export function getStoragePath(code) {
    return path.join(UPLOAD_DIR, `${code}.enc`);
}

export function deleteFile(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    } catch (err) {
        console.error('Delete file error:', err.message);
    }
}

export function fileExists(filePath) {
    return fs.existsSync(filePath);
}
