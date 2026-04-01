import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button, Input, List, Avatar, Spin } from 'antd';
import { MessageOutlined, SendOutlined, CloseOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Smiling Robot Icon
const SmilingRobotIcon = ({ className, style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        style={style}
        width="1em"
        height="1em"
    >
        {/* Antenna */}
        <circle cx="12" cy="7" r="1.5" />
        <rect x="11" y="8" width="2" height="4" />
        {/* Head */}
        <path d="M4 12C4 9.79086 5.79086 8 8 8H16C18.2091 8 20 9.79086 20 12V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V12Z" />
        {/* Eyes */}
        <circle cx="9" cy="15" r="1.5" fill="#000" />
        <circle cx="15" cy="15" r="1.5" fill="#000" />
        {/* Smile */}
        <path d="M9.5 18.5C10.5 19.5 13.5 19.5 14.5 18.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
);

const ChatBot = ({ analysisId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hi! I can help you understand this curriculum analysis better. Ask me anything!' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsg = inputValue;
        setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
        setInputValue('');
        setLoading(true);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/report/${analysisId}/chat/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMsg,
                    history: messages
                }),
            });
            const data = await response.json();
            setMessages(prev => [...prev, { type: 'bot', text: data.response }]);
        } catch (error) {
            setMessages(prev => [...prev, { type: 'bot', text: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-24 right-8 w-130 h-[650px] bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-[var(--border-secondary)] bg-[var(--glass-bg)] flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Avatar icon={<SmilingRobotIcon />} className="bg-indigo-600 flex items-center justify-center p-1" />
                                <span className="font-bold text-[var(--text-primary)]">Curriculum AI Assistant</span>
                            </div>
                            <Button type="text" icon={<CloseOutlined />} onClick={() => setIsOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]" />
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--bg-primary)]">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl ${msg.type === 'user'
                                        ? 'bg-indigo-600 text-white rounded-tr-none'
                                        : 'bg-[var(--glass-bg)] text-[var(--text-secondary)] rounded-tl-none border border-[var(--border-secondary)]'
                                        }`}>
                                        <ReactMarkdown
                                            components={{
                                                ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 text-[var(--text-primary)]" {...props} />,
                                                ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 text-[var(--text-primary)]" {...props} />,
                                                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                strong: ({ node, ...props }) => <strong className="font-bold text-[var(--text-primary)]" {...props} />,
                                            }}
                                        >
                                            {msg.text}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-[var(--glass-bg)] p-3 rounded-2xl rounded-tl-none border border-[var(--border-secondary)]">
                                        <Spin size="small" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-[var(--border-secondary)] bg-[var(--glass-bg)]">
                            <div className="flex gap-2">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onPressEnter={handleSend}
                                    placeholder="Ask about gaps, resources..."
                                    className="bg-[var(--bg-primary)] border-[var(--border-secondary)] text-[var(--text-primary)] rounded-full hover:border-indigo-500 focus:border-indigo-500"
                                />
                                <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<SendOutlined />}
                                    onClick={handleSend}
                                    loading={loading}
                                    className="bg-indigo-600 border-none"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 rounded-full shadow-lg flex items-center justify-center z-50 text-white text-2xl hover:bg-indigo-500 transition-colors"
                style={{ boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' }}
            >
                {isOpen ? <CloseOutlined /> : <SmilingRobotIcon className="text-3xl" />}
            </motion.button>
        </>
    );
};

export default ChatBot;
