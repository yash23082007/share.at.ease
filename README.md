# share.at.ease

**Privacy-first file sharing with end-to-end encryption.**

Send any file with a human-readable code like `EASE-7KP9`. No accounts, no cloud storage, no tracking. Files auto-delete after expiry.

---

## How it works

1. **Drop your file** → encrypted with AES-256-GCM in your browser
2. **Get a smart code** → share it however you want (text, voice, QR scan)
3. **Receiver enters the code** → file is decrypted locally and downloaded

The server never sees your file contents — only encrypted binary.

---

## Features

- 🔐 **End-to-end AES-256-GCM encryption** (Web Crypto API, runs entirely in-browser)
- 📟 **Human-readable smart codes** — easy to read aloud, no confusing characters
- 📱 **QR code sharing** — scan to auto-fill the receive page
- ⏱️ **Auto-expiry** — files are permanently deleted after a configurable timer
- 🚫 **Zero accounts** — no sign-ups, no cookies, no tracking
- 📉 **Download limits** — set max download count per file
- ⚡ **Real-time progress** — encryption, upload, and download progress indicators

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Framer Motion, Zustand, React Router |
| Backend | Express, Node.js, Mongoose, Multer, WebSocket |
| Database | MongoDB (Atlas) |
| Encryption | AES-256-GCM via Web Crypto API, PBKDF2 key derivation |

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Setup

```bash
# Clone the repo
git clone https://github.com/your-username/share-at-ease.git
cd share-at-ease

# Install dependencies
cd server && npm install
cd ../client && npm install
```

### Configure

Create `server/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3001
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=52428800
DEFAULT_EXPIRY_MINUTES=10
SERVER_SALT=your-random-salt-here
CORS_ORIGIN=http://localhost:3000
```

### Run

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

Open **http://localhost:3000**

---

## Security Model

- Encryption key is derived from the smart code using **PBKDF2 + SHA-256** (100,000 iterations)
- Files are encrypted with **AES-256-GCM** before leaving the browser
- The server stores only encrypted binary — it cannot read file contents
- MongoDB **TTL indices** + background cleanup ensure expired files are permanently deleted
- No session tokens, cookies, or user identifiers are stored

---

## Project Structure

```
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── lib/            # Encryption, API, code utils
│   │   ├── pages/          # Home, Share, Receive, About
│   │   └── store/          # Zustand state management
│   └── vite.config.js
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Code generation, file storage
│   │   └── sockets/        # WebSocket progress
│   └── .env
```

---

## License

MIT

---

<p align="center">
  <em>Built because the world doesn't need another file-sharing platform with a freemium paywall.</em>
</p>
