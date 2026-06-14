import React from 'react';
import { GithubOutlined, LinkedinOutlined, UserOutlined } from '@ant-design/icons';
import GlassCard from '../components/GlassCard';
import Navbar from '../components/Navbar';
import { Button } from 'antd';
import { motion } from 'framer-motion';

const About = () => {
    const teamMembers = [
        {
            name: "Shaik Aathif",
            role: "CSE-AIML Student",

            image: "/aathif.png",
        },
        {
            name: "Syed Zuhair",
            role: "CSE-AIML Student",

            image: "/zuhair.png",
        },
        {
            name: "Syed Faiz Ali",
            role: "CSE-AIML Student",

            image: "/faiz.png",
        },
        {
            name: "Syed Saad",
            role: "CSE (AI & ML) Student",

            image: "/saad .png",
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <Navbar />

            <div className="pt-24 px-8 max-w-7xl mx-auto pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
                        Meet the CodeAbyss
                    </h1>
                    <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
                        Passionate developers building the future of education with AI.
                    </p>
                </motion.div>

                {/* Team Section */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <GlassCard className="h-full flex flex-col items-center text-center p-8 hover:scale-105 transition-transform duration-300">
                                <div className="w-45 h-45 rounded-full bg-indigo-500/20 mb-6 flex items-center justify-center border-2 border-indigo-500/30 overflow-hidden">
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <UserOutlined className="text-5xl text-indigo-400" />
                                    )}
                                </div>
                                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{member.name}</h3>
                                <p className="text-indigo-400 font-semibold mb-6">{member.role}</p>
                                <div className="flex gap-4">
                                    <Button type="text" shape="circle" icon={<GithubOutlined className="text-lg" />} className="text-[var(--text-secondary)] hover:text-indigo-400 hover:bg-[var(--hover-bg)] transition-all" />
                                    <Button type="text" shape="circle" icon={<LinkedinOutlined className="text-lg" />} className="text-[var(--text-secondary)] hover:text-indigo-400 hover:bg-[var(--hover-bg)] transition-all" />
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* Project Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <GlassCard className="p-10 md:p-14">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">About the Project</h2>
                                <h3 className="text-xl text-indigo-400 font-semibold mb-4">Curriculum.ai - Bridging the Gap</h3>
                                <div className="space-y-4 text-[var(--text-muted)] leading-relaxed">
                                    <p>
                                        In a rapidly evolving job market, educational curricula often struggle to keep pace with industry demands.
                                        Students graduate with theoretical knowledge but lack the practical skills required by modern employers.
                                    </p>
                                    <p>
                                        <strong className="text-[var(--text-primary)]">Curriculum.ai</strong> is an intelligent platform designed to solve this problem.
                                        By leveraging advanced AI to analyze syllabus documents against real-time market trends, we identify critical gaps
                                        and provide actionable recommendations for improvement.
                                    </p>
                                    <p>
                                        Our mission is to empower educators and institutions to create dynamic, industry-relevant curricula that
                                        prepare students for success in their careers.
                                    </p>
                                </div>
                            </div>
                            <div className="relative h-64 md:h-full min-h-[300px] rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-[var(--glass-border)] flex items-center justify-center group">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-500"></div>
                                <div className="relative text-center p-6">
                                    <span className="text-6xl font-bold text-white/20 select-none">AI + EDU</span>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
