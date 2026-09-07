import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JSZip from 'jszip';
import GlassCard from '../components/GlassCard';
import DragDropZone from '../components/DragDropZone';
import useTransferStore from '../store/transferStore';
import { getServerSalt, uploadFile } from '../lib/api';
import { encryptFile, packEncryptedFile, readFileAsArrayBuffer } from '../lib/encryption';
import { generateSmartCode } from '../lib/codeUtils';

export default function Share() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [maxDownloads, setMaxDownloads] = useState(1);
    const [expiryMinutes, setExpiryMinutes] = useState(10);

    const { setOverlayState, setProgress, setSmartCode, setFileInfo, setExpiresAt, setError } =
        useTransferStore();

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        try {
            const isMultiple = selectedFiles.length > 1;
            const finalName = isMultiple ? 'SHAREAT_Files.zip' : selectedFiles[0].name;
            const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);

            setFileInfo(finalName, totalSize);

            // Step 1: Get server salt
            const salt = await getServerSalt();

            // Step 2: Generate smart code FIRST (this is the encryption key seed)
            const smartCode = generateSmartCode();

            // Step 3: Encrypt
            setOverlayState('ENCRYPTING');
            setProgress(0);

            let fileBuffer;
            if (isMultiple) {
                const zip = new JSZip();
                for (const file of selectedFiles) {
                    zip.file(file.name, file);
                }
                const zipBlob = await zip.generateAsync({ type: 'blob' });
                fileBuffer = await zipBlob.arrayBuffer();
            } else {
                fileBuffer = await readFileAsArrayBuffer(selectedFiles[0]);
            }
            setProgress(30);

            const { encrypted, iv } = await encryptFile(fileBuffer, smartCode, salt);
            setProgress(80);

            const encryptedBlob = packEncryptedFile(encrypted, iv);
            setProgress(100);

            // Step 4: Upload with SAME smart code
            setOverlayState('UPLOADING');
            setProgress(0);

            let uploadProgress = 0;
            const interval = setInterval(() => {
                uploadProgress = Math.min(uploadProgress + 10, 90);
                setProgress(uploadProgress);
            }, 200);

            const response = await uploadFile(encryptedBlob, finalName, smartCode, maxDownloads, expiryMinutes);

            clearInterval(interval);
            setProgress(100);

            // Step 5: Code reveal
            setOverlayState('CODE_REVEAL');
            setSmartCode(response.smartCode);
            setExpiresAt(response.expiresAt);
            setSelectedFiles([]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
        }
    };

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const inputStyle = {
        width: '100%', padding: '10px 12px',
        background: '#fff', border: '1px solid #e2e8f0',
        borderRadius: 12, fontSize: 14, color: '#475569',
        outline: 'none', cursor: 'pointer',
        fontFamily: 'inherit',
    };

    return (
        <div style={{ maxWidth: '40rem', margin: '0 auto', padding: '32px 24px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', marginBottom: 8, letterSpacing: '-0.025em' }}>Share a file</h1>
                <p style={{ color: '#64748b', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>
                    Drop your file below. It'll be encrypted in your browser
                    with AES-256 before anything leaves your device.
                </p>
            </motion.div>

            <GlassCard style={{ padding: 32, marginBottom: 24 }}>
                <DragDropZone onFileSelect={(files) => setSelectedFiles(prev => [...prev, ...files])} />

                <AnimatePresence>
                    {selectedFiles.length > 0 && (
                        <motion.div
                            style={{
                                marginTop: 24, padding: 16, background: '#f8fafc',
                                borderRadius: 12, border: '1px solid #f1f5f9',
                                display: 'flex', flexDirection: 'column', gap: 12
                            }}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <p style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>{selectedFiles.length} file(s) selected</p>
                                <p style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>Total: {formatSize(selectedFiles.reduce((acc, f) => acc + f.size, 0))}</p>
                            </div>
                            
                            <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {selectedFiles.map((file, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, overflow: 'hidden' }}>
                                            <div style={{
                                                width: 32, height: 32, borderRadius: 6, background: '#e0e7ff', flexShrink: 0,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4338ca" strokeWidth="2" strokeLinecap="round">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                </svg>
                                            </div>
                                            <div style={{ minWidth: 0 }}>
                                                <p style={{ fontSize: 13, fontWeight: 500, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</p>
                                                <p style={{ fontSize: 11, color: '#94a3b8' }}>{formatSize(file.size)}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== idx))}
                                            style={{ color: '#94a3b8', cursor: 'pointer', background: 'none', border: 'none', padding: 4, flexShrink: 0 }}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                <path d="M18 6L6 18M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </GlassCard>

            {/* Options */}
            <GlassCard style={{ padding: 32, marginBottom: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#475569', marginBottom: 16 }}>Transfer options</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <div>
                        <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 8 }}>Max downloads</label>
                        <select value={maxDownloads} onChange={(e) => setMaxDownloads(Number(e.target.value))} style={inputStyle}>
                            <option value={1}>1 (one-time)</option>
                            <option value={3}>3 downloads</option>
                            <option value={5}>5 downloads</option>
                            <option value={10}>10 downloads</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 8 }}>Expires after</label>
                        <select value={expiryMinutes} onChange={(e) => setExpiryMinutes(Number(e.target.value))} style={inputStyle}>
                            <option value={5}>5 minutes</option>
                            <option value={10}>10 minutes</option>
                            <option value={30}>30 minutes</option>
                            <option value={60}>1 hour</option>
                        </select>
                    </div>
                </div>
            </GlassCard>

            {/* Button */}
            <motion.button
                style={{
                    width: '100%', padding: '16px', borderRadius: 16, fontWeight: 500, fontSize: 14,
                    cursor: selectedFiles.length > 0 ? 'pointer' : 'not-allowed',
                    background: selectedFiles.length > 0 ? '#4338ca' : '#f1f5f9',
                    color: selectedFiles.length > 0 ? '#fff' : '#94a3b8',
                    boxShadow: selectedFiles.length > 0 ? '0 4px 14px rgba(67,56,202,0.25)' : 'none',
                    border: 'none',
                }}
                disabled={selectedFiles.length === 0}
                onClick={handleUpload}
                whileHover={selectedFiles.length > 0 ? { y: -2 } : undefined}
                whileTap={selectedFiles.length > 0 ? { scale: 0.98 } : undefined}
            >
                {selectedFiles.length > 0 ? 'Encrypt & Share' : 'Select files to continue'}
            </motion.button>
        </div>
    );
}
