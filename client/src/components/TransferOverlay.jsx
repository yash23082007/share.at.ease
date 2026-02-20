import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import useTransferStore from '../store/transferStore';
import ProgressRing from './ProgressRing';
import SmartCodeDisplay from './SmartCodeDisplay';
import CountdownTimer from './CountdownTimer';

function OverlayContent() {
    const { overlayState, progress, smartCode, fileName, expiresAt, errorMessage, reset } =
        useTransferStore();

    const shareUrl = smartCode ? `${window.location.origin}/receive?code=${smartCode}` : '';

    const copyCode = () => smartCode && navigator.clipboard.writeText(smartCode);
    const copyLink = () => shareUrl && navigator.clipboard.writeText(shareUrl);

    if (overlayState === 'ENCRYPTING') {
        return (
            <div style={{ textAlign: 'center' }}>
                <motion.div
                    style={{ margin: '0 auto 24px', width: 64, height: 64, borderRadius: 16, background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4338ca" strokeWidth="2" strokeLinecap="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                </motion.div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>Encrypting your file</h3>
                <p style={{ color: '#64748b', fontSize: 14 }}>AES-256-GCM · End-to-end encrypted</p>
                <div style={{ marginTop: 24 }}><ProgressRing progress={progress} /></div>
            </div>
        );
    }

    if (overlayState === 'UPLOADING') {
        return (
            <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: 24 }}><ProgressRing progress={progress} /></div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>Uploading encrypted file</h3>
                <p style={{ color: '#64748b', fontSize: 14 }}>{fileName}</p>
            </div>
        );
    }

    if (overlayState === 'CODE_REVEAL') {
        return (
            <div style={{ textAlign: 'center' }}>
                <motion.div
                    style={{ margin: '0 auto 24px', width: 64, height: 64, borderRadius: 16, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round">
                        <path d="M20 6L9 17l-5-5" />
                    </svg>
                </motion.div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#1e293b', marginBottom: 16 }}>Your smart code</h3>
                {smartCode && <SmartCodeDisplay code={smartCode} />}
                {expiresAt && (
                    <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
                        <CountdownTimer expiresAt={expiresAt} />
                    </div>
                )}

                {/* QR Code */}
                {smartCode && (
                    <motion.div
                        style={{
                            marginTop: 24, display: 'inline-block', padding: 16,
                            background: '#fff', borderRadius: 16,
                            border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring', damping: 20 }}
                    >
                        <QRCodeSVG value={shareUrl} size={140} bgColor="transparent" fgColor="#1e293b" level="M" />
                        <p style={{ fontSize: 10, color: '#94a3b8', marginTop: 8 }}>Scan to receive</p>
                    </motion.div>
                )}

                <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'center' }}>
                    <motion.button
                        style={{ padding: '10px 20px', background: '#4338ca', color: '#fff', borderRadius: 12, fontWeight: 500, fontSize: 14, cursor: 'pointer' }}
                        whileTap={{ scale: 0.96 }}
                        onClick={copyCode}
                    >
                        Copy Code
                    </motion.button>
                    <motion.button
                        style={{ padding: '10px 20px', background: '#fff', color: '#475569', borderRadius: 12, fontWeight: 500, fontSize: 14, border: '1px solid #e2e8f0', cursor: 'pointer' }}
                        whileTap={{ scale: 0.96 }}
                        onClick={copyLink}
                    >
                        Copy Link
                    </motion.button>
                </div>
                <button
                    style={{ marginTop: 12, display: 'block', margin: '12px auto 0', fontSize: 14, color: '#94a3b8', cursor: 'pointer', background: 'none', border: 'none' }}
                    onClick={reset}
                >
                    Done
                </button>
            </div>
        );
    }

    if (overlayState === 'DOWNLOADING') {
        return (
            <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: 24 }}><ProgressRing progress={progress} /></div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>Downloading file</h3>
                <p style={{ color: '#64748b', fontSize: 14 }}>{fileName}</p>
            </div>
        );
    }

    if (overlayState === 'DECRYPTING') {
        return (
            <div style={{ textAlign: 'center' }}>
                <motion.div
                    style={{ margin: '0 auto 24px', width: 64, height: 64, borderRadius: 16, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                    </svg>
                </motion.div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>Decrypting file</h3>
                <p style={{ color: '#64748b', fontSize: 14 }}>Restoring original file locally</p>
                <div style={{ marginTop: 24 }}><ProgressRing progress={progress} /></div>
            </div>
        );
    }

    if (overlayState === 'SUCCESS') {
        return (
            <div style={{ textAlign: 'center' }}>
                <motion.div
                    style={{ margin: '0 auto 24px', width: 64, height: 64, borderRadius: 16, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M20 6L9 17l-5-5" />
                    </svg>
                </motion.div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>File received successfully</h3>
                <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>{fileName} has been decrypted and saved</p>
                <button
                    style={{ padding: '12px 24px', background: '#4338ca', color: '#fff', borderRadius: 12, fontWeight: 500, fontSize: 14, cursor: 'pointer' }}
                    onClick={reset}
                >
                    Done
                </button>
            </div>
        );
    }

    if (overlayState === 'ERROR') {
        return (
            <div style={{ textAlign: 'center' }}>
                <motion.div
                    style={{ margin: '0 auto 24px', width: 64, height: 64, borderRadius: 16, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    animate={{ x: [0, -8, 8, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M15 9l-6 6M9 9l6 6" />
                    </svg>
                </motion.div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>Something went wrong</h3>
                <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>{errorMessage || 'An unexpected error occurred'}</p>
                <button
                    style={{ padding: '12px 24px', background: '#1e293b', color: '#fff', borderRadius: 12, fontWeight: 500, fontSize: 14, cursor: 'pointer' }}
                    onClick={reset}
                >
                    Try Again
                </button>
            </div>
        );
    }

    return null;
}

export default function TransferOverlay() {
    const { overlayState } = useTransferStore();
    const isOpen = overlayState !== 'IDLE';

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.2)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    <motion.div
                        style={{
                            position: 'relative', zIndex: 10,
                            background: 'rgba(255,255,255,0.85)',
                            backdropFilter: 'blur(40px)',
                            WebkitBackdropFilter: 'blur(40px)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: 24,
                            boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                            padding: 40,
                            maxWidth: 420,
                            width: '100%',
                            margin: '0 16px',
                        }}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={overlayState}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <OverlayContent />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
