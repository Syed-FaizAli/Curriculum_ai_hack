import React, { useState, useMemo, useEffect } from 'react';
import { Input, Tag, Button, Rate, Badge, message, Select } from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  CloseOutlined, 
  CheckCircleOutlined, 
  UserOutlined,
  CalendarOutlined,
  GlobalOutlined,
  BookOutlined,
  SafetyCertificateOutlined,
  HeartOutlined,
  HeartFilled,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  LinkOutlined,
  CompassOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  PhoneOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import Navbar from '../components/Navbar';
import { allExperts } from '../data/expertsData';

const { Option } = Select;

const FILTERS = [
  "All",
  "Guest Speakers",
  "Workshop Experts",
  "Placement Readiness",
  "Startup Mentors",
  "Industry Leaders",
  "Technical Experts",
  "Researchers",
  "Career Coaches"
];

const TOPIC_FILTERS = [
  "Artificial Intelligence",
  "Machine Learning",
  "Generative AI",
  "Data Science",
  "Cybersecurity",
  "Cloud Computing",
  "DevOps",
  "Product Management",
  "Software Engineering",
  "Entrepreneurship",
  "Startup Funding",
  "Venture Capital",
  "UI/UX Design",
  "Digital Marketing",
  "Business Analytics",
  "FinTech",
  "Blockchain",
  "Web Development",
  "Mobile Development",
  "Career Development",
  "Leadership",
  "Innovation",
  "Research",
  "Higher Education",
  "Corporate Strategy"
];

