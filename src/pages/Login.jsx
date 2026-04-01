import React from 'react';
import { Form, Input, Button, Checkbox, Divider } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Navbar from '../components/Navbar';

const Login = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        // Simulate login
        window.location.href = '/welcome';
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[var(--bg-primary)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--gradient-hero-from)] via-transparent to-pink-900/10 blur-3xl" />
            <Navbar />

            <GlassCard className="w-full max-w-md z-10" hoverEffect={false}>
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Welcome Back</h2>
                    <p className="text-[var(--text-muted)]">Sign in to continue your analysis</p>
                </div>

                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon text-[var(--text-muted)]" />} placeholder="Email" className="bg-[var(--bg-input)] border-[var(--border-secondary)] text-[var(--text-primary)] placeholder-[var(--text-faint)] hover:border-indigo-500 focus:border-indigo-500" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon text-[var(--text-muted)]" />}
                            type="password"
                            placeholder="Password"
                            className="bg-[var(--bg-input)] border-[var(--border-secondary)] text-[var(--text-primary)] placeholder-[var(--text-faint)] hover:border-indigo-500 focus:border-indigo-500"
                        />
                    </Form.Item>
                    <Form.Item>
                        <div className="flex justify-between items-center text-sm">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox><span className="text-[var(--text-muted)]">Remember me</span></Checkbox>
                            </Form.Item>
                            <a className="login-form-forgot text-indigo-400 hover:text-indigo-300" href="">
                                Forgot password
                            </a>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full bg-indigo-600 border-none h-12 hover:bg-indigo-500 font-semibold tracking-wide">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>

                <Divider className="border-[var(--border-secondary)] my-6"><span className="text-[var(--text-muted)]">Or continue with</span></Divider>

                <div className="grid grid-cols-2 gap-4">
                    <Button icon={<GoogleOutlined />} className="h-10 bg-transparent border-2 border-[var(--text-muted)] text-[var(--text-primary)] hover:border-indigo-400 hover:text-indigo-400 transition-all">
                        Google
                    </Button>
                    <Button icon={<GithubOutlined />} className="h-10 bg-transparent border-2 border-[var(--text-muted)] text-[var(--text-primary)] hover:border-indigo-400 hover:text-indigo-400 transition-all">
                        GitHub
                    </Button>
                </div>

                <div className="text-center mt-6 text-[var(--text-muted)]">
                    Don't have an account? <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 ml-1">Sign up now</Link>
                </div>
            </GlassCard>
        </div>
    );
};

export default Login;
