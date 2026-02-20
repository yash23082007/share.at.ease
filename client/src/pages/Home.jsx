import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';

const steps = [
    {
        num: '01',
        title: 'Drop your file',
        body: 'Select or drag any file. It gets encrypted with AES-256-GCM right inside your browser — nothing leaves unprotected.',
    },
    {
        num: '02',
        title: 'Share the code',
        body: "You get a short, readable code like EASE-7KP9. Text it, whisper it, write it on a napkin — your call.",
    },
    {
        num: '03',
        title: 'They receive it',
        body: "The other person types the code, the file gets decrypted locally, and it downloads. That's it. No accounts, no history.",
    },
];

const principles = [
    {
        title: 'Encrypted end-to-end',
        body: 'AES-256-GCM encryption runs entirely in your browser. The server stores only encrypted binary — it literally cannot read your files.',
    },
    {
        title: 'Automatic expiry',
        body: 'Every file has a countdown. After it expires — 10 minutes by default — the file is permanently gone. No traces, no archives.',
    },
    {
        title: 'No accounts needed',
        body: 'No sign-ups. No profiles. No cookies tracking you across the internet. Just the file and a code.',
    },
    {
        title: 'QR for the lazy',
        body: "Don't want to type? Scan the QR code on the sender's screen and the code auto-fills. It just works.",
    },
];

export default function Home() {
    return (
        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1.5rem' }}>
            {/* Hero */}
            <section style={{ paddingTop: 56, paddingBottom: 96, maxWidth: '36rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{ marginBottom: 32 }}
                >
                    <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        fontSize: 12, fontWeight: 500, color: '#4338ca',
                        background: '#e0e7ff', padding: '4px 12px', borderRadius: 999,
                    }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', animation: 'pulse 2s infinite' }} />
                        Privacy-first file transfer
                    </span>
                </motion.div>

                <motion.h1
                    style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: 800, letterSpacing: '-0.03em',
                        color: '#0f172a', lineHeight: 1.08, marginBottom: 20,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                >
                    Send files with a{' '}
                    <span style={{ color: '#4338ca' }}>code,</span>
                    <br />
                    not a cloud.
                </motion.h1>

                <motion.p
                    style={{ fontSize: 17, color: '#64748b', lineHeight: 1.7, marginBottom: 40, maxWidth: '28rem' }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                >
                    Encrypt your file in the browser, get a human-readable code,
                    and share it however you want. No accounts.
                    No permanent storage. Files auto-delete.
                </motion.p>

                <motion.div
                    style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                >
                    <Link to="/share">
                        <motion.button
                            style={{
                                padding: '12px 28px', background: '#4338ca', color: '#fff',
                                borderRadius: 12, fontWeight: 500, fontSize: 14, cursor: 'pointer',
                                boxShadow: '0 1px 3px rgba(67,56,202,0.3)',
                            }}
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Share a file →
                        </motion.button>
                    </Link>
                    <Link to="/receive">
                        <motion.button
                            style={{
                                padding: '12px 28px', background: '#fff', color: '#475569',
                                borderRadius: 12, fontWeight: 500, fontSize: 14,
                                border: '1px solid #e2e8f0', cursor: 'pointer',
                            }}
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Receive
                        </motion.button>
                    </Link>
                </motion.div>
            </section>

            {/* How it works */}
            <section style={{ paddingBottom: 96 }}>
                <motion.h2
                    style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 40 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                >
                    How it works
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.num}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                        >
                            <GlassCard style={{ padding: 28, height: '100%' }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(67,56,202,0.4)', letterSpacing: '0.05em' }}>{step.num}</span>
                                <h3 style={{ fontWeight: 600, color: '#1e293b', marginTop: 12, marginBottom: 8, fontSize: 15 }}>{step.title}</h3>
                                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>{step.body}</p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Principles */}
            <section style={{ paddingBottom: 112 }}>
                <motion.h2
                    style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 40 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    Built for privacy
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                    {principles.map((p, i) => (
                        <motion.div
                            key={p.title}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.75 + i * 0.07 }}
                        >
                            <GlassCard style={{ padding: 28, height: '100%' }} hover>
                                <h3 style={{ fontWeight: 600, color: '#1e293b', marginBottom: 8, fontSize: 15 }}>{p.title}</h3>
                                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>{p.body}</p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                borderTop: '1px solid rgba(226,232,240,0.6)',
                padding: '40px 0',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                <p style={{ fontSize: 12, color: '#94a3b8' }}>share.at.ease · privacy-first file transfer</p>
                <p style={{ fontSize: 12, color: '#94a3b8' }}>no accounts · no tracking · no clutter</p>
            </footer>
        </div>
    );
}
