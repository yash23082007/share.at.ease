import { motion } from 'framer-motion';

export default function GlassCard({ children, style = {}, hover = false, ...props }) {
    return (
        <motion.div
            style={{
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(226,232,240,0.6)',
                borderRadius: 16,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.03)',
                ...style,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileHover={hover ? {
                y: -3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.06), 0 20px 40px rgba(0,0,0,0.05)',
                transition: { duration: 0.25 },
            } : undefined}
            {...props}
        >
            {children}
        </motion.div>
    );
}
