import React, { useState, useMemo, useEffect } from 'react';
import { Input, Select, Tag, Button, Rate, Badge, message } from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  GlobalOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  LinkOutlined, 
  EnvironmentOutlined, 
  TrophyOutlined, 
  TeamOutlined, 
  SafetyCertificateOutlined,
  CompassOutlined,
  RocketOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  HistoryOutlined,
  BookOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import Navbar from '../components/Navbar';
import { marketplaceCompanies } from '../data/marketplaceData';

const { Option } = Select;

const DOMAINS = [
  "AI & Advanced Computing",
  "Quantum Technologies",
  "Blockchain & Web3",
  "Cloud & DevOps",
  "Cybersecurity",
  "Data Engineering",
  "Robotics",
  "Semiconductor & Electronics",
  "Advanced Science",
  "Emerging Technologies"
];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [selectedMode, setSelectedMode] = useState("All");
  const [globalOnly, setGlobalOnly] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [contactedCompanyId, setContactedCompanyId] = useState(null);

  const [unlockedCompanyIds, setUnlockedCompanyIds] = useState(() => {
    const saved = localStorage.getItem('unlocked_companies');
    return new Set(saved ? JSON.parse(saved) : []);
  });
  const [leadUnlocks, setLeadUnlocks] = useState(() => {
    return parseInt(localStorage.getItem('lead_unlocks') || '5');
  });
  const [sortBy, setSortBy] = useState("relevant");

  useEffect(() => {
    const handleBalanceUpdate = () => {
      setLeadUnlocks(parseInt(localStorage.getItem('lead_unlocks') || '5'));
    };
    window.addEventListener('balance-update', handleBalanceUpdate);
    return () => window.removeEventListener('balance-update', handleBalanceUpdate);
  }, []);

  const handleUnlockContact = (companyId) => {
    if (unlockedCompanyIds.has(companyId)) return;
    const currentUnlocks = parseInt(localStorage.getItem('lead_unlocks') || '5');
    if (currentUnlocks <= 0) {
      message.error('Insufficient lead unlocks! Please purchase a University Lead Package from the Pricing page.');
      return;
    }
    const nextUnlocks = currentUnlocks - 1;
    localStorage.setItem('lead_unlocks', nextUnlocks.toString());
    
    const newUnlocked = new Set(unlockedCompanyIds);
    newUnlocked.add(companyId);
    setUnlockedCompanyIds(newUnlocked);
    localStorage.setItem('unlocked_companies', JSON.stringify(Array.from(newUnlocked)));
    
    window.dispatchEvent(new Event('balance-update'));
    message.success('Contact details successfully unlocked! 1 Unlock consumed.');
  };

  // Filter Logic
  const filteredCompanies = useMemo(() => {
    return marketplaceCompanies.filter(company => {
      // Search by Company Name or Course Name or Domain
      const matchesSearch = 
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.coursesOffered.some(course => course.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDomain = selectedDomain === "All" || company.domain === selectedDomain;
      
      const matchesRating = selectedRating === "All" || company.rating >= parseFloat(selectedRating);
      
      const matchesMode = selectedMode === "All" || company.teachingModes.includes(selectedMode);
      
      const matchesGlobal = globalOnly === "All" || (globalOnly === "Yes" && company.availableGlobally);

      return matchesSearch && matchesDomain && matchesRating && matchesMode && matchesGlobal;
    });
  }, [searchQuery, selectedDomain, selectedRating, selectedMode, globalOnly]);

  const sortedCompanies = useMemo(() => {
    const list = [...filteredCompanies];
    if (sortBy === "reviews") {
      return list.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    if (sortBy === "rating") {
      return list.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === "featured") {
      return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
    if (sortBy === "premium") {
      return list.sort((a, b) => {
        const score = (tier) => tier === "Premium" ? 2 : tier === "Professional" ? 1 : 0;
        return score(b.tier) - score(a.tier);
      });
    }
    if (sortBy === "newest") {
      return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return list; // "relevant"
  }, [filteredCompanies, sortBy]);

  const handleContact = (id) => {
    setContactedCompanyId(id);
    setTimeout(() => {
      setContactedCompanyId(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Navbar />
      
      <div className="pt-28 px-4 md:px-8 max-w-7xl mx-auto pb-16">
        
        {/* Header Section */}
        <header className="mb-12 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge 
              count="B2B Faculty Augmentation" 
              style={{ backgroundColor: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.4)' }}
              className="mb-4 text-xs font-semibold"
            />
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Subject Outsourcing Marketplace
            </h1>
            <p className="text-lg text-[var(--text-secondary)]">
              Discover and partner with specialized companies, laboratories, and training institutes to deliver advanced, industry-level curriculum, workshops, and certifications.
            </p>
          </motion.div>
        </header>

        {/* Search & Filter Section */}
        <GlassCard className="mb-10 p-6 md:p-8">
          <div className="flex flex-col gap-6">
            
            {/* Search Bar */}
            <div className="w-full">
              <Input
                size="large"
                placeholder="Search by company name, domain, or specific courses (e.g. LLM, Kubernetes, VLSI)..."
                prefix={<SearchOutlined className="text-indigo-400" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                allowClear
                className="bg-[var(--bg-input)] border-[var(--border-tertiary)] hover:border-indigo-400 focus:border-indigo-500 text-[var(--text-primary)] h-12 rounded-xl"
                style={{
                  backgroundColor: 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-tertiary)'
                }}
              />
            </div>

            {/* Filter Selects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Domain Filter */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider flex items-center gap-1">
                  <FilterOutlined className="text-xs" /> Domain Area
                </span>
                <Select
                  value={selectedDomain}
                  onChange={setSelectedDomain}
                  className="w-full custom-select"
                  dropdownClassName="dark-dropdown"
                >
                  <Option value="All">All Domains</Option>
                  {DOMAINS.map(domain => (
                    <Option key={domain} value={domain}>{domain}</Option>
                  ))}
                </Select>
              </div>

              {/* Teaching Mode Filter */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider flex items-center gap-1">
                  <CompassOutlined className="text-xs" /> Mode
                </span>
                <Select
                  value={selectedMode}
                  onChange={setSelectedMode}
                  className="w-full custom-select"
                >
                  <Option value="All">All Modes</Option>
                  <Option value="Online">Online</Option>
                  <Option value="Offline">Offline</Option>
                  <Option value="Hybrid">Hybrid</Option>
                </Select>
              </div>

              {/* Rating Filter */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider flex items-center gap-1">
                  <TrophyOutlined className="text-xs" /> Rating
                </span>
                <Select
                  value={selectedRating}
                  onChange={setSelectedRating}
                  className="w-full custom-select"
                >
                  <Option value="All">All Ratings</Option>
                  <Option value="4.8">4.8+ Stars</Option>
                  <Option value="4.7">4.7+ Stars</Option>
                  <Option value="4.6">4.6+ Stars</Option>
                </Select>
              </div>

              {/* Global Availability Filter */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider flex items-center gap-1">
                  <GlobalOutlined className="text-xs" /> Global Availability
                </span>
                <Select
                  value={globalOnly}
                  onChange={setGlobalOnly}
                  className="w-full custom-select"
                >
                  <Option value="All">All Locations</Option>
                  <Option value="Yes">Global Only</Option>
                </Select>
              </div>

              {/* Sort By Filter */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider flex items-center gap-1">
                  <FilterOutlined className="text-xs" /> Sort By
                </span>
                <Select
                  value={sortBy}
                  onChange={setSortBy}
                  className="w-full custom-select"
                >
                  <Option value="relevant">Most Relevant</Option>
                  <Option value="reviews">Most Reviewed</Option>
                  <Option value="rating">Highest Rated</Option>
                  <Option value="featured">Featured First</Option>
                  <Option value="premium">Premium First</Option>
                  <Option value="newest">Newest Listings</Option>
                </Select>
              </div>

              {/* Reset Button */}
              <div className="flex items-end">
                <Button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedDomain("All");
                    setSelectedRating("All");
                    setSelectedMode("All");
                    setGlobalOnly("All");
                    setSortBy("relevant");
                  }}
                  className="w-full h-9 bg-transparent border-dashed border-[var(--border-secondary)] hover:border-indigo-400 hover:text-indigo-400 text-[var(--text-secondary)] rounded-lg flex items-center justify-center gap-2"
                >
                  Clear Filters
                </Button>
              </div>

            </div>

            {/* Results count indicator */}
            <div className="text-sm text-[var(--text-muted)] border-t border-[var(--border-tertiary)] pt-4 flex justify-between items-center">
              <span>Showing <strong className="text-[var(--text-primary)]">{sortedCompanies.length}</strong> partners</span>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-xl text-purple-400 font-bold">
                  🔑 {leadUnlocks} Contact Unlocks Available
                </span>
                {searchQuery || selectedDomain !== "All" || selectedRating !== "All" || selectedMode !== "All" || globalOnly !== "All" || sortBy !== "relevant" ? (
                  <span className="text-xs italic text-indigo-400">Filters are currently active</span>
                ) : null}
              </div>
            </div>

          </div>
        </GlassCard>

        {/* Partners Grid */}
        {sortedCompanies.length === 0 ? (
          <GlassCard className="py-16 text-center">
            <h3 className="text-xl font-bold text-[var(--text-secondary)] mb-2">No partners match your criteria</h3>
            <p className="text-[var(--text-muted)]">Try adjusting your filters or search terms.</p>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {sortedCompanies.map((company, index) => (
                <motion.div
                  key={company.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                >
                  <GlassCard className="h-full flex flex-col justify-between hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-all duration-300 relative group overflow-hidden border-[var(--border-primary)]">
                    
                    {/* Corner gradient glow */}
                    <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-indigo-500/10 blur-2xl group-hover:bg-indigo-500/25 transition-all duration-300 pointer-events-none" />
                    
                    <div>
                      {/* Logo and Rating header */}
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-md flex-shrink-0"
                          style={{ background: company.logoBg }}
                        >
                          {company.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div className="flex items-center gap-1.5 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                          <span className="text-xs font-semibold text-indigo-400">{company.rating}</span>
                          <Rate disabled defaultValue={1} count={1} className="text-xs text-yellow-400 flex items-center" />
                        </div>
                      </div>

                      {/* Title & Domain */}
                      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1 group-hover:text-indigo-400 transition-colors flex items-center gap-2 flex-wrap">
                        {company.name}
                        {company.isFeatured && <Tag color="purple" className="m-0 border-none text-[9px] font-bold px-1.5 py-0.5">FEATURED</Tag>}
                        {company.isVerified && <Tag color="blue" className="m-0 border-none text-[9px] font-bold px-1.5 py-0.5">VERIFIED</Tag>}
                      </h3>
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="inline-block text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
                          {company.domain}
                        </span>
                        <span className="text-[var(--text-faint)] text-xs">•</span>
                        <Tag color={company.tier === "Premium" ? "gold" : company.tier === "Professional" ? "cyan" : "default"} className="m-0 border-none text-[10px] font-bold py-0">
                          {company.tier}
                        </Tag>
                      </div>

                      {/* Short Description */}
                      <p className="text-sm text-[var(--text-secondary)] line-clamp-3 mb-4">
                        {company.shortDescription}
                      </p>

                      {/* Course Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {company.coursesOffered.slice(0, 3).map(course => (
                          <span 
                            key={course} 
                            className="text-[11px] bg-[var(--bg-input)] border border-[var(--border-tertiary)] px-2 py-0.5 rounded text-[var(--text-secondary)] font-medium"
                          >
                            {course}
                          </span>
                        ))}
                        {company.coursesOffered.length > 3 && (
                          <span className="text-[11px] text-[var(--text-muted)] font-bold self-center">
                            +{company.coursesOffered.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom action block */}
                    <div className="border-t border-[var(--border-tertiary)] pt-4 flex justify-between items-center mt-auto">
                      <span className="text-xs text-[var(--text-muted)]">
                        Exp: <strong className="text-[var(--text-secondary)]">{company.yearsOfExperience} yrs</strong>
                      </span>
                      <Button 
                        type="primary" 
                        ghost
                        onClick={() => setSelectedCompany(company)}
                        className="border-indigo-500/50 text-indigo-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 rounded-lg text-xs"
                      >
                        View Details
                      </Button>
                    </div>

                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>

      {/* Details Modal Overlay */}
      <AnimatePresence>
        {selectedCompany && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            {/* Dark blur backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCompany(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="glass-panel w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-[var(--bg-secondary)] border-[var(--border-secondary)] p-6 md:p-8 z-10 relative shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedCompany(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-9 h-9 rounded-full flex items-center justify-center bg-[var(--bg-input)] hover:bg-[var(--hover-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-tertiary)] transition-all cursor-pointer"
              >
                <CloseOutlined />
              </button>

              {/* Modal Header */}
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 border-b border-[var(--border-tertiary)] pb-6 mb-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl text-white shadow-lg flex-shrink-0"
                  style={{ background: selectedCompany.logoBg }}
                >
                  {selectedCompany.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
                      {selectedCompany.name}
                    </h2>
                    <Tag color={selectedCompany.availableGlobally ? 'success' : 'warning'} className="border-0 font-medium">
                      {selectedCompany.availableGlobally ? 'Available Globally' : 'Regional Delivery'}
                    </Tag>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
                    <span className="text-purple-400 font-semibold uppercase tracking-wider">{selectedCompany.domain}</span>
                    <span className="text-[var(--text-faint)]">•</span>
                    <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
                      <Rate disabled allowHalf defaultValue={selectedCompany.rating} className="text-xs text-yellow-400" />
                      <strong>{selectedCompany.rating} / 5.0</strong>
                    </span>
                    <span className="text-[var(--text-faint)]">•</span>
                    <span className="text-[var(--text-secondary)]"><strong>{selectedCompany.yearsOfExperience}</strong> Years Experience</span>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                
                {/* Left Columns (Col Span 2) - Company Bio & Offerings */}
                <div className="md:col-span-2 space-y-6">
                  
                  {/* Company Overview */}
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-[var(--text-muted)] font-bold mb-2">Company Overview</h4>
                    <p className="text-[var(--text-secondary)] leading-relaxed text-sm bg-[var(--bg-input)] p-4 rounded-xl border border-[var(--border-tertiary)]">
                      {selectedCompany.detailedOverview}
                    </p>
                  </div>

                  {/* Courses Offered */}
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-[var(--text-muted)] font-bold mb-3 flex items-center gap-2">
                      <BookOutlined className="text-indigo-400" /> Advanced Courses Offered
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedCompany.coursesOffered.map(course => (
                        <div key={course} className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--hover-bg)] transition-colors border border-[var(--border-tertiary)] bg-black/10">
                          <CheckCircleOutlined className="text-green-500 text-xs flex-shrink-0" />
                          <span className="text-xs text-[var(--text-primary)] font-semibold">{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Engagement Models & Capabilities */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-[var(--text-muted)] font-bold mb-2.5">Engagement Models</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCompany.engagementModels.map(model => (
                          <Tag key={model} color="indigo" className="m-0 border-indigo-500/30 text-indigo-300 bg-indigo-500/10">
                            {model}
                          </Tag>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-[var(--text-muted)] font-bold mb-2.5">Teaching Modes</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCompany.teachingModes.map(mode => (
                          <Tag key={mode} color="purple" className="m-0 border-purple-500/30 text-purple-300 bg-purple-500/10">
                            {mode}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Certifications and Collaborations */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-[var(--text-muted)] font-bold mb-2.5 flex items-center gap-2">
                        <SafetyCertificateOutlined className="text-yellow-500" /> Certifications Offered
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                        {selectedCompany.certificationsOffered.map(cert => (
                          <li key={cert} className="flex items-start gap-1">
                            <span className="text-yellow-500">•</span>
                            <span>{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-[var(--text-muted)] font-bold mb-2.5 flex items-center gap-2">
                        <RocketOutlined className="text-indigo-400" /> Industry Partnerships
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                        {selectedCompany.industryPartnerships.map(partner => (
                          <li key={partner} className="flex items-start gap-1">
                            <span className="text-indigo-400">•</span>
                            <span>{partner}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>

                {/* Right Column (Col Span 1) - Metrics & Contact Info */}
                <div className="space-y-6">
                  
                  {/* Experience & Operations Metrics */}
                  <div className="bg-[var(--bg-input)] border border-[var(--border-tertiary)] p-5 rounded-2xl">
                    <h4 className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold mb-4 flex items-center gap-1.5">
                      <HistoryOutlined /> Experience Metrics
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <div className="text-[11px] text-[var(--text-muted)] uppercase">Courses Delivered</div>
                        <div className="text-2xl font-extrabold text-[var(--text-primary)] mt-0.5">{selectedCompany.coursesDelivered}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-[var(--text-muted)] uppercase">Institutions Served</div>
                        <div className="text-2xl font-extrabold text-[var(--text-primary)] mt-0.5">{selectedCompany.institutionsServed}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-[var(--text-muted)] uppercase">Student Capacity</div>
                        <div className="text-sm font-semibold text-[var(--text-secondary)] mt-0.5">{selectedCompany.studentCapacity}</div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="border border-[var(--border-primary)] p-5 rounded-2xl bg-indigo-500/5 relative overflow-hidden">
                    <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />
                    
                    <h4 className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold mb-4 flex items-center gap-1.5">
                      <TeamOutlined /> Partnership Contact
                    </h4>
                    {unlockedCompanyIds.has(selectedCompany.id) ? (
                      <div className="space-y-3.5 text-xs">
                        <div>
                          <div className="text-[10px] text-[var(--text-muted)] uppercase mb-0.5">Contact Person</div>
                          <div className="font-semibold text-sm text-[var(--text-primary)]">{selectedCompany.contactPerson}</div>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-indigo-400 transition-colors">
                          <PhoneOutlined />
                          <span>{selectedCompany.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-indigo-400 transition-colors">
                          <MailOutlined />
                          <a href={`mailto:${selectedCompany.email}`} className="hover:underline">{selectedCompany.email}</a>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-indigo-400 transition-colors">
                          <LinkOutlined />
                          <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{selectedCompany.website.replace('https://', '')}</a>
                        </div>
                        <div className="flex items-start gap-2 text-[var(--text-secondary)] leading-relaxed">
                          <EnvironmentOutlined className="mt-0.5 flex-shrink-0" />
                          <span>{selectedCompany.headquarters}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 text-center py-2 relative z-10">
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                          Direct contact details (mobile, email) are locked.
                        </p>
                        <Button 
                          type="primary"
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 border-none font-semibold text-xs px-4 py-1.5 rounded-lg"
                          onClick={() => handleUnlockContact(selectedCompany.id)}
                        >
                          🔑 Unlock Contact Details
                        </Button>
                        <div className="text-[10px] text-[var(--text-muted)] mt-1">
                          Consumes 1 Lead Unlock. Balance: {leadUnlocks}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Primary Contact Button */}
                  <Button
                    type="primary"
                    size="large"
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 border-none text-white hover:opacity-90 transition-all font-semibold tracking-wide"
                    onClick={() => handleContact(selectedCompany.id)}
                  >
                    {contactedCompanyId === selectedCompany.id ? "Partnership Request Sent!" : "Request Partnership Proposal"}
                  </Button>
                  {contactedCompanyId === selectedCompany.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="text-center text-xs text-green-400 font-semibold"
                    >
                      Proposal request details successfully sent to {selectedCompany.contactPerson}!
                    </motion.div>
                  )}

                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Marketplace;
