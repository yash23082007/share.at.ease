import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { connectDB } from './db.js';
import { fileRoutes } from './routes/fileRoutes.js';
import { initWebSocket } from './sockets/progressSocket.js';
import { cleanupExpired } from './models/FileRecord.js';
import { ensureUploadDir } from './services/storageService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS — supports comma-separated origins
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000').split(',').map(s => s.trim());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));
app.use(express.json());

// Routes
app.use('/api', fileRoutes);

// Create HTTP server
const server = createServer(app);

// WebSocket
initWebSocket(server);

// Ensure upload dir exists
ensureUploadDir();

// Cleanup expired files every 60 seconds
setInterval(async () => {
    try {
        await cleanupExpired();
    } catch (err) {
        console.error('Cleanup error:', err.message);
    }
}, 60000);

// Start
async function start() {
    try {
        await connectDB();
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start:', err.message);
        process.exit(1);
    }
}

start();
