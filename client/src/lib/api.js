const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function getServerSalt() {
    const res = await fetch(`${API_BASE}/salt`);
    if (!res.ok) throw new Error('Failed to get server salt');
    const data = await res.json();
    return data.salt;
}

export async function uploadFile(encryptedBlob, originalName, smartCode, maxDownloads = 1, expiryMinutes = 10) {
    const formData = new FormData();
    formData.append('file', encryptedBlob, 'encrypted.bin');
    formData.append('originalName', originalName);
    formData.append('smartCode', smartCode);
    formData.append('maxDownloads', String(maxDownloads));
    formData.append('expiryMinutes', String(expiryMinutes));

    const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) throw new Error('Upload failed');
    return await res.json();
}

export async function validateCode(code) {
    const res = await fetch(`${API_BASE}/validate/${code}`);
    if (!res.ok) throw new Error('Code is expired or invalid');
    return await res.json();
}

export async function downloadFile(code) {
    const res = await fetch(`${API_BASE}/download/${code}`);
    if (!res.ok) throw new Error('Download failed');
    return await res.arrayBuffer();
}
