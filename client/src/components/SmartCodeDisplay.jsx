import { motion } from 'framer-motion';

export default function SmartCodeDisplay({ code }) {
    const chars = code.split('');

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: '#1e293b',
        }}>
            {chars.map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: 'inline-block' }}
                >
                    {char}
                </motion.span>
            ))}
        </div>
    );
}
