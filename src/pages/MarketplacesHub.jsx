import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Badge } from 'antd';
import { ShopOutlined, TeamOutlined, CheckOutlined, RightOutlined } from '@ant-design/icons';
import GlassCard from '../components/GlassCard';
import Navbar from '../components/Navbar';

const MarketplacesHub = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-hidden">
      {/* Background decorative glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      <Navbar />

      <div className="pt-28 px-4 md:px-8 max-w-7xl mx-auto pb-16 relative z-10">
        
        {/* Header Section */}
        <header className="mb-16 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge 
              count="Curriculum.ai B2B Network" 
              style={{ backgroundColor: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.4)' }}
              className="mb-4 text-xs font-semibold"
            />
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Marketplace Hub
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
              Discover specialized academic and industry service providers for curriculum delivery, guest lectures, workshops, events, placement readiness, and institutional partnerships.
            </p>
          </motion.div>
        </header>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Card 1: Subject Outsourcing Marketplace */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex"
          >
            <GlassCard className="w-full flex flex-col justify-between hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(99,102,241,0.15)] transition-all duration-300 relative group overflow-hidden border-[var(--border-primary)] p-8">
              {/* Corner Gradient Glow */}
              <div className="absolute -right-32 -top-32 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl group-hover:bg-indigo-500/20 transition-all duration-500 pointer-events-none" />
              
              <div>
                {/* Header info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <ShopOutlined />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] group-hover:text-indigo-400 transition-colors">
                      Subject Outsourcing
                    </h2>
                    <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Institutional Partners</span>
                  </div>
                </div>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6 text-sm">
                  Connect with organizations and educational service providers that can deliver complete subjects, certification programs, curriculum modules, faculty support, semester-long training, and specialized academic instruction.
                </p>

                {/* Bullets */}
                <ul className="space-y-3 mb-8">
                  {[
                    "Complete subject delivery",
                    "Certification programs",
                    "Faculty augmentation",
                    "Industry curriculum partnerships",
                    "Semester-long training programs",
                    "Specialized technical courses"
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]">
                      <CheckOutlined className="text-green-500 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom stats & Action */}
              <div className="border-t border-[var(--border-tertiary)] pt-6 mt-auto">
                <div className="flex justify-between items-center gap-4 flex-wrap">
                  {/* Dummy Stats */}
                  <div className="flex gap-6">
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold">Providers</div>
                      <div className="text-lg font-extrabold text-[var(--text-primary)] mt-0.5">120+</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold">Domains</div>
                      <div className="text-lg font-extrabold text-[var(--text-primary)] mt-0.5">35+</div>
                    </div>
                  </div>

                  <Link to="/marketplaces/subject-outsourcing">
                    <Button 
                      type="primary" 
                      size="large"
                      className="bg-indigo-600 hover:bg-indigo-500 border-none px-6 rounded-xl flex items-center gap-1"
                    >
                      Enter Marketplace <RightOutlined className="text-xs" />
                    </Button>
                  </Link>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Card 2: Industry Experts & Events Marketplace */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex"
          >
            <GlassCard className="w-full flex flex-col justify-between hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(168,85,247,0.15)] transition-all duration-300 relative group overflow-hidden border-[var(--border-primary)] p-8">
              {/* Corner Gradient Glow */}
              <div className="absolute -right-32 -top-32 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl group-hover:bg-purple-500/20 transition-all duration-500 pointer-events-none" />

              <div>
                {/* Header info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <TeamOutlined />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] group-hover:text-purple-400 transition-colors">
                      Industry Experts & Events
                    </h2>
                    <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">Mentors & Speakers</span>
                  </div>
                </div>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6 text-sm">
                  Discover guest speakers, workshop instructors, industry mentors, placement experts, keynote speakers, hackathon judges, career coaches, and event partners for university programs and student engagement initiatives.
                </p>

                {/* Bullets (split into 2-column or list) */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-8">
                  {[
                    "Guest speakers",
                    "Technical workshops",
                    "Placement readiness programs",
                    "Career guidance sessions",
                    "Industry panels",
                    "Inauguration speakers",
                    "Hackathon mentors",
                    "Event judges",
                    "Entrepreneurship experts",
                    "Corporate engagement programs"
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]">
                      <CheckOutlined className="text-green-500 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom stats & Action */}
              <div className="border-t border-[var(--border-tertiary)] pt-6 mt-auto">
                <div className="flex justify-between items-center gap-4 flex-wrap">
                  {/* Dummy Stats */}
                  <div className="flex gap-6">
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold">Experts</div>
                      <div className="text-lg font-extrabold text-[var(--text-primary)] mt-0.5">500+</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold">Topics</div>
                      <div className="text-lg font-extrabold text-[var(--text-primary)] mt-0.5">50+</div>
                    </div>
                  </div>

                  <Link to="/marketplaces/industry-experts">
                    <Button 
                      type="primary" 
                      size="large"
                      className="bg-purple-600 hover:bg-purple-500 border-none px-6 rounded-xl flex items-center gap-1"
                    >
                      Enter Marketplace <RightOutlined className="text-xs" />
                    </Button>
                  </Link>
                </div>
              </div>
            </GlassCard>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default MarketplacesHub;
