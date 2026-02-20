import express from 'express';
import multer from 'multer';
import { rateLimit } from 'express-rate-limit';
import { createRecord, findByCode, incrementDownloads } from '../models/FileRecord.js';
import { generateUniqueCode } from '../services/codeService.js';
import { getStoragePath, deleteFile } from '../services/storageService.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Rate limiters
const uploadLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: { error: 'Too many uploads' } });
const downloadLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50, message: { error: 'Too many downloads' } });

// Multer storage
const upload = multer({
    dest: process.env.UPLOAD_DIR || './uploads',
    limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || '52428800') },
});

// GET /api/salt
router.get('/salt', (req, res) => {
    res.json({ salt: process.env.SERVER_SALT || 'default-salt' });
});

// POST /api/upload
router.post('/upload', uploadLimiter, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file provided' });

        const { originalName, smartCode: providedCode, maxDownloads = '1', expiryMinutes = '10' } = req.body;

        // Use client-provided code or generate one
        const smartCode = providedCode || await generateUniqueCode();

        // Move file to proper storage path
        const storagePath = getStoragePath(smartCode);
        fs.renameSync(req.file.path, storagePath);

        const expiresAt = new Date(Date.now() + parseInt(expiryMinutes) * 60000);

        await createRecord({
            smartCode,
            originalName: originalName || 'unnamed',
            storagePath,
            fileSize: req.file.size,
            maxDownloads: parseInt(maxDownloads),
            expiresAt,
        });

        res.json({
            smartCode,
            expiresAt: expiresAt.toISOString(),
            fileSize: req.file.size,
        });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: 'Upload failed' });
    }
});

// GET /api/validate/:code
router.get('/validate/:code', async (req, res) => {
    try {
        const record = await findByCode(req.params.code);
        if (!record) return res.status(404).json({ error: 'Not found' });

        if (new Date() > record.expiresAt) {
            return res.status(410).json({ error: 'Expired' });
        }

        res.json({
            valid: true,
            fileName: record.originalName,
            fileSize: record.fileSize,
            expiresAt: record.expiresAt.toISOString(),
            downloadsRemaining: record.maxDownloads - record.downloadCount,
        });
    } catch (err) {
        res.status(500).json({ error: 'Validation failed' });
    }
});

// GET /api/download/:code
router.get('/download/:code', downloadLimiter, async (req, res) => {
    try {
        const record = await findByCode(req.params.code);
        if (!record) return res.status(404).json({ error: 'Not found' });

        if (new Date() > record.expiresAt) {
            return res.status(410).json({ error: 'Expired' });
        }

        if (record.downloadCount >= record.maxDownloads) {
            return res.status(410).json({ error: 'Max downloads reached' });
        }

        // Check file exists
        if (!fs.existsSync(record.storagePath)) {
            return res.status(404).json({ error: 'File not found on server' });
        }

        // Increment download count
        const updated = await incrementDownloads(req.params.code);

        // Send file
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename="encrypted.bin"`);
        fs.createReadStream(record.storagePath).pipe(res);

        // If max downloads reached, schedule deletion
        if (updated && updated.downloadCount >= updated.maxDownloads) {
            setTimeout(() => {
                deleteFile(record.storagePath);
                record.deleteOne().catch(() => { });
            }, 5000);
        }
    } catch (err) {
        res.status(500).json({ error: 'Download failed' });
    }
});

export { router as fileRoutes };
