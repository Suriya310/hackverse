import React, { useState } from 'react';
import { TabType, UserRiskProfile } from './types';
import { INITIAL_USER_PROFILE } from './data/mockData';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './components/dashboard/DashboardView';
import { AICommitteeView } from './components/committee/AICommitteeView';
import { PortfolioView } from './components/portfolio/PortfolioView';
import { WatchlistView } from './components/watchlist/WatchlistView';
import { MarketSignalsView } from './components/signals/MarketSignalsView';
import { RiskProfileView } from './components/profile/RiskProfileView';
import { ResearchView } from './components/research/ResearchView';
import { ActivityView } from './components/activity/ActivityView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [currentStock, setCurrentStock] = useState<string>('TCS');
  const [investmentAmount, setInvestmentAmount] = useState<number>(50000);
  const [userProfile, setUserProfile] = useState<UserRiskProfile>(INITIAL_USER_PROFILE);
  const [isDegraded, setIsDegraded] = useState<boolean>(false);

  const handleAnalyzeStock = (symbol: string, amount: number = 50000) => {
    setCurrentStock(symbol);
    setInvestmentAmount(amount);
    setCurrentTab('committee');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchStock = (symbol: string) => {
    setCurrentStock(symbol);
    setCurrentTab('committee');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="investai-app-root" className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col antialiased">
      <div className="flex flex-1 min-h-screen">
        {/* Left Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          userProfile={userProfile}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-b from-[#090e1a] via-[#070b14] to-[#05080f]">
          {/* Header */}
          <Header
            onSearchStock={handleSearchStock}
            isDegraded={isDegraded}
            onToggleDegraded={setIsDegraded}
            currentStock={currentStock}
          />

          {/* Active View Router */}
          <main className="flex-1 pb-16">
            {currentTab === 'dashboard' && (
              <DashboardView
                onNavigateTab={setCurrentTab}
                onAnalyzeStock={handleAnalyzeStock}
                userProfile={userProfile}
              />
            )}

            {currentTab === 'committee' && (
              <AICommitteeView
                currentStockSymbol={currentStock}
                investmentAmount={investmentAmount}
                userProfile={userProfile}
                isDegraded={isDegraded}
                onStockChange={(sym) => setCurrentStock(sym)}
                onAmountChange={(amt) => setInvestmentAmount(amt)}
                onToggleDegraded={setIsDegraded}
              />
            )}

            {currentTab === 'portfolio' && (
              <PortfolioView onAnalyzeStock={handleAnalyzeStock} />
            )}

            {currentTab === 'watchlist' && (
              <WatchlistView onAnalyzeStock={handleAnalyzeStock} />
            )}

            {currentTab === 'signals' && (
              <MarketSignalsView onAnalyzeStock={handleAnalyzeStock} />
            )}

            {currentTab === 'research' && <ResearchView />}

            {currentTab === 'activity' && (
              <ActivityView onAnalyzeStock={handleAnalyzeStock} />
            )}

            {currentTab === 'profile' && (
              <RiskProfileView
                userProfile={userProfile}
                onUpdateProfile={(updated) => setUserProfile(updated)}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
