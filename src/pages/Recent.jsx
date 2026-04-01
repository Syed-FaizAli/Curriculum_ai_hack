import React, { useEffect, useState } from 'react';
import { List, Tag, Spin, message, Popconfirm } from 'antd';
import { FilePdfOutlined, CalendarOutlined, RightOutlined, LoadingOutlined, DeleteOutlined } from '@ant-design/icons';
import GlassCard from '../components/GlassCard';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Recent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/recent/');
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Failed to fetch history", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();  // Prevent navigation from Link
        e.stopPropagation(); // Stop event bubbling
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/report/${id}/delete/`, {
                method: 'DELETE',
            });
            if (response.ok) {
                message.success('Analysis deleted');
                setData(prev => prev.filter(item => item.id !== id));
            } else {
                message.error('Failed to delete');
            }
        } catch (error) {
            console.error("Delete failed", error);
            message.error('Failed to delete analysis');
        }
    };

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
            <div className="pt-24 px-8 max-w-5xl mx-auto pb-10">
                <h1 className="text-3xl font-bold mb-8">Analysis History</h1>

                <GlassCard>
                    {data.length === 0 ? (
                        <div className="text-center py-12 text-[var(--text-muted)]">
                            <FilePdfOutlined className="text-4xl mb-4 block" />
                            <p className="text-lg">No analyses yet. Start by uploading a curriculum!</p>
                        </div>
                    ) : (
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item) => (
                                <Link to={`/report/${item.id}`}>
                                    <List.Item className="group border-b border-[var(--border-tertiary)] hover:bg-[var(--hover-bg)] transition-all p-4 cursor-pointer rounded-lg">
                                        <List.Item.Meta
                                            avatar={
                                                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-xl group-hover:scale-110 transition-transform">
                                                    <FilePdfOutlined />
                                                </div>
                                            }
                                            title={<span className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-indigo-400 transition-colors">{item.program_name}</span>}
                                            description={
                                                <div className="flex gap-4 text-[var(--text-faint)] text-sm mt-1">
                                                    <span><CalendarOutlined /> {new Date(item.created_at).toLocaleDateString()}</span>
                                                    <span className={item.relevance_score > 80 ? 'text-green-400' : item.relevance_score > 60 ? 'text-orange-400' : 'text-red-400'}>Score: {item.relevance_score}/100</span>
                                                </div>
                                            }
                                        />
                                        <div className="flex items-center gap-4">
                                            <Tag color={item.relevance_score > 80 ? 'green' : item.relevance_score > 60 ? 'orange' : 'red'}>
                                                {item.relevance_score > 80 ? 'Good' : 'Needs Review'}
                                            </Tag>
                                            <Popconfirm
                                                title="Delete this analysis?"
                                                description="This action cannot be undone."
                                                onConfirm={(e) => handleDelete(e, item.id)}
                                                onCancel={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                                okText="Delete"
                                                cancelText="Cancel"
                                                okButtonProps={{ danger: true }}
                                            >
                                                <button
                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-faint)] hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                                                    title="Delete analysis"
                                                >
                                                    <DeleteOutlined />
                                                </button>
                                            </Popconfirm>
                                            <RightOutlined className="text-[var(--text-faint)] group-hover:text-[var(--text-primary)] transition-colors" />
                                        </div>
                                    </List.Item>
                                </Link>
                            )}
                        />
                    )}
                </GlassCard>
            </div>
        </div>
    );
};

export default Recent;
