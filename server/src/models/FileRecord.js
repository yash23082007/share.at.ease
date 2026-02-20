import mongoose from 'mongoose';
import { deleteFile } from '../services/storageService.js';

const fileRecordSchema = new mongoose.Schema({
    smartCode: { type: String, required: true, unique: true, index: true },
    originalName: { type: String, required: true },
    storagePath: { type: String, required: true },
    fileSize: { type: Number, required: true },
    maxDownloads: { type: Number, default: 1 },
    downloadCount: { type: Number, default: 0 },
    expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } },
    createdAt: { type: Date, default: Date.now },
});

const FileRecord = mongoose.model('FileRecord', fileRecordSchema);

export async function createRecord(data) {
    return FileRecord.create(data);
}

export async function findByCode(code) {
    return FileRecord.findOne({ smartCode: code });
}

export async function incrementDownloads(code) {
    return FileRecord.findOneAndUpdate(
        { smartCode: code },
        { $inc: { downloadCount: 1 } },
        { new: true }
    );
}

export async function deleteRecord(code) {
    return FileRecord.findOneAndDelete({ smartCode: code });
}

export async function codeExists(code) {
    const doc = await FileRecord.findOne({ smartCode: code });
    return !!doc;
}

export async function cleanupExpired() {
    const expired = await FileRecord.find({ expiresAt: { $lte: new Date() } });
    for (const record of expired) {
        deleteFile(record.storagePath);
        await record.deleteOne();
    }
    if (expired.length > 0) {
        console.log(`Cleaned up ${expired.length} expired file(s)`);
    }
}

export default FileRecord;
