import React from 'react';
import { Button, Collapse } from 'antd';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RocketOutlined, ThunderboltOutlined, TeamOutlined, SafetyCertificateOutlined, RiseOutlined, RobotOutlined, CheckCircleOutlined } from '@ant-design/icons';
import GlassCard from '../components/GlassCard';
import TypewriterHeading from '../components/TypewriterHeading';
import Navbar from '../components/Navbar';

const features = [
    { icon: <RobotOutlined />, title: 'AI-Powered Analysis', desc: 'Deep learning models analyze curriculum relevance in real-time.' },
    { icon: <ThunderboltOutlined />, title: 'Instant Feedback', desc: 'Get actionable insights within seconds of uploading.' },
    { icon: <RiseOutlined />, title: 'Industry Alignment', desc: 'Compare against real-time job market trends and skills.' },
    { icon: <TeamOutlined />, title: 'Collaborative Tools', desc: 'Share reports with faculty and stakeholders easily.' },
    { icon: <SafetyCertificateOutlined />, title: 'Accreditation Ready', desc: 'Generate reports that support accreditation standards.' },
    { icon: <RocketOutlined />, title: 'Future-Proofing', desc: 'Predictive analytics for emerging skill requirements.' },
];



import { Link } from 'react-router-dom';

const Landing = () => {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden relative">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col justify-center items-center px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--gradient-hero-from)] via-transparent to-[var(--gradient-hero-to)] blur-3xl" />

                <div className="z-10 max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, type: 'spring' }}
                        className="flex-1 text-center md:text-left"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-metallic tracking-tight">
                            Align Your Curriculum with the <br /> Future of Work
                        </h1>
                        <p className="text-xl md:text-2xl text-[var(--text-muted)] mb-8 max-w-2xl">
                            Transform educational programs with AI-driven insights bridging the gap between academia and industry.
                        </p>
                        <div className="flex gap-4 justify-center md:justify-start">
                            <Link to="/login">
                                <Button type="primary" size="large" className="bg-indigo-600 border-none h-12 px-8 text-lg hover:scale-105 transition-transform">
                                    Start Analysis
                                </Button>
                            </Link>
                            <Link to="/about">
                                <Button size="large" className="h-12 px-8 text-lg bg-transparent border-2 border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right: Floating Glowing Book */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, type: 'spring', delay: 0.3 }}
                        className="flex-1 flex justify-center items-center"
                    >
                        <div className="hero-book-container">
                            <div className="hero-book-glow" />
                            <svg viewBox="0 0 280 320" className="hero-book-svg" xmlns="http://www.w3.org/2000/svg">
                                {/* Book body */}
                                <defs>
                                    <linearGradient id="bookCover" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#4338ca" />
                                        <stop offset="50%" stopColor="#6366f1" />
                                        <stop offset="100%" stopColor="#7c3aed" />
                                    </linearGradient>
                                    <linearGradient id="pageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#e8e5ff" />
                                        <stop offset="100%" stopColor="#f8f7ff" />
                                    </linearGradient>
                                    <filter id="bookGlow">
                                        <feGaussianBlur stdDeviation="4" result="glow" />
                                        <feMerge>
                                            <feMergeNode in="glow" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                    <filter id="softShadow">
                                        <feDropShadow dx="4" dy="8" stdDeviation="8" floodColor="#1e1b4b" floodOpacity="0.5" />
                                    </filter>
                                </defs>

                                {/* Book spine shadow */}
                                <rect x="58" y="55" width="180" height="230" rx="4" fill="#1e1b4b" opacity="0.3" filter="url(#softShadow)" />

                                {/* Back cover */}
                                <rect x="50" y="45" width="180" height="230" rx="6" fill="url(#bookCover)" opacity="0.7" />

                                {/* Pages */}
                                <rect x="56" y="52" width="165" height="216" rx="3" fill="url(#pageGrad)" opacity="0.9" />
                                <line x1="58" y1="75" x2="210" y2="75" stroke="#c7d2fe" strokeWidth="0.5" opacity="0.5" />
                                <line x1="58" y1="95" x2="210" y2="95" stroke="#c7d2fe" strokeWidth="0.5" opacity="0.5" />
                                <line x1="58" y1="115" x2="180" y2="115" stroke="#c7d2fe" strokeWidth="0.5" opacity="0.4" />
                                <line x1="58" y1="175" x2="210" y2="175" stroke="#c7d2fe" strokeWidth="0.5" opacity="0.5" />
                                <line x1="58" y1="195" x2="200" y2="195" stroke="#c7d2fe" strokeWidth="0.5" opacity="0.5" />
                                <line x1="58" y1="215" x2="190" y2="215" stroke="#c7d2fe" strokeWidth="0.5" opacity="0.4" />
                                <line x1="58" y1="235" x2="210" y2="235" stroke="#c7d2fe" strokeWidth="0.5" opacity="0.3" />

                                {/* Front cover */}
                                <rect x="44" y="40" width="180" height="230" rx="6" fill="url(#bookCover)" stroke="#818cf8" strokeWidth="1.5" />

                                {/* Cover decorative border */}
                                <rect x="56" y="52" width="156" height="206" rx="3" fill="none" stroke="#a5b4fc" strokeWidth="0.8" opacity="0.5" />

                                {/* AI Robot Head - minimalistic */}
                                <g filter="url(#bookGlow)" transform="translate(134, 120)">
                                    {/* Head */}
                                    <rect x="-26" y="-20" width="52" height="44" rx="10" fill="none" stroke="#e0e7ff" strokeWidth="2.5" />
                                    {/* Eyes */}
                                    <circle cx="-10" cy="-2" r="4" fill="#a5b4fc">
                                        <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="10" cy="-2" r="4" fill="#a5b4fc">
                                        <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
                                    </circle>
                                    {/* Antenna */}
                                    <line x1="0" y1="-20" x2="0" y2="-32" stroke="#e0e7ff" strokeWidth="2" strokeLinecap="round" />
                                    <circle cx="0" cy="-35" r="4" fill="#818cf8">
                                        <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                    {/* Mouth */}
                                    <line x1="-8" y1="12" x2="8" y2="12" stroke="#c7d2fe" strokeWidth="2" strokeLinecap="round" />
                                </g>

                                {/* Shine / light ray */}
                                <line x1="224" y1="40" x2="250" y2="20" stroke="#a5b4fc" strokeWidth="1.5" opacity="0.6" strokeLinecap="round">
                                    <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.5s" repeatCount="indefinite" />
                                </line>
                                <line x1="224" y1="55" x2="255" y2="50" stroke="#818cf8" strokeWidth="1" opacity="0.4" strokeLinecap="round">
                                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
                                </line>
                                <line x1="224" y1="70" x2="248" y2="78" stroke="#a5b4fc" strokeWidth="1.5" opacity="0.5" strokeLinecap="round">
                                    <animate attributeName="opacity" values="0.5;0.15;0.5" dur="2s" repeatCount="indefinite" />
                                </line>

                                {/* Floating particles */}
                                <circle cx="40" cy="30" r="2" fill="#818cf8" opacity="0.6">
                                    <animate attributeName="cy" values="30;20;30" dur="4s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.6;0.2;0.6" dur="4s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="230" cy="250" r="1.5" fill="#a5b4fc" opacity="0.5">
                                    <animate attributeName="cy" values="250;240;250" dur="3.5s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.5;0.15;0.5" dur="3.5s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="250" cy="150" r="2" fill="#c084fc" opacity="0.4">
                                    <animate attributeName="cy" values="150;138;150" dur="5s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="5s" repeatCount="indefinite" />
                                </circle>
                            </svg>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    style={{ scale }}
                    className="absolute -bottom-20 w-full h-1/2 bg-gradient-to-t from-indigo-900/30 to-transparent blur-3xl -z-10"
                />
            </section>

            {/* Problem / Vision Typewriter */}
            <section className="py-20 px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
                <GlassCard hoverEffect className="h-full">
                    <h3 className="text-indigo-400 uppercase tracking-widest text-sm mb-2">The Problem</h3>
                    <h2 className="text-3xl font-bold mb-4">Academia is lagging behind.</h2>
                    <p className="text-[var(--text-secondary)] transform translate-x-4 opacity-0 animate-reveal" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                        Traditional curriculum updates take years. The job market changes in weeks. This disconnect leaves graduates unprepared and institutions struggling to demonstrate relevance.
                    </p>
                </GlassCard>
                <GlassCard hoverEffect className="h-full">
                    <h3 className="text-indigo-400 uppercase tracking-widest text-sm">Our Vision</h3>

                    <h2 className="text-4xl font-bold mb-4">Real-time Curriculum Analysis</h2>
                    <p className="text-[var(--text-secondary)] transform translate-x-4 opacity-0 animate-reveal" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                        We empower educators with the data needed to make swift, evidence-based decisions that benefit students and employers alike.
                    </p>
                </GlassCard>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-20 px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Why Curriculum.ai?</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <GlassCard key={idx} hoverEffect style={{ '--order': idx }} className="animate-reveal opacity-0"
                        >
                            <div className="text-4xl text-indigo-400 mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-[var(--text-muted)]">{feature.desc}</p>
                        </GlassCard>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)]">
                <div className="max-w-7xl mx-auto px-8">
                    <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
                    <div className="grid md:grid-cols-4 gap-4 relative">
                        {[
                            { step: '01', title: 'Upload', desc: 'Upload course documents (PDF, Docx).' },
                            { step: '02', title: 'Analyze', desc: 'AI maps content to industry skills.' },
                            { step: '03', title: 'Identify', desc: 'Visual gap analysis & redundancy checks.' },
                            { step: '04', title: 'Improve', desc: 'Get actionable recommendations.' }
                        ].map((item, i) => (
                            <div key={i} className="relative z-10 text-center group">
                                <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:border-indigo-500 group-hover:text-indigo-400 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-[var(--text-faint)]">{item.desc}</p>
                            </div>
                        ))}
                        {/* Connecting Line */}
                        <div className="absolute top-8 left-0 w-full h-0.5 bg-[var(--border-tertiary)] -z-0 hidden md:block" />
                    </div>
                </div>
            </section>

            {/* What You Get Stats */}
            <section className="py-20 px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { value: '40%', label: 'Increase in Employability' },
                        { value: '250+', label: 'Universities Onboarded' },
                        { value: '1M+', label: 'Skills Analyzed' }
                    ].map((stat, i) => (
                        <GlassCard key={i} className="text-center border-indigo-500/20">
                            <div className="text-5xl font-bold text-metallic mb-2">{stat.value}</div>
                            <div className="text-[var(--text-muted)] uppercase tracking-wider text-sm">{stat.label}</div>
                        </GlassCard>
                    ))}
                </div>
            </section>

            {/* Learn Smarter Bar */}
            <section className="py-12 bg-indigo-900/20 border-y border-indigo-500/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
                    <div>
                        <h3 className="text-2xl font-bold mb-1">Ready to modernize your curriculum?</h3>
                        <p className="text-[var(--text-secondary)]">Join leading institutions in the future of education.</p>
                    </div>
                    <Button type="primary" size="large" className="bg-indigo-600 border-none h-12 px-8" href="/signup">
                        Get Started Free
                    </Button>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-8 max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    <Collapse accordion ghost
                        expandIconPosition="end"
                        items={[
                            { key: '1', label: <span className="text-[var(--text-primary)] font-semibold text-lg">How secure is my data?</span>, children: <p className="text-[var(--text-muted)]">Your specific curriculum data is encrypted and never shared. We use aggregated data only for industry benchmarking.</p> },
                            { key: '2', label: <span className="text-[var(--text-primary)] font-semibold text-lg">What file formats are supported?</span>, children: <p className="text-[var(--text-muted)]">We currently support PDF, DOCX, and TXT files. We are working on LMS integration.</p> },
                            { key: '3', label: <span className="text-[var(--text-primary)] font-semibold text-lg">Is it compatible with ABET/accreditation?</span>, children: <p className="text-[var(--text-muted)]">Yes! our reports are designed to directly map to accreditation outcome criteria.</p> },
                        ]}
                    />
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-8 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
                        <p className="text-[var(--text-muted)] mb-8 max-w-md">
                            Have questions? Need a custom enterprise plan for your university system? Reach out to our team.
                        </p>
                        <ul className="space-y-4 text-[var(--text-secondary)]">
                            <li className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400"><TeamOutlined /></div>
                                contact@curriculum.ai
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400"><RocketOutlined /></div>
                                Hitech City, HYD
                            </li>
                        </ul>
                    </div>
                    <div className="h-64 rounded-2xl overflow-hidden border border-[var(--glass-border)] shadow-lg relative group">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15224.99757608823!2d78.37250672462615!3d17.447754641470438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69df%3A0x19688ebb5a518675!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana%2C%20India!5e0!3m2!1sen!2sin!4v1707920000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="opacity-80 group-hover:opacity-100 transition-opacity duration-300 w-full h-full"
                            title="Hitech City Map"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-[var(--border-tertiary)] mt-20 text-center text-[var(--text-faint)] text-sm">
                <div className="mb-2">Built by <span className="text-indigo-400 font-bold">CodeVengers</span></div>
                <div className="flex justify-center gap-6 mb-4">
                    <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Privacy</a>
                    <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Terms</a>
                    <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Contact</a>
                </div>
                <p>&copy; 2026 Curriculum.ai. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Landing;