const IndustryExperts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [contactedExpertId, setContactedExpertId] = useState(null);
  const [savedExpertIds, setSavedExpertIds] = useState(new Set());
  const [bookedExpertId, setBookedExpertId] = useState(null);

  const [unlockedExpertIds, setUnlockedExpertIds] = useState(() => {
    const saved = localStorage.getItem('unlocked_experts');
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

  const handleUnlockContact = (expertId) => {
    if (unlockedExpertIds.has(expertId)) return;
    const currentUnlocks = parseInt(localStorage.getItem('lead_unlocks') || '5');
    if (currentUnlocks <= 0) {
      message.error('Insufficient lead unlocks! Please purchase a University Lead Package from the Pricing page.');
      return;
    }
    const nextUnlocks = currentUnlocks - 1;
    localStorage.setItem('lead_unlocks', nextUnlocks.toString());
    
    const newUnlocked = new Set(unlockedExpertIds);
    newUnlocked.add(expertId);
    setUnlockedExpertIds(newUnlocked);
    localStorage.setItem('unlocked_experts', JSON.stringify(Array.from(newUnlocked)));
    
    window.dispatchEvent(new Event('balance-update'));
    message.success('Contact details successfully unlocked! 1 Unlock consumed.');
  };

  // Filter Logic
  const filteredExperts = useMemo(() => {
    return allExperts.filter(expert => {
      // Search logic (Name, Organization, Topic, Expertise Area, Engagement Type, and Keywords/Bio)
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        expert.name.toLowerCase().includes(query) ||
        expert.role.toLowerCase().includes(query) ||
        expert.company.toLowerCase().includes(query) ||
        (expert.topics && expert.topics.some(t => t.toLowerCase().includes(query))) ||
        (expert.workshops && expert.workshops.some(w => w.toLowerCase().includes(query))) ||
        (expert.services && expert.services.some(s => s.toLowerCase().includes(query))) ||
        expert.areasOfExpertise.some(a => a.toLowerCase().includes(query)) ||
        expert.engagementTypes.some(e => e.toLowerCase().includes(query)) ||
        (expert.biography && expert.biography.toLowerCase().includes(query));

      // Category logic (matches categories array)
      const matchesCategory = selectedCategory === "All" || expert.categories.includes(selectedCategory);

      // Topic filter logic (matches topicFilters array)
      const matchesTopic = selectedTopic === "All" || expert.topicFilters.includes(selectedTopic);

      return matchesSearch && matchesCategory && matchesTopic;
    });
  }, [searchQuery, selectedCategory, selectedTopic]);

  const sortedExperts = useMemo(() => {
    const list = [...filteredExperts];
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
  }, [filteredExperts, sortBy]);

  const handleContact = (id) => {
    setContactedExpertId(id);
    setTimeout(() => {
      setContactedExpertId(null);
    }, 3000);
  };

  const handleSaveProfile = (id) => {
    setSavedExpertIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleBook = (id) => {
    setBookedExpertId(id);
    setTimeout(() => {
      setBookedExpertId(null);
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
              count="Expert Network & Workshops" 
              style={{ backgroundColor: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.4)' }}
              className="mb-4 text-xs font-semibold"
            />
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Industry Experts & Events Marketplace
            </h1>
            <p className="text-lg text-[var(--text-secondary)]">
              Find industry experts, guest speakers, workshop instructors, placement mentors, keynote speakers, and event professionals for academic and professional development initiatives.
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
                placeholder="Search experts, workshops, topics, companies, speakers..."
                prefix={<SearchOutlined className="text-purple-400" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                allowClear
                className="bg-[var(--bg-input)] border-[var(--border-tertiary)] hover:border-purple-400 focus:border-purple-500 text-[var(--text-primary)] h-12 rounded-xl"
                style={{
                  backgroundColor: 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-tertiary)'
                }}
              />
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider flex items-center gap-1">
                <FilterOutlined className="text-xs" /> Filter by Category
              </span>
              <div className="flex flex-wrap gap-2">
                {FILTERS.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-purple-600 border-purple-500 text-white shadow-lg"
                        : "bg-[var(--bg-input)] border-[var(--border-tertiary)] text-[var(--text-secondary)] hover:border-purple-500 hover:text-purple-400"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Filter Tags */}
            <div className="flex flex-col gap-2 border-t border-[var(--border-tertiary)] pt-4">
              <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider">
                Filter by Topic
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-2">
                <button
                  onClick={() => setSelectedTopic("All")}
                  className={`px-3 py-1 rounded-lg text-xs border transition-all ${
                    selectedTopic === "All"
                      ? "bg-indigo-600/30 border-indigo-500 text-indigo-300"
                      : "bg-black/10 border-[var(--border-tertiary)] text-[var(--text-muted)] hover:border-indigo-500"
                  }`}
                >
                  All Topics
                </button>
                {TOPIC_FILTERS.map(topic => (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className={`px-3 py-1 rounded-lg text-xs border transition-all ${
                      selectedTopic === topic
                        ? "bg-indigo-600/30 border-indigo-500 text-indigo-300"
                        : "bg-black/10 border-[var(--border-tertiary)] text-[var(--text-secondary)] hover:border-indigo-500"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Sorting and Results count indicator */}
            <div className="text-sm text-[var(--text-muted)] border-t border-[var(--border-tertiary)] pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider">Sort By:</span>
                <Select
                  value={sortBy}
                  onChange={setSortBy}
                  size="small"
                  className="w-40 custom-select"
                  dropdownClassName="dark-dropdown"
                >
                  <Option value="relevant">Most Relevant</Option>
                  <Option value="reviews">Most Reviewed</Option>
                  <Option value="rating">Highest Rated</Option>
                  <Option value="featured">Featured First</Option>
                  <Option value="premium">Premium First</Option>
                  <Option value="newest">Newest Listings</Option>
                </Select>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <span>Showing <strong className="text-[var(--text-primary)]">{sortedExperts.length}</strong> experts</span>
                <span className="text-xs bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-xl text-purple-400 font-bold">
                  🔑 {leadUnlocks} Contact Unlocks Available
                </span>
                {searchQuery || selectedCategory !== "All" || selectedTopic !== "All" || sortBy !== "relevant" ? (
                  <span className="text-xs italic text-purple-400">Filters/sorting are active</span>
                ) : null}
              </div>
            </div>

          </div>
        </GlassCard>

        {/* Experts Listing Grid */}
        {sortedExperts.length === 0 ? (
          <GlassCard className="py-16 text-center">
            <h3 className="text-xl font-bold text-[var(--text-secondary)] mb-2">No experts match your criteria</h3>
            <p className="text-[var(--text-muted)]">Try adjusting your search query, category, or topic filters.</p>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {sortedExperts.map((expert, index) => (
                <motion.div
                  key={expert.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                >
                  <GlassCard className="h-full flex flex-col justify-between hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)] transition-all duration-300 relative group overflow-hidden border-[var(--border-primary)] p-6">
                    
                    {/* Corner gradient glow */}
                    <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-purple-500/10 blur-2xl group-hover:bg-purple-500/25 transition-all duration-300 pointer-events-none" />
                    
                    <div>
                      {/* Initials Avatar / Logo and Rating header */}
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-md flex-shrink-0 bg-gradient-to-tr from-purple-500 to-indigo-500">
                          {expert.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div className="flex items-center gap-1.5 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                          <span className="text-xs font-semibold text-purple-400">{expert.rating}</span>
                          <Rate disabled defaultValue={1} count={1} className="text-xs text-yellow-400 flex items-center" />
                        </div>
                      </div>

                      {/* Title & Organization with badges */}
                      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1 group-hover:text-purple-400 transition-colors flex items-center gap-1.5 flex-wrap">
                        {expert.name}
                        {expert.isFeatured && <Tag color="purple" className="m-0 border-none text-[8px] font-bold px-1.5 py-0.5">FEATURED</Tag>}
                        {expert.isVerified && <Tag color="blue" className="m-0 border-none text-[8px] font-bold px-1.5 py-0.5">VERIFIED</Tag>}
                      </h3>
                      
                      <div className="text-xs text-[var(--text-secondary)] font-medium mb-1 truncate">
                        {expert.role} at <strong className="text-indigo-400">{expert.company}</strong>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] bg-purple-500/15 border border-purple-500/30 px-2 py-0.5 rounded text-purple-400 font-semibold uppercase tracking-wider">
                          {expert.category}
                        </span>
                        <span className="text-xs text-[var(--text-muted)] font-semibold">
                          {expert.yearsOfExperience} Years Exp
                        </span>
                        <Tag color={expert.tier === "Premium" ? "gold" : expert.tier === "Professional" ? "cyan" : "default"} className="m-0 border-none text-[9px] font-bold py-0">
                          {expert.tier}
                        </Tag>
                      </div>

                      {/* Key Expertise Tags */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {expert.areasOfExpertise.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[10px] bg-[var(--bg-input)] border border-[var(--border-tertiary)] px-2 py-0.5 rounded text-[var(--text-secondary)] font-medium">
                              {tag}
                            </span>
                          ))}
                          {expert.areasOfExpertise.length > 3 && (
                            <span className="text-[10px] text-[var(--text-faint)] font-bold self-center ml-1">
                              +{expert.areasOfExpertise.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Engagement status summary for university */}
                      <div className="mb-4 p-2.5 bg-indigo-500/5 border border-indigo-500/15 rounded-xl space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs">
                          <CheckCircleOutlined className="text-green-500 text-xs flex-shrink-0" />
                          <span className="font-semibold text-indigo-400 truncate">{expert.engagementStatus}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-[10px] text-[var(--text-secondary)] pt-1 border-t border-[var(--border-tertiary)]">
                          <div className="flex items-center gap-1">
                            <CompassOutlined className="text-indigo-400" />
                            <span>{expert.engagementMode} Mode</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ClockCircleOutlined className="text-indigo-400" />
                            <span className="truncate">{expert.responseTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action buttons */}
                    <div className="flex items-center gap-2 mt-auto">
                      <button
                        onClick={() => window.open("https://" + expert.linkedin, "_blank")}
                        className="w-9 h-9 rounded-lg flex items-center justify-center bg-indigo-500/10 hover:bg-indigo-600 hover:text-white text-indigo-400 transition-colors border border-indigo-500/20"
                        title="View LinkedIn Profile"
                      >
                        <LinkedinOutlined className="text-lg" />
                      </button>
                      <Button 
                        type="default" 
                        onClick={() => setSelectedExpert(expert)}
                        className="flex-1 bg-transparent border-[var(--border-secondary)] hover:border-purple-500 text-[var(--text-secondary)] hover:text-purple-400 rounded-lg text-xs h-9 font-semibold"
                      >
                        View Profile
                      </Button>
                      <Button 
                        type="primary"
                        onClick={() => handleContact(expert.id)}
                        className={`flex-1 rounded-lg text-xs h-9 font-semibold ${
                          contactedExpertId === expert.id 
                            ? "bg-green-600 border-green-600 hover:bg-green-500 hover:border-green-500" 
                            : "bg-purple-600 hover:bg-purple-500 border-none"
                        }`}
                      >
                        {contactedExpertId === expert.id ? "Request Sent!" : "Contact Expert"}
                      </Button>
                    </div>

                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>

      {/* Expert Profile Modal Overlay */}
      <AnimatePresence>
        {selectedExpert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            {/* Dark blur backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExpert(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="glass-panel w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-[var(--bg-secondary)] border-[var(--border-secondary)] p-6 md:p-8 z-10 relative shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedExpert(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-9 h-9 rounded-full flex items-center justify-center bg-[var(--bg-input)] hover:bg-[var(--hover-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-tertiary)] transition-all cursor-pointer"
              >
                <CloseOutlined />
              </button>

              {/* Modal Header */}
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 border-b border-[var(--border-tertiary)] pb-6 mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl text-white shadow-lg flex-shrink-0 bg-gradient-to-tr from-purple-500 to-indigo-500">
                  {selectedExpert.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] flex items-center gap-2">
                      {selectedExpert.name}
                      {selectedExpert.isFeatured && <Tag color="purple" className="m-0 border-none text-xs font-bold px-2 py-0.5">FEATURED</Tag>}
                      {selectedExpert.isVerified && <Tag color="blue" className="m-0 border-none text-xs font-bold px-2 py-0.5">VERIFIED</Tag>}
                    </h2>
                    <button 
                      onClick={() => handleSaveProfile(selectedExpert.id)}
                      className="text-lg flex items-center justify-center text-purple-400 hover:scale-110 transition-transform bg-purple-500/10 hover:bg-purple-500/20 p-2 rounded-xl"
                      title={savedExpertIds.has(selectedExpert.id) ? "Remove from Saved" : "Save Profile"}
                    >
                      {savedExpertIds.has(selectedExpert.id) ? <HeartFilled className="text-red-500" /> : <HeartOutlined />}
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
                    <span className="text-[var(--text-secondary)] font-medium">{selectedExpert.role} at <strong className="text-indigo-400">{selectedExpert.company}</strong></span>
                    <span className="text-[var(--text-faint)]">•</span>
                    <span className="text-purple-400 font-semibold uppercase tracking-wider text-xs">{selectedExpert.category}</span>
                    <span className="text-[var(--text-faint)]">•</span>
                    <Tag color={selectedExpert.tier === "Premium" ? "gold" : selectedExpert.tier === "Professional" ? "cyan" : "default"} className="m-0 border-none text-xs font-bold py-0.5 px-2.5">
                      {selectedExpert.tier} Member
                    </Tag>
                    <span className="text-[var(--text-faint)]">•</span>
                    <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
                      <Rate disabled defaultValue={1} count={1} className="text-xs text-yellow-400 flex items-center" />
                      <strong>{selectedExpert.rating} / 5.0 ({selectedExpert.reviewCount} reviews)</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                
                {/* Left Columns (Col Span 2) - Bio & Expertise details */}
                <div className="md:col-span-2 space-y-6">
                  
                  {/* Biography */}
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-[var(--text-muted)] font-bold mb-2 flex items-center gap-1.5">
                      <UserOutlined /> Biography
                    </h4>
                    <p className="text-[var(--text-secondary)] leading-relaxed text-sm bg-[var(--bg-input)] p-4 rounded-xl border border-[var(--border-tertiary)]">
                      {selectedExpert.biography}
                    </p>
                  </div>

                  {/* Areas of Expertise */}
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-[var(--text-muted)] font-bold mb-2.5">
                      Areas of Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExpert.areasOfExpertise.map(area => (
                        <Tag key={area} color="purple" className="m-0 border-purple-500/30 text-purple-300 bg-purple-500/10 px-3 py-1 font-semibold rounded-lg">
                          {area}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  {/* Topics / Syllabus Segments Covered */}
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-[var(--text-muted)] font-bold mb-2.5 flex items-center gap-2">
                      <BookOutlined className="text-indigo-400" /> Key Topics & Modules
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedExpert.topicsCovered.map(topic => (
                        <div key={topic} className="flex items-center gap-2.5 p-2.5 rounded-lg border border-[var(--border-tertiary)] bg-black/10">
                          <CheckCircleOutlined className="text-green-500 text-xs flex-shrink-0" />
                          <span className="text-xs text-[var(--text-primary)] font-semibold">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Supported Engagement Formats */}
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-[var(--text-muted)] font-bold mb-2.5">
                      Supported Session Formats
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExpert.sessionFormats.map(format => (
                        <Tag key={format} color="indigo" className="m-0 border-indigo-500/30 text-indigo-300 bg-indigo-500/10 px-3 py-0.5 rounded-lg">
                          {format}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  {/* Past Engagements */}
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-[var(--text-muted)] font-bold mb-2.5 flex items-center gap-2">
                      <SafetyCertificateOutlined className="text-yellow-500" /> Past Engagements
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedExpert.pastEngagements.map(engagement => (
                        <div key={engagement} className="flex items-center gap-2 p-2.5 rounded-lg border border-dashed border-[var(--border-tertiary)] text-[var(--text-secondary)] text-xs bg-black/5">
                          <span className="text-yellow-500 font-bold mr-1.5">•</span>
                          <span>{engagement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Column (Col Span 1) - Booking Metrics & Structure */}
                <div className="space-y-6">
                  
                  {/* Experience & University Meta Details */}
                  <div className="bg-[var(--bg-input)] border border-[var(--border-tertiary)] p-5 rounded-2xl space-y-4">
                    <h4 className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold flex items-center gap-1.5">
                      <CalendarOutlined /> University Engagement
                    </h4>
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Years of Experience</div>
                      <div className="text-base font-extrabold text-[var(--text-primary)] mt-0.5">{selectedExpert.yearsOfExperience} Years</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Engagement Status</div>
                      <div className="text-xs font-bold text-purple-400 mt-1">{selectedExpert.engagementStatus}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Engagement Mode</div>
                      <div className="text-xs font-semibold text-[var(--text-primary)] mt-1">{selectedExpert.engagementMode}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Response Speed</div>
                      <div className="text-xs font-semibold text-[var(--text-secondary)] mt-1">{selectedExpert.responseTime}</div>
                    </div>
                  </div>

                  {/* Contact details (gated) */}
                  <div className="bg-[var(--bg-input)] border border-purple-500/20 p-5 rounded-2xl space-y-3 relative overflow-hidden bg-purple-500/5">
                    <h4 className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold flex items-center gap-1.5">
                      <TeamOutlined className="text-purple-400" /> Direct Contact Info
                    </h4>
                    {unlockedExpertIds.has(selectedExpert.id) ? (
                      <div className="space-y-2.5 text-xs">
                        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                          <PhoneOutlined className="text-indigo-400" />
                          <span><strong>Phone:</strong> {selectedExpert.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                          <MessageOutlined className="text-green-400" />
                          <span><strong>WhatsApp:</strong> {selectedExpert.whatsapp}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                          <UserOutlined className="text-purple-400" />
                          <span className="truncate"><strong>Email:</strong> <a href={`mailto:${selectedExpert.email}`} className="hover:underline">{selectedExpert.email}</a></span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-2 space-y-3 relative z-10">
                        <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                          Mobile number, WhatsApp, and personal email details are locked.
                        </p>
                        <Button 
                          type="primary"
                          size="small"
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 border-none font-bold text-[10px] rounded-lg px-3 py-1"
                          onClick={() => handleUnlockContact(selectedExpert.id)}
                        >
                          🔑 Unlock Contact Details
                        </Button>
                        <div className="text-[9px] text-[var(--text-muted)] mt-1">
                          Consumes 1 Lead Unlock. Balance: {leadUnlocks}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Languages & Preferred Audience */}
                  <div className="bg-[var(--bg-input)] border border-[var(--border-tertiary)] p-5 rounded-2xl space-y-4">
                    <h4 className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold flex items-center gap-1.5">
                      <TeamOutlined /> Preferred Audience
                    </h4>
                    <div>
                      <div className="flex flex-wrap gap-1">
                        {selectedExpert.preferredAudience ? (
                          selectedExpert.preferredAudience.map(aud => (
                            <span key={aud} className="text-[10px] bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded text-indigo-300 font-semibold">{aud}</span>
                          ))
                        ) : (
                          <span className="text-[10px] bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded text-indigo-300 font-semibold">Engineering Students</span>
                        )}
                      </div>
                    </div>
                    <div className="pt-2 border-t border-[var(--border-tertiary)]">
                      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">Languages</div>
                      <div className="flex flex-wrap gap-1">
                        {selectedExpert.languages.map(lang => (
                          <span key={lang} className="text-[10px] bg-black/25 border border-[var(--border-tertiary)] px-2 py-0.5 rounded text-[var(--text-secondary)] font-medium">{lang}</span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2 border-t border-[var(--border-tertiary)]">
                      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">Availability</div>
                      <div className="text-xs font-semibold text-[var(--text-secondary)]">{selectedExpert.availability}</div>
                    </div>
                  </div>

                  {/* Professional Links Block */}
                  <div className="bg-[var(--bg-input)] border border-[var(--border-tertiary)] p-5 rounded-2xl space-y-3">
                    <h4 className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold flex items-center gap-1.5">
                      <GlobalOutlined /> Professional Links
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-indigo-400 transition-colors">
                        <LinkedinOutlined className="text-sm flex-shrink-0 text-indigo-400" />
                        <a href={`https://${selectedExpert.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">{selectedExpert.linkedin}</a>
                      </div>
                      
                      {selectedExpert.website && (
                        <div className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-indigo-400 transition-colors">
                          <LinkOutlined className="text-sm flex-shrink-0 text-indigo-400" />
                          <a href={`https://${selectedExpert.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">{selectedExpert.website}</a>
                        </div>
                      )}

                      {selectedExpert.twitter && (
                        <div className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-indigo-400 transition-colors">
                          <TwitterOutlined className="text-sm flex-shrink-0 text-indigo-400" />
                          <a href={`https://${selectedExpert.twitter}`} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">{selectedExpert.twitter}</a>
                        </div>
                      )}

                      {selectedExpert.youtube && (
                        <div className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-indigo-400 transition-colors">
                          <YoutubeOutlined className="text-sm flex-shrink-0 text-indigo-400" />
                          <a href={`https://${selectedExpert.youtube}`} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">{selectedExpert.youtube}</a>
                        </div>
                      )}

                      {selectedExpert.portfolio && (
                        <div className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-indigo-400 transition-colors">
                          <BookOutlined className="text-sm flex-shrink-0 text-indigo-400" />
                          <a href={`https://${selectedExpert.portfolio}`} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">{selectedExpert.portfolio}</a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Booking Trigger Buttons */}
                  <div className="space-y-2.5">
                    <Button
                      type="primary"
                      size="large"
                      className={`w-full h-12 rounded-xl border-none text-white font-semibold transition-all tracking-wide ${
                        bookedExpertId === selectedExpert.id 
                          ? "bg-green-600 hover:bg-green-500" 
                          : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90"
                      }`}
                      onClick={() => handleBook(selectedExpert.id)}
                    >
                      {bookedExpertId === selectedExpert.id ? "Booking Initiated!" : "Book Expert"}
                    </Button>
                    <Button
                      type="default"
                      size="large"
                      className="w-full h-12 rounded-xl border-[var(--border-secondary)] hover:border-purple-500 text-[var(--text-secondary)] hover:text-purple-400 transition-all font-semibold"
                      onClick={() => handleSaveProfile(selectedExpert.id)}
                    >
                      {savedExpertIds.has(selectedExpert.id) ? "Saved (Click to remove)" : "Save Profile"}
                    </Button>
                  </div>

                  {/* Toast/Placeholder success info */}
                  {bookedExpertId === selectedExpert.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="text-center text-xs text-green-400 font-semibold mt-2"
                    >
                      Booking request registered for {selectedExpert.name}!
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

export default IndustryExperts;
