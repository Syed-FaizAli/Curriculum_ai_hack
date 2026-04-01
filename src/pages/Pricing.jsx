import React from 'react';
import { Button, Tag } from 'antd';
import { CheckCircleOutlined, SketchOutlined, ThunderboltOutlined, RocketOutlined } from '@ant-design/icons';
import Navbar from '../components/Navbar';
import GlassCard from '../components/GlassCard';

const Pricing = () => {
    const plans = [
        {
            title: 'Free Trial',
            price: '₹0',
            duration: '15 Days',
            features: [
                '5 Curriculum Upload',
                'Basic Relevance Score',
                'Summary Report',
                'Email Support',
            ],
            cta: 'Start Free Trial',
            icon: <RocketOutlined className="text-3xl text-indigo-400" />,
            popular: false
        },
        {
            title: 'Standard',
            price: '₹4,999',
            duration: 'per month',
            features: [
                'Unlimited Uploads',
                'Detailed Gap Analysis',
                'PDF Export',
                'Market Trends Integration',
                'Priority Email Support',
            ],
            cta: 'Subscribe Now',
            icon: <ThunderboltOutlined className="text-3xl text-purple-400" />,
            popular: true
        },
        {
            title: 'Premium',
            price: '₹9,999',
            duration: 'per month',
            features: [
                'All Standard Features',
                'AI Chat Bot Assistant',
                'Predictive Analytics',
                'Faculty Dashboard Access',
                '24/7 Priority Support',
                'Custom API Access'
            ],
            cta: 'Go Premium',
            icon: <SketchOutlined className="text-3xl text-yellow-400" />,
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <Navbar />

            <div className="pt-32 pb-20 px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        Upgrade Your Plan
                    </h1>
                    <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
                        Choose the plan that fits your institution's needs. No hidden fees.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan, index) => (
                        <GlassCard
                            key={index}
                            className={`relative h-full transition-all duration-300 hover:scale-105 ${plan.popular ? 'border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.2)]' : ''}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                                    <Tag color="#6366f1" className="px-3 py-1 text-sm font-bold border-none">MOST POPULAR</Tag>
                                </div>
                            )}

                            <div className="mb-6">
                                <div className="mb-4 inline-block p-3 rounded-full bg-[var(--bg-input)] border border-[var(--glass-border)]">
                                    {plan.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-[var(--text-primary)]">{plan.price}</span>
                                    <span className="text-[var(--text-muted)] text-sm">{plan.duration && `/${plan.duration}`}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-[var(--text-secondary)]">
                                        <CheckCircleOutlined className="text-green-400 mt-1 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                type={plan.popular ? 'primary' : 'default'}
                                size="large"
                                className={`w-full h-12 text-lg ${plan.popular ? 'bg-indigo-600 border-none hover:bg-indigo-500' : 'bg-transparent border-[var(--border-secondary)] text-[var(--text-primary)] hover:border-indigo-400 hover:text-indigo-400'}`}
                            >
                                {plan.cta}
                            </Button>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pricing;
