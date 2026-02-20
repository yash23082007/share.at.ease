import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DragDropZone({ onFileSelect, maxSize = 50 * 1024 * 1024, disabled = false }) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleFile = useCallback((file) => {
        setError(null);
        if (file.size > maxSize) {
            setError(`File too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB.`);
            return;
        }
        onFileSelect(file);
    }, [maxSize, onFileSelect]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) setIsDragging(true);
    }, [disabled]);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (disabled) return;
        if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
    }, [disabled, handleFile]);

    return (
        <div style={{ width: '100%' }}>
            <motion.div
                onClick={() => !disabled && fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                    position: 'relative',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    border: `2px dashed ${isDragging ? '#818cf8' : '#e2e8f0'}`,
                    borderRadius: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2.5rem',
                    minHeight: 200,
                    background: isDragging ? 'rgba(224,231,255,0.3)' : 'rgba(248,250,252,0.3)',
                    transition: 'all 0.2s',
                    opacity: disabled ? 0.5 : 1,
                }}
                animate={{ scale: isDragging ? 1.01 : 1 }}
                transition={{ duration: 0.15 }}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => e.target.files?.length > 0 && handleFile(e.target.files[0])}
                    disabled={disabled}
                />

                <motion.div
                    style={{ marginBottom: 12, color: '#94a3b8' }}
                    animate={{ y: isDragging ? -6 : 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M20 26V14M20 14L15 19M20 14L25 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 26C8 30 11 33 15 33H25C29 33 32 30 32 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </motion.div>

                <p style={{ fontSize: 14, fontWeight: 500, color: '#475569', marginBottom: 2 }}>
                    {isDragging ? 'Drop it here' : 'Drop your file here'}
                </p>
                <p style={{ fontSize: 12, color: '#94a3b8' }}>
                    or click to browse · max {Math.round(maxSize / 1024 / 1024)}MB
                </p>
            </motion.div>

            <AnimatePresence>
                {error && (
                    <motion.p
                        style={{ marginTop: 10, fontSize: 14, color: '#ef4444', textAlign: 'center' }}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
