import { WebSocketServer } from 'ws';

const clients = new Map();

export function initWebSocket(server) {
    const wss = new WebSocketServer({ server, path: '/ws' });

    wss.on('connection', (ws) => {
        const id = Math.random().toString(36).slice(2);
        clients.set(id, ws);

        ws.on('close', () => clients.delete(id));
        ws.on('error', () => clients.delete(id));
    });

    console.log('WebSocket server initialized');
}

export function broadcastProgress(code, progress, type = 'uploading') {
    const message = JSON.stringify({ code, progress, type });
    clients.forEach((ws) => {
        if (ws.readyState === 1) {
            ws.send(message);
        }
    });
}
