import React from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined, HistoryOutlined, ShopOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Navbar from '../components/Navbar';

const Welcome = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <Navbar />
            <div className="pt-32 px-8 max-w-4xl mx-auto text-center">
                <GlassCard className="py-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Curriculum.ai</h1>
                    <p className="text-xl text-[var(--text-muted)] mb-12 max-w-2xl mx-auto">
                        Ready to align your curriculum with industry standards? Start a new analysis or review your past reports.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <Link to="/upload">
                            <Button
                                type="primary"
                                size="large"
                                icon={<PlusCircleOutlined />}
                                className="h-16 px-8 text-xl bg-indigo-500 border-none hover:scale-105 transition-transform shadow-[0_0_20px_rgba(99,102,241,0.4)] text-white"
                            >
                                Start New Analysis
                            </Button>
                        </Link>

                        <Link to="/recent">
                            <Button
                                size="large"
                                icon={<HistoryOutlined />}
                                className="h-16 px-8 text-xl bg-transparent border-2 border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all"
                            >
                                View History
                            </Button>
                        </Link>

                        <Link to="/marketplaces">
                            <Button
                                size="large"
                                icon={<ShopOutlined />}
                                className="h-16 px-8 text-xl bg-transparent border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all"
                            >
                                Marketplace Hub
                            </Button>
                        </Link>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default Welcome;
