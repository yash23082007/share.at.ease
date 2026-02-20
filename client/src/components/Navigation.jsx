import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
    { path: '/', label: 'Home' },
    { path: '/share', label: 'Share' },
    { path: '/receive', label: 'Receive' },
    { path: '/about', label: 'About' },
];

export default function Navigation() {
    const location = useLocation();

    return (
        <motion.header
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40,
            }}
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
            <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '1.25rem 1.5rem' }}>
                <nav style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    border: '1px solid rgba(226,232,240,0.5)',
                    borderRadius: '1rem',
                    padding: '0.625rem 1.25rem',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.03)',
                }}>
                    {/* Logo */}
                    <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
                        <div style={{
                            width: 28, height: 28, borderRadius: 8,
                            background: '#4338ca',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, lineHeight: 1 }}>s.</span>
                        </div>
                        <span style={{ fontWeight: 600, color: '#1e293b', fontSize: 13, letterSpacing: '-0.02em' }}>
                            share.at.ease
                        </span>
                    </NavLink>

                    {/* Links */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    style={{
                                        position: 'relative',
                                        padding: '0.375rem 0.875rem',
                                        borderRadius: 8,
                                        fontSize: 13,
                                        fontWeight: 500,
                                        color: isActive ? '#4338ca' : '#64748b',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s',
                                    }}
                                    onMouseEnter={(e) => { if (!isActive) e.target.style.color = '#1e293b'; }}
                                    onMouseLeave={(e) => { if (!isActive) e.target.style.color = '#64748b'; }}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            style={{
                                                position: 'absolute', inset: 0,
                                                background: 'rgba(224,231,255,0.8)',
                                                borderRadius: 8,
                                            }}
                                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                                        />
                                    )}
                                    <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
                                </NavLink>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </motion.header>
    );
}
