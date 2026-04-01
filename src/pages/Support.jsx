import React from 'react';
import { Collapse, Button } from 'antd';
import { MailOutlined, PhoneOutlined, QuestionCircleOutlined, MessageOutlined } from '@ant-design/icons';
import Navbar from '../components/Navbar';
import GlassCard from '../components/GlassCard';

const Support = () => {
    const faqItems = [
        {
            key: '1',
            label: <span className="text-[var(--text-primary)] font-semibold text-lg">How do I upload my curriculum?</span>,
            children: <p className="text-[var(--text-muted)]">Navigate to the 'Upload' page from your dashboard. You can drag and drop your PDF or DOCX syllabus files directly into the upload area.</p>,
        },
        {
            key: '2',
            label: <span className="text-[var(--text-primary)] font-semibold text-lg">What file formats are supported?</span>,
            children: <p className="text-[var(--text-muted)]">We currently support PDF, DOCX, and TXT files. We are actively working on direct LMS integrations (Canvas, Blackboard) for future updates.</p>,
        },
        {
            key: '3',
            label: <span className="text-[var(--text-primary)] font-semibold text-lg">How is the relevance score calculated?</span>,
            children: <p className="text-[var(--text-muted)]">Our AI engine compares your curriculum content against millions of real-time job descriptions, industry reports, and skills databases to calculate a relevance score out of 100.</p>,
        },
        {
            key: '4',
            label: <span className="text-[var(--text-primary)] font-semibold text-lg">Can I share the analysis reports?</span>,
            children: <p className="text-[var(--text-muted)]">Yes! You can export reports as PDFs or share a secure, read-only link with accreditation bodies, faculty members, or advisory boards directly from the dashboard.</p>,
        },
        {
            key: '5',
            label: <span className="text-[var(--text-primary)] font-semibold text-lg">Is my data secure?</span>,
            children: <p className="text-[var(--text-muted)]">Absolutely. We use enterprise-grade encryption for all data storage and transmission. Your proprietary curriculum files are never shared with third parties or used to train public models without your explicit consent.</p>,
        },
        {
            key: '6',
            label: <span className="text-[var(--text-primary)] font-semibold text-lg">I found a bug, how do I report it?</span>,
            children: <p className="text-[var(--text-muted)]">Please send an email to support@curriculum.ai with a screenshot and description of the issue. Our technical team usually responds within 24 hours.</p>,
        },
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <Navbar />

            <div className="pt-32 pb-20 px-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        Support Center
                    </h1>
                    <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
                        We're here to help you revolutionize your curriculum.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Contact Options - Left Column */}
                    <div className="md:col-span-1 space-y-6">
                        <GlassCard className="h-full">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <MessageOutlined className="text-indigo-400" /> Get in Touch
                            </h2>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Email Support</h3>
                                    <a href="mailto:support@curriculum.ai" className="flex items-center gap-3 text-lg hover:text-indigo-400 transition-colors group">
                                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                                            <MailOutlined />
                                        </div>
                                        support@curriculum.ai
                                    </a>
                                </div>

                                <div>
                                    <h3 className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Phone Support</h3>
                                    <a href="tel:+15551234567" className="flex items-center gap-3 text-lg hover:text-indigo-400 transition-colors group">
                                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                                            <PhoneOutlined />
                                        </div>
                                        +1 (555) 123-4567
                                    </a>
                                </div>

                                <div className="pt-6 border-t border-[var(--border-secondary)]">
                                    <p className="text-[var(--text-muted)] italic text-sm">
                                        Note: Phone support is available Mon-Fri, 9am - 5pm EST.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* FAQs - Right Column */}
                    <div className="md:col-span-2">
                        <GlassCard className="h-full">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <QuestionCircleOutlined className="text-indigo-400" /> Frequently Asked Questions
                            </h2>
                            <Collapse
                                accordion
                                ghost
                                items={faqItems}
                                expandIconPosition="end"
                                className="custom-collapse"
                            />
                        </GlassCard>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <p className="text-[var(--text-muted)] mb-6">Can't find what you're looking for?</p>
                    <Button type="primary" size="large" className="bg-indigo-600 border-none px-8 h-12 text-lg">
                        Submit a Ticket
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Support;
