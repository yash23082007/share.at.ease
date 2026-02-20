import { useState, useEffect } from 'react';

export default function CountdownTimer({ expiresAt }) {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        function update() {
            const diff = new Date(expiresAt).getTime() - Date.now();
            if (diff <= 0) {
                setTimeLeft('Expired');
                return;
            }
            const mins = Math.floor(diff / 60000);
            const secs = Math.floor((diff % 60000) / 1000);
            setTimeLeft(`${mins}m ${secs.toString().padStart(2, '0')}s`);
        }

        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, [expiresAt]);

    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 12px',
            borderRadius: 8,
            background: timeLeft === 'Expired' ? '#fef2f2' : '#f8fafc',
            color: timeLeft === 'Expired' ? '#dc2626' : '#64748b',
            fontSize: 13,
            fontWeight: 500,
            fontFamily: "'JetBrains Mono', monospace",
        }}>
            ⏱ {timeLeft}
        </span>
    );
}
