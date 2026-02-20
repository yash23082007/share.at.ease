import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import TransferOverlay from './components/TransferOverlay';
import Home from './pages/Home';
import Share from './pages/Share';
import Receive from './pages/Receive';
import About from './pages/About';

export default function App() {
    return (
        <>
            <Navigation />
            <TransferOverlay />
            <main style={{ position: 'relative', zIndex: 10, paddingTop: '96px', minHeight: '100vh' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/share" element={<Share />} />
                    <Route path="/receive" element={<Receive />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </main>
        </>
    );
}
