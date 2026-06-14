import React, { useEffect, useState } from 'react';
import { Progress, List, Button, Tag, Avatar, Spin } from 'antd';
import { WarningOutlined, CheckCircleOutlined, ArrowRightOutlined, FilePdfOutlined, LoadingOutlined, ShopOutlined } from '@ant-design/icons';
import GlassCard from '../components/GlassCard';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const styles = {
    statLabel: "text-[var(--text-muted)] text-sm uppercase tracking-wider",
    statValue: "text-3xl font-bold text-[var(--text-primary)] mt-1",
};

const Dashboard = () => {
    const [recentAnalyses, setRecentAnalyses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/recent/');
                const data = await response.json();
                setRecentAnalyses(data);
            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Derived Stats
    const latest = recentAnalyses[0];
    const avgScore = recentAnalyses.length > 0
        ? Math.round(recentAnalyses.reduce((acc, curr) => acc + curr.relevance_score, 0) / recentAnalyses.length)
        : 0;

    // Critical gaps from latest analysis
    const criticalGaps = latest?.critical_gaps?.map(gap => ({ title: gap, severity: 'High' })) || [
        { title: 'Upload a syllabus to see gaps', severity: 'Info' }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#6366f1' }} spin />} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <Navbar />
            <div className="pt-24 px-8 max-w-7xl mx-auto pb-10">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-[var(--text-muted)]">Overview of your curriculum analysis</p>
                    </div>
                    <Link to="/upload">
                        <Button type="primary" size="large" icon={<ArrowRightOutlined />} className="bg-indigo-600 border-none">
                            New Analysis
                        </Button>
                    </Link>
                </header>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <GlassCard className="flex items-center justify-between">
                        <div>
                            <div className={styles.statLabel}>Avg Relevance</div>
                            <div className="text-4xl font-bold text-metallic">{avgScore}/100</div>
                        </div>
                        <Progress type="circle" percent={avgScore} size={80} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} trailColor="rgba(255,255,255,0.1)" format={() => <CheckCircleOutlined className="text-2xl text-green-500" />} />
                    </GlassCard>
                    <GlassCard>
                        <div className={styles.statLabel}>Total Analyses</div>
                        <div className={`${styles.statValue} text-blue-400`}>{recentAnalyses.length}</div>
                    </GlassCard>
                    <GlassCard>
                        <div className={styles.statLabel}>Critical Gaps (Latest)</div>
                        <div className={`${styles.statValue} text-red-400`}>{latest?.critical_gaps?.length || 0}</div>
                    </GlassCard>
                </div>

                {/* Subject Marketplace CTA Banner */}
                <GlassCard className="mb-8 p-6 flex flex-col md:flex-row items-center justify-between gap-6 border-[var(--border-secondary)] relative overflow-hidden">
                    {/* Background decorative gradient */}
                    <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-purple-500/10 blur-xl pointer-events-none" />
                    <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />

                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl shadow-inner">
                            <ShopOutlined />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[var(--text-primary)]">Need External Subject Matter Experts?</h3>
                            <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                                Discover specialized academic outsourcing companies to deliver bootcamps, workshops, and certified programs in advanced niche domains.
                            </p>
                        </div>
                    </div>
                    
                    <Link to="/marketplaces" className="w-full md:w-auto relative z-10">
                        <Button type="primary" size="large" className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 border-none text-white hover:opacity-90 font-semibold px-6 rounded-xl">
                            Explore Marketplaces
                        </Button>
                    </Link>
                </GlassCard>

                <div className="grid lg:grid-cols-3 gap-6">
                    <section className="lg:col-span-2 space-y-6">
                        <GlassCard>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <WarningOutlined className="text-red-500" /> Critical Gaps Detected (Latest)
                            </h3>
                            <List
                                itemLayout="horizontal"
                                dataSource={criticalGaps}
                                renderItem={(item) => (
                                    <List.Item className="border-b border-[var(--border-tertiary)] last:border-0 hover:bg-[var(--hover-bg)] transition-colors p-4 rounded-lg cursor-pointer">
                                        <List.Item.Meta
                                            avatar={<Avatar icon={<WarningOutlined />} className="bg-red-500/20 text-red-500" />}
                                            title={<span className="text-[var(--text-primary)] font-semibold">{item.title}</span>}
                                            description={<span className="text-[var(--text-faint)]">Impact on accreditation: {item.severity}</span>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </GlassCard>
                    </section>

                    <aside className="space-y-6">
                        <GlassCard>
                            <h3 className="text-xl font-bold mb-4">Recent Analyses</h3>
                            <List
                                dataSource={recentAnalyses}
                                renderItem={(item) => (
                                    <Link to={`/report/${item.id}`}>
                                        <List.Item className="border-b border-[var(--border-tertiary)] last:border-0 py-3 hover:bg-[var(--hover-bg)] cursor-pointer">
                                            <div className="flex items-center gap-3 w-full">
                                                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                                    <FilePdfOutlined />
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <h4 className="font-semibold text-[var(--text-primary)] truncate">{item.program_name}</h4>
                                                    <div className="text-xs text-[var(--text-faint)]">Score: {item.relevance_score}</div>
                                                </div>
                                                <Tag color={item.relevance_score > 80 ? 'green' : 'orange'}>{item.relevance_score}</Tag>
                                            </div>
                                        </List.Item>
                                    </Link>
                                )}
                            />
                            <Link to="/recent" className="block text-center mt-4 text-indigo-400 hover:text-[var(--text-primary)] text-sm">View All History</Link>
                        </GlassCard>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
