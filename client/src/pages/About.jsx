import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';

const faq = [
    {
        q: 'What encryption is used?',
        a: 'AES-256-GCM, the same standard used by governments and banks. The encryption key is derived from the smart code using PBKDF2 with SHA-256.',
    },
    {
        q: 'Can the server read my files?',
        a: 'No. Encryption happens entirely in your browser using the Web Crypto API. The server receives and stores only encrypted binary data.',
    },
    {
        q: 'What happens when a file expires?',
        a: 'The encrypted data is permanently deleted from the server. MongoDB TTL indices handle automatic cleanup, and a secondary background process double-checks every 60 seconds.',
    },
    {
        q: 'Why smart codes instead of links?',
        a: "Codes like EASE-7KP9 are easy to read aloud, type on any device, or share over any medium — even voice calls. No confusing characters (we removed 0, O, I, 1).",
    },
];

export default function About() {
    return (
        <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '32px 24px' }}>
            {/* Header */}
            <motion.div
                style={{ marginBottom: 64 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 style={{ fontSize: 36, fontWeight: 700, color: '#0f172a', marginBottom: 16, letterSpacing: '-0.025em' }}>
                    Why this exists
                </h1>
                <p style={{ fontSize: 18, color: '#64748b', maxWidth: '32rem', lineHeight: 1.7 }}>
                    Because sending a file shouldn't require creating an account,
                    installing an app, or wondering who else can see it.
                </p>
            </motion.div>

            {/* Philosophy */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
            >
                <GlassCard style={{ padding: 40, marginBottom: 56 }}>
                    <div style={{ maxWidth: '32rem', margin: '0 auto' }}>
                        <p style={{ color: '#475569', lineHeight: 1.7, fontSize: 15, marginBottom: 20 }}>
                            Most file-sharing tools are built for the company, not for you.
                            They want your email, your data, your attention. They store
                            files forever and sell analytics about what you share.
                        </p>
                        <p style={{ color: '#475569', lineHeight: 1.7, fontSize: 15, marginBottom: 20 }}>
                            <strong style={{ color: '#1e293b' }}>share.at.ease</strong> is
                            the opposite. Files are encrypted in your browser before they
                            ever leave your device. The server stores only unreadable binary.
                            After a few minutes, everything is permanently deleted.
                        </p>
                        <p style={{ color: '#475569', lineHeight: 1.7, fontSize: 15 }}>
                            No sign-ups. No tracking cookies. No "share with
                            enterprise" upsells. Just a code and a file.
                        </p>
                    </div>
                </GlassCard>
            </motion.div>

            {/* FAQ */}
            <motion.h2
                style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 32 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                How the security works
            </motion.h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 56 }}>
                {faq.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.35 + i * 0.06 }}
                    >
                        <GlassCard style={{ padding: 24 }} hover>
                            <h3 style={{ fontWeight: 600, color: '#1e293b', fontSize: 14, marginBottom: 6 }}>{item.q}</h3>
                            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>{item.a}</p>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

            {/* Closing */}
            <motion.div
                style={{ borderTop: '1px solid rgba(226,232,240,0.6)', padding: '48px 0', textAlign: 'center' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
            >
                <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, maxWidth: '24rem', margin: '0 auto' }}>
                    Built because the world doesn't need another
                    file-sharing platform with a freemium paywall.
                    It needs a simple, private way to move a file from A to B.
                </p>
            </motion.div>
        </div>
    );
}
