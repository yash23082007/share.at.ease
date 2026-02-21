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

            {/* Created by */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <h2 style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>
                    Created by
                </h2>
                <GlassCard style={{ padding: 32, marginBottom: 56 }}>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 8, letterSpacing: '-0.015em' }}>
                            Yash Vijay
                        </h3>
                        <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>
                            Developer &amp; Creator of share.at.ease
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                            <a
                                href="https://github.com/yash23082007"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                    padding: '10px 20px', borderRadius: 10,
                                    background: '#0f172a', color: '#fff',
                                    fontSize: 13, fontWeight: 600, textDecoration: 'none',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(15,23,42,0.3)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                                GitHub
                            </a>
                            <a
                                href="https://www.linkedin.com/in/yash-vijay-b0a75937a"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                    padding: '10px 20px', borderRadius: 10,
                                    background: '#0077B5', color: '#fff',
                                    fontSize: 13, fontWeight: 600, textDecoration: 'none',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,119,181,0.3)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                LinkedIn
                            </a>
                            <a
                                href="https://www.instagram.com/yash_vj23"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                    padding: '10px 20px', borderRadius: 10,
                                    background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                                    color: '#fff',
                                    fontSize: 13, fontWeight: 600, textDecoration: 'none',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(225,48,108,0.3)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                                Instagram
                            </a>
                            <a
                                href="mailto:ktanayash@gmail.com"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                    padding: '10px 20px', borderRadius: 10,
                                    background: '#EA4335', color: '#fff',
                                    fontSize: 13, fontWeight: 600, textDecoration: 'none',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(234,67,53,0.3)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                                Email
                            </a>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

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
