'use client';

import React, { useState } from 'react';
import { LandingPage } from '@/components/marketing/landing-page';
import { MarketingChatbot } from '@/components/marketing/marketing-chatbot';

export default function MarketingPage() {
  const [funnel, setFunnel] = useState<string | null>(null);

  const renderContent = () => {
    if (funnel) {
      return <MarketingChatbot funnelType={funnel} onBack={() => setFunnel(null)} />;
    }
    return <LandingPage onSelectFunnel={setFunnel} />;
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 min-h-screen flex items-center justify-center font-sans p-4">
      {renderContent()}
    </div>
  );
}
