import { create } from 'zustand';

const useTransferStore = create((set) => ({
    overlayState: 'IDLE',  // IDLE | ENCRYPTING | UPLOADING | CODE_REVEAL | DOWNLOADING | DECRYPTING | SUCCESS | ERROR
    progress: 0,
    smartCode: null,
    fileName: null,
    fileSize: null,
    expiresAt: null,
    errorMessage: null,
    downloadedBlob: null,

    setOverlayState: (state) => set({ overlayState: state }),
    setProgress: (value) => set({ progress: value }),
    setSmartCode: (code) => set({ smartCode: code }),
    setFileInfo: (name, size) => set({ fileName: name, fileSize: size }),
    setExpiresAt: (date) => set({ expiresAt: date }),
    setError: (msg) => set({ overlayState: 'ERROR', errorMessage: msg }),
    setDownloadedBlob: (blob) => set({ downloadedBlob: blob }),
    reset: () => set({
        overlayState: 'IDLE',
        progress: 0,
        smartCode: null,
        fileName: null,
        fileSize: null,
        expiresAt: null,
        errorMessage: null,
        downloadedBlob: null,
    }),
}));

export default useTransferStore;
