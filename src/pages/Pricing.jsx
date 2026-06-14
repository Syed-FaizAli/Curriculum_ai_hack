import React from 'react';
import { Button, Tag, Tabs, message } from 'antd';
import { 
  CheckCircleOutlined, 
  KeyOutlined, 
  ShopOutlined, 
  FileTextOutlined, 
  ThunderboltOutlined, 
  SketchOutlined, 
  RocketOutlined 
} from '@ant-design/icons';
import Navbar from '../components/Navbar';
import GlassCard from '../components/GlassCard';

const Pricing = () => {
  const handlePurchaseUnlocks = (amount, packageName) => {
    const current = parseInt(localStorage.getItem('lead_unlocks') || '5');
    const next = current + amount;
    localStorage.setItem('lead_unlocks', next.toString());
    window.dispatchEvent(new Event('balance-update'));
    message.success(`Successfully purchased ${packageName}! Added ${amount} Contact Unlocks. New Balance: ${next} Unlocks.`);
  };

  const handlePurchaseTokens = (amount, packageName) => {
    const current = parseInt(localStorage.getItem('audit_tokens') || '5');
    const next = current + amount;
    localStorage.setItem('audit_tokens', next.toString());
    window.dispatchEvent(new Event('balance-update'));
    message.success(`Successfully purchased ${packageName}! Added ${amount} Audit Tokens. New Balance: ${next} Tokens.`);
  };

  const handleSubscribeSupplier = (tierName) => {
    message.success(`Successfully subscribed to the ${tierName}! Your supplier profile is now active on the marketplace.`);
  };

  const leadPackages = [
    {
      title: 'Starter Package',
      price: '₹999',
      unlocks: 10,
      features: [
        '10 Contact Unlocks',
        'Access to Outsourcing Companies',
        'Access to Industry Experts',
        '30-Day Expiry',
      ],
      cta: 'Purchase 10 Unlocks',
      icon: <RocketOutlined className="text-3xl text-indigo-400" />
    },
    {
      title: 'Growth Package',
      price: '₹1,999',
      unlocks: 25,
      features: [
        '25 Contact Unlocks',
        'Access to Outsourcing Companies',
        'Access to Industry Experts',
        '90-Day Expiry',
        'Priority Support Slot',
      ],
      cta: 'Purchase 25 Unlocks',
      icon: <ThunderboltOutlined className="text-3xl text-purple-400" />,
      popular: true
    },
    {
      title: 'Institution Package',
      price: '₹4,999',
      unlocks: 100,
      features: [
        '100 Contact Unlocks',
        'Access to Outsourcing Companies',
        'Access to Industry Experts',
        'No Expiration Date',
        'Dedicated Account Manager',
        'Custom CSV Export of Unlocked Leads',
      ],
      cta: 'Purchase 100 Unlocks',
      icon: <SketchOutlined className="text-3xl text-yellow-400" />
    }
  ];

  const supplierPlans = [
    {
      title: 'Basic Plan',
      price: '₹499',
      duration: 'month',
      features: [
        'Listing Active',
        'Marketplace Visibility',
        'Profile Page',
        'Social Links',
        'Basic Analytics (Views)',
      ],
      cta: 'Subscribe Basic',
      icon: <RocketOutlined className="text-3xl text-indigo-400" />
    },
    {
      title: 'Professional Plan',
      price: '₹999',
      duration: 'month',
      features: [
        'Everything in Basic',
        'Featured Placement Badge',
        'Priority Search Ranking',
        'Enhanced Profile Layout',
        'Lead Insights & Inquiries Dashboard',
      ],
      cta: 'Subscribe Professional',
      icon: <ThunderboltOutlined className="text-3xl text-purple-400" />,
      popular: true
    },
    {
      title: 'Premium Plan',
      price: '₹1,999',
      duration: 'month',
      features: [
        'Everything in Professional',
        'Homepage Promotion Slot',
        'Verified Profile Badge',
        'Top Search Placement',
        'Featured Recommendation Slots',
        'Dedicated University Outreach Campaigns',
      ],
      cta: 'Subscribe Premium',
      icon: <SketchOutlined className="text-3xl text-yellow-400" />
    }
  ];

  const tokenPacks = [
    {
      title: '5 Audit Tokens',
      price: '₹1,499',
      tokens: 5,
      features: [
        '5 Curriculum Audits / Analyses',
        'Detailed Gap Reports',
        'AI Benchmarking Recommendations',
        'No Expiry',
      ],
      cta: 'Purchase 5 Tokens',
      icon: <RocketOutlined className="text-3xl text-indigo-400" />
    },
    {
      title: '20 Audit Tokens',
      price: '₹4,999',
      tokens: 20,
      features: [
        '20 Curriculum Audits / Analyses',
        'Detailed Gap Reports',
        'AI Benchmarking Recommendations',
        'PDF/CSV Full Report Exports',
        '1-on-1 Faculty Onboarding Call',
        'No Expiry',
      ],
      cta: 'Purchase 20 Tokens',
      icon: <ThunderboltOutlined className="text-3xl text-purple-400" />,
      popular: true
    },
    {
      title: '50 Audit Tokens',
      price: '₹9,999',
      tokens: 50,
      features: [
        '50 Curriculum Audits / Analyses',
        'Detailed Gap Reports',
        'AI Benchmarking Recommendations',
        'PDF/CSV Full Report Exports',
        'Custom School Domain Level Integration',
        '24/7 Priority Support',
        'No Expiry',
      ],
      cta: 'Purchase 50 Tokens',
      icon: <SketchOutlined className="text-3xl text-yellow-400" />
    }
  ];

  const renderGrid = (items, onPurchase, purchaseKey) => (
    <div className="grid md:grid-cols-3 gap-8 items-stretch pt-4">
      {items.map((item, index) => (
        <GlassCard
          key={index}
          className={`relative flex flex-col justify-between transition-all duration-300 hover:scale-[1.03] ${
            item.popular ? 'border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.15)]' : ''
          }`}
        >
          {item.popular && (
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
              <Tag color="#6366f1" className="px-3 py-1 text-sm font-bold border-none">
                MOST POPULAR
              </Tag>
            </div>
          )}

          <div>
            <div className="mb-6">
              <div className="mb-4 inline-block p-3 rounded-full bg-[var(--bg-input)] border border-[var(--border-tertiary)]">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-[var(--text-primary)]">{item.price}</span>
                {item.duration && (
                  <span className="text-[var(--text-muted)] text-sm">/{item.duration}</span>
                )}
              </div>
            </div>

            <ul className="space-y-3.5 mb-8">
              {item.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[var(--text-secondary)] text-sm leading-relaxed">
                  <CheckCircleOutlined className="text-green-400 mt-1 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            type={item.popular ? 'primary' : 'default'}
            size="large"
            className={`w-full h-12 text-sm font-bold rounded-xl mt-auto ${
              item.popular 
                ? 'bg-indigo-600 border-none hover:bg-indigo-500 text-white' 
                : 'bg-transparent border-[var(--border-secondary)] text-[var(--text-primary)] hover:border-indigo-400 hover:text-indigo-400'
            }`}
            onClick={() => {
              if (purchaseKey === 'supplier') {
                onPurchase(item.title);
              } else {
                onPurchase(item[purchaseKey], item.title);
              }
            }}
          >
            {item.cta}
          </Button>
        </GlassCard>
      ))}
    </div>
  );

  const tabsItems = [
    {
      key: 'unlocks',
      label: (
        <span className="flex items-center gap-1.5 px-2 font-bold text-sm">
          <KeyOutlined /> University Lead Packages
        </span>
      ),
      children: renderGrid(leadPackages, handlePurchaseUnlocks, 'unlocks')
    },
    {
      key: 'suppliers',
      label: (
        <span className="flex items-center gap-1.5 px-2 font-bold text-sm">
          <ShopOutlined /> Supplier Subscription Plans
        </span>
      ),
      children: renderGrid(supplierPlans, handleSubscribeSupplier, 'supplier')
    },
    {
      key: 'tokens',
      label: (
        <span className="flex items-center gap-1.5 px-2 font-bold text-sm">
          <FileTextOutlined /> Curriculum Audit Tokens
        </span>
      ),
      children: renderGrid(tokenPacks, handlePurchaseTokens, 'tokens')
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Navbar />

      <div className="pt-32 pb-20 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
            Platform Subscription & Token Plans
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            Restructure plans, unlock prospective leads, and secure priority listing options for universities and service providers.
          </p>
        </div>

        <GlassCard className="p-8">
          <Tabs 
            defaultActiveKey="unlocks" 
            items={tabsItems} 
            className="custom-monetization-tabs"
            centered
          />
        </GlassCard>
      </div>
    </div>
  );
};

export default Pricing;
