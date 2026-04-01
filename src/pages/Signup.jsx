import React from 'react';
import { Form, Input, Button, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Navbar from '../components/Navbar';

const Signup = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        window.location.href = '/welcome';
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[var(--bg-primary)]">
            <div className="absolute inset-0 bg-gradient-to-tl from-[var(--gradient-hero-to)] via-transparent to-[var(--gradient-hero-from)] blur-3xl" />
            <Navbar />

            <GlassCard className="w-full max-w-md z-10" hoverEffect={false}>
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Create Account</h2>
                    <p className="text-[var(--text-muted)]">Join thousands of educators innovating today.</p>
                </div>

                <Form
                    name="register"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input your Name!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon text-[var(--text-muted)]" />} placeholder="Full Name" className="bg-[var(--bg-input)] border-[var(--border-secondary)] text-[var(--text-primary)] placeholder-[var(--text-faint)]" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon text-[var(--text-muted)]" />} placeholder="Email" className="bg-[var(--bg-input)] border-[var(--border-secondary)] text-[var(--text-primary)] placeholder-[var(--text-faint)]" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon text-[var(--text-muted)]" />}
                            type="password"
                            placeholder="Password"
                            className="bg-[var(--bg-input)] border-[var(--border-secondary)] text-[var(--text-primary)] placeholder-[var(--text-faint)]"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full bg-indigo-600 border-none h-12 hover:bg-indigo-500 font-semibold tracking-wide">
                            Get Started
                        </Button>
                    </Form.Item>
                </Form>

                <div className="text-center mt-6 text-[var(--text-muted)]">
                    Already have an account? <Link to="/login" className="text-indigo-400 hover:text-indigo-300 ml-1">Log in</Link>
                </div>
            </GlassCard>
        </div>
    );
};

export default Signup;
