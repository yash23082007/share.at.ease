import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import useTransferStore from '../store/transferStore';
import { validateCode, downloadFile, getServerSalt } from '../lib/api';
import { decryptFile, unpackEncryptedFile } from '../lib/encryption';
import { isValidSmartCode, formatSmartCode } from '../lib/codeUtils';

export default function Receive() {
    const [searchParams] = useSearchParams();
    const [code, setCode] = useState('');
    const [validationState, setValidationState] = useState('idle'); // idle | validating | valid | invalid | expired
    const [fileInfo, setFileInfoLocal] = useState(null);

    const { setOverlayState, setProgress, setFileInfo, setError, setDownloadedBlob, overlayState } =
        useTransferStore();

    const handleValidate = useCallback(async (smartCode) => {
        if (!isValidSmartCode(smartCode)) {
            setValidationState('invalid');
            return;
        }

        setValidationState('validating');
        try {
            const result = await validateCode(smartCode);
            if (result.valid) {
                setValidationState('valid');
                setFileInfoLocal({ fileName: result.fileName, fileSize: result.fileSize });
            }
        } catch {
            setValidationState('expired');
        }
    }, []);

    // QR auto-fill from URL
    useEffect(() => {
        const qrCode = searchParams.get('code');
        if (qrCode && isValidSmartCode(qrCode)) {
            setCode(qrCode);
            handleValidate(qrCode);
        }
    }, [searchParams, handleValidate]);

    const handleCodeChange = (e) => {
        const formatted = formatSmartCode(e.target.value);
        setCode(formatted);
        setValidationState('idle');
        if (isValidSmartCode(formatted)) handleValidate(formatted);
    };

    const handleReceive = async () => {
        if (!isValidSmartCode(code)) return;

        try {
            setFileInfo(fileInfo?.fileName || 'file', fileInfo?.fileSize || 0);

            // Download
            setOverlayState('DOWNLOADING');
            setProgress(0);

            let dlProgress = 0;
            const interval = setInterval(() => {
                dlProgress = Math.min(dlProgress + 15, 90);
                setProgress(dlProgress);
            }, 200);

            const encryptedData = await downloadFile(code);
            clearInterval(interval);
            setProgress(100);

            // Decrypt
            setOverlayState('DECRYPTING');
            setProgress(0);

            const salt = await getServerSalt();
            setProgress(20);

            const { iv, encrypted } = unpackEncryptedFile(encryptedData);
            setProgress(50);

            const decrypted = await decryptFile(encrypted, iv, code, salt);
            setProgress(90);

            const blob = new Blob([decrypted]);
            setDownloadedBlob(blob);
            setProgress(100);

            // Trigger download
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileInfo?.fileName || 'download';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            setOverlayState('SUCCESS');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Download failed');
        }
    };

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <div style={{ maxWidth: '40rem', margin: '0 auto', padding: '32px 24px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', marginBottom: 8, letterSpacing: '-0.025em' }}>Receive a file</h1>
                <p style={{ color: '#64748b', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>
                    Type the code you were given. The file will be
                    decrypted locally — nothing is stored.
                </p>
            </motion.div>

            <GlassCard style={{ padding: 32, marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#475569', marginBottom: 12 }}>Smart code</label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        value={code}
                        onChange={handleCodeChange}
                        placeholder="EASE-7KP9"
                        maxLength={9}
                        autoComplete="off"
                        spellCheck="false"
                        style={{
                            width: '100%', padding: '16px 20px',
                            background: '#fff', border: '1px solid #e2e8f0',
                            borderRadius: 16, fontSize: 24,
                            fontFamily: "'JetBrains Mono', monospace",
                            fontWeight: 700, textAlign: 'center',
                            letterSpacing: '0.15em', color: '#1e293b',
                            outline: 'none',
                        }}
                    />

                    <AnimatePresence>
                        {validationState === 'validating' && (
                            <motion.div
                                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div style={{
                                    width: 20, height: 20,
                                    border: '2px solid #c7d2fe', borderTopColor: '#4338ca',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite',
                                }} />
                            </motion.div>
                        )}
                        {validationState === 'valid' && (
                            <motion.div
                                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: '#22c55e' }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', damping: 15 }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </motion.div>
                        )}
                        {(validationState === 'invalid' || validationState === 'expired') && (
                            <motion.div
                                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: '#ef4444' }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', damping: 15 }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {validationState === 'expired' && (
                        <motion.p
                            style={{ marginTop: 12, fontSize: 14, color: '#ef4444', textAlign: 'center' }}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            This code has expired or doesn't exist.
                        </motion.p>
                    )}
                    {validationState === 'valid' && fileInfo && (
                        <motion.div
                            style={{
                                marginTop: 16, padding: 16, background: '#f0fdf4',
                                borderRadius: 12, border: '1px solid #dcfce7',
                                display: 'flex', alignItems: 'center', gap: 12,
                            }}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <div style={{
                                width: 40, height: 40, borderRadius: 8, background: '#dcfce7',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                </svg>
                            </div>
                            <div>
                                <p style={{ fontSize: 14, fontWeight: 500, color: '#1e293b' }}>{fileInfo.fileName}</p>
                                <p style={{ fontSize: 12, color: '#94a3b8' }}>{formatSize(fileInfo.fileSize)}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </GlassCard>

            {/* Button */}
            <motion.button
                style={{
                    width: '100%', padding: 16, borderRadius: 16, fontWeight: 500, fontSize: 14,
                    cursor: validationState === 'valid' && overlayState === 'IDLE' ? 'pointer' : 'not-allowed',
                    background: validationState === 'valid' && overlayState === 'IDLE' ? '#4338ca' : '#f1f5f9',
                    color: validationState === 'valid' && overlayState === 'IDLE' ? '#fff' : '#94a3b8',
                    boxShadow: validationState === 'valid' ? '0 4px 14px rgba(67,56,202,0.25)' : 'none',
                    border: 'none',
                }}
                disabled={validationState !== 'valid' || overlayState !== 'IDLE'}
                onClick={handleReceive}
                whileHover={validationState === 'valid' ? { y: -2 } : undefined}
                whileTap={validationState === 'valid' ? { scale: 0.98 } : undefined}
            >
                {validationState === 'valid' ? 'Decrypt & Download' : 'Enter a valid smart code'}
            </motion.button>

            <motion.p
                style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', marginTop: 24 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                Tip: you can also scan a QR code — the code fills in automatically.
            </motion.p>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
