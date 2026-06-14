import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { RocketOutlined, DashboardOutlined, FileTextOutlined, ShopOutlined } from '@ant-design/icons';
import { useTheme } from '../context/ThemeContext';

// Sun & Moon SVG icons for theme toggle
const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

const Navbar = () => {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const isAuth = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup';

    const [tokens, setTokens] = React.useState(() => {
        const t = localStorage.getItem('audit_tokens');
        if (t === null) {
            localStorage.setItem('audit_tokens', '5');
            return 5;
        }
        return parseInt(t);
    });
    const [unlocks, setUnlocks] = React.useState(() => {
        const u = localStorage.getItem('lead_unlocks');
        if (u === null) {
            localStorage.setItem('lead_unlocks', '5');
            return 5;
        }
        return parseInt(u);
    });

    React.useEffect(() => {
        const updateBalances = () => {
            setTokens(parseInt(localStorage.getItem('audit_tokens') || '5'));
            setUnlocks(parseInt(localStorage.getItem('lead_unlocks') || '5'));
        };
        window.addEventListener('balance-update', updateBalances);
        window.addEventListener('storage', updateBalances);
        return () => {
            window.removeEventListener('balance-update', updateBalances);
            window.removeEventListener('storage', updateBalances);
        };
    }, []);

    return (
        <nav className="fixed top-4 left-4 right-4 z-50">
            <div className="glass-panel px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
                <Link to="/" className="flex items-center gap-2 group">
                    <RocketOutlined className="text-2xl text-indigo-500 logo-glow" />
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 group-hover:text-shadow transition-all">
                        Curriculum.ai
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    {isAuth ? (
                        <>
                            <Link to="/pricing" className="bg-indigo-500/10 border border-indigo-500/25 px-2.5 py-1 rounded-lg text-indigo-400 font-semibold text-xs flex items-center gap-1 hover:bg-indigo-500/20 transition-all mr-2">
                                🪙 {tokens} Audits
                            </Link>
                            <Link to="/pricing" className="bg-purple-500/10 border border-purple-500/25 px-2.5 py-1 rounded-lg text-purple-400 font-semibold text-xs flex items-center gap-1 hover:bg-purple-500/20 transition-all mr-4">
                                🔑 {unlocks} Unlocks
                            </Link>
                            <Link to="/dashboard" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2">
                                <DashboardOutlined /> Dashboard
                            </Link>
                            <Link to="/upload" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2">
                                <FileTextOutlined /> Upload
                            </Link>
                            <Link to="/marketplaces" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2">
                                <ShopOutlined /> Marketplace
                            </Link>
                            <Link to="/recent" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2">
                                History
                            </Link>
                            <button
                                onClick={toggleTheme}
                                className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)] transition-all duration-300"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                            </button>
                            <Button type="primary" danger ghost href="/">Logout</Button>
                        </>
                    ) : (
                        <>

                            <a href="#features" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                            }}>Features</a>
                            <Link to="/pricing" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Pricing</Link>
                            <Link to="/support" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Support</Link>
                            <button
                                onClick={toggleTheme}
                                className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)] transition-all duration-300"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                            </button>
                            <Link to="/login">
                                <Button type="primary" className="bg-gradient-to-r from-indigo-600 to-purple-600 border-none hover:opacity-90">
                                    Get Started
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
