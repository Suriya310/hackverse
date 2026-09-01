export type TabType = 
  | 'dashboard' 
  | 'committee' 
  | 'portfolio' 
  | 'watchlist' 
  | 'signals' 
  | 'research' 
  | 'activity' 
  | 'profile';

export type SignalType = 'BULLISH' | 'POSITIVE' | 'NEUTRAL' | 'WARNING' | 'BEARISH';

export type VerdictType = 'STRONG_BUY' | 'BUY' | 'ACCUMULATE' | 'HOLD' | 'WATCH' | 'REDUCE' | 'SELL';

export type AgentId = 'technical' | 'fundamental' | 'sentiment' | 'risk';

export interface TimelineStep {
  step: number;
  title: string;
  description: string;
  status: 'completed' | 'running' | 'warning' | 'skipped';
  timestamp?: string;
  metric?: string;
}

export interface DocumentSource {
  id: string;
  title: string;
  type: 'Financial Filing' | 'Earnings Transcript' | 'SEBI Filing' | 'Analyst Note' | 'News Release';
  relevance: number; // e.g. 94
  date: string;
  excerpt: string;
  fullDocText?: string;
  verified: boolean;
  citationKey: string;
}

export interface AgentOutput {
  id: AgentId;
  name: string;
  role: string;
  iconName: string;
  status: 'Analysis Complete' | 'Risk Detected' | 'Degraded Data' | 'In Progress';
  signal: SignalType;
  signalLabel: string;
  confidence: number; // e.g. 82
  metrics: {
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'neutral';
    highlight?: boolean;
  }[];
  inputData: {
    label: string;
    value: string;
  }[];
  timeline: TimelineStep[];
  conclusion: string;
  sources: DocumentSource[];
  isAvailable?: boolean;
  unavailableReason?: string;
}

export interface BullBearCase {
  bullCase: {
    score: number;
    points: string[];
  };
  bearCase: {
    score: number;
    points: string[];
  };
  resolution: string;
}

export interface PortfolioImpact {
  investmentAmount: number;
  stockSymbol: string;
  before: {
    portfolioValue: number;
    sectorExposure: number; // percentage
    riskScore: number;
    diversification: number;
  };
  after: {
    portfolioValue: number;
    sectorExposure: number;
    riskScore: number;
    diversification: number;
  };
}

export interface CommitteeVerdict {
  verdict: VerdictType;
  verdictLabel: string;
  confidence: number;
  likes: string[];
  concerns: string[];
  aiExplanation: string;
  personalization: {
    riskProfile: string;
    investmentHorizon: string;
    currentSectorExposure: string;
    maxSingleStockCap: string;
  };
  bullBear: BullBearCase;
  portfolioImpact: PortfolioImpact;
}

export interface StockInfo {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sector: string;
  marketCap: string;
  peRatio: number;
  rsi: number;
  volumeChange: string;
  high52w: number;
  low52w: number;
  currency: string;
}

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  aiSignal: SignalType;
  weight: number;
}

export interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  aiSignal: SignalType;
  confidence: number;
  risk: 'Low' | 'Moderate' | 'High';
  lastAnalyzed: string;
  sector: string;
}

export interface UserRiskProfile {
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  horizon: string;
  preferredSectors: string[];
  maxAllocation: number; // e.g. 20%
  riskScore: number; // 68
  itExposure: number; // 35%
  bankingExposure: number;
  energyExposure: number;
  consumerExposure: number;
}

export interface AnalysisQuestion {
  stockSymbol: string;
  investmentAmount: number;
  customQuery?: string;
}

export interface MarketIntelligenceData {
  momentum: Array<{ symbol: string; signal: string; color: string; change: string; rsi: number }>;
  volumeAnomalies: Array<{ symbol: string; volume: string; currentVol: string; avgVol: string }>;
  sentimentShifts: Array<{ sector: string; sentiment: string; trend: string; status: string }>;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  stockSymbol: string;
  amount: number;
  verdict: VerdictType;
  confidence: number;
  keyDrivers: string;
}
