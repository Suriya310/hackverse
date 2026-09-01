import {
  StockInfo,
  Holding,
  WatchlistItem,
  UserRiskProfile,
  AgentOutput,
  CommitteeVerdict,
  DocumentSource,
  ActivityLog,
} from '../types';

export const INITIAL_USER_PROFILE: UserRiskProfile = {
  riskTolerance: 'Moderate',
  horizon: '5–10 years',
  preferredSectors: ['Technology', 'Banking', 'Consumer'],
  maxAllocation: 20,
  riskScore: 68,
  itExposure: 35,
  bankingExposure: 30,
  energyExposure: 20,
  consumerExposure: 15,
};

export const STOCKS_DATABASE: Record<string, StockInfo> = {
  TCS: {
    symbol: 'TCS',
    name: 'Tata Consultancy Services Ltd.',
    price: 3680,
    change: 100.40,
    changePercent: 2.80,
    sector: 'IT Services & Software',
    marketCap: '₹13.4L Cr',
    peRatio: 28.4,
    rsi: 61,
    volumeChange: '+18%',
    high52w: 4254,
    low52w: 3312,
    currency: '₹',
  },
  INFY: {
    symbol: 'INFY',
    name: 'Infosys Limited',
    price: 1580,
    change: 24.20,
    changePercent: 1.55,
    sector: 'IT Services & Software',
    marketCap: '₹6.5L Cr',
    peRatio: 24.1,
    rsi: 55,
    volumeChange: '+8%',
    high52w: 1953,
    low52w: 1358,
    currency: '₹',
  },
  RELIANCE: {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    price: 2550,
    change: 32.50,
    changePercent: 1.29,
    sector: 'Oil, Gas & Retail',
    marketCap: '₹17.2L Cr',
    peRatio: 25.8,
    rsi: 58,
    volumeChange: '+12%',
    high52w: 3024,
    low52w: 2220,
    currency: '₹',
  },
  HDFC: {
    symbol: 'HDFC',
    name: 'HDFC Bank Limited',
    price: 1385,
    change: -14.30,
    changePercent: -1.02,
    sector: 'Private Banking',
    marketCap: '₹10.5L Cr',
    peRatio: 18.2,
    rsi: 44,
    volumeChange: '-4%',
    high52w: 1794,
    low52w: 1363,
    currency: '₹',
  },
  ITC: {
    symbol: 'ITC',
    name: 'ITC Limited',
    price: 432,
    change: 3.10,
    changePercent: 0.72,
    sector: 'Consumer FMCG',
    marketCap: '₹5.4L Cr',
    peRatio: 26.5,
    rsi: 52,
    volumeChange: '+5%',
    high52w: 528,
    low52w: 399,
    currency: '₹',
  },
  ICICI: {
    symbol: 'ICICI',
    name: 'ICICI Bank Limited',
    price: 1220,
    change: 18.60,
    changePercent: 1.55,
    sector: 'Private Banking',
    marketCap: '₹8.6L Cr',
    peRatio: 17.4,
    rsi: 63,
    volumeChange: '+14%',
    high52w: 1334,
    low52w: 928,
    currency: '₹',
  },
};

export const INITIAL_HOLDINGS: Holding[] = [
  {
    id: 'h1',
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    sector: 'Technology',
    quantity: 20,
    avgPrice: 3420,
    currentPrice: 3680,
    pnl: 5200,
    pnlPercent: 7.6,
    aiSignal: 'BULLISH',
    weight: 15.2,
  },
  {
    id: 'h2',
    symbol: 'INFY',
    name: 'Infosys Limited',
    sector: 'Technology',
    quantity: 15,
    avgPrice: 1520,
    currentPrice: 1580,
    pnl: 900,
    pnlPercent: 3.9,
    aiSignal: 'NEUTRAL',
    weight: 19.8,
  },
  {
    id: 'h3',
    symbol: 'HDFC',
    name: 'HDFC Bank Ltd',
    sector: 'Banking',
    quantity: 25,
    avgPrice: 1420,
    currentPrice: 1385,
    pnl: -875,
    pnlPercent: -2.4,
    aiSignal: 'WARNING',
    weight: 29.5,
  },
  {
    id: 'h4',
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    sector: 'Energy & Retail',
    quantity: 10,
    avgPrice: 2480,
    currentPrice: 2550,
    pnl: 700,
    pnlPercent: 2.8,
    aiSignal: 'BULLISH',
    weight: 20.5,
  },
  {
    id: 'h5',
    symbol: 'ITC',
    name: 'ITC Limited',
    sector: 'Consumer Goods',
    quantity: 35,
    avgPrice: 410,
    currentPrice: 432,
    pnl: 770,
    pnlPercent: 5.3,
    aiSignal: 'POSITIVE',
    weight: 15.0,
  }
];

export const WATCHLIST_DATA: WatchlistItem[] = [
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    price: 3680,
    change: 100.40,
    changePercent: 2.80,
    aiSignal: 'BULLISH',
    confidence: 82,
    risk: 'Moderate',
    lastAnalyzed: '2 mins ago',
    sector: 'IT Services',
  },
  {
    symbol: 'INFY',
    name: 'Infosys Limited',
    price: 1580,
    change: 24.20,
    changePercent: 1.55,
    aiSignal: 'NEUTRAL',
    confidence: 68,
    risk: 'Moderate',
    lastAnalyzed: '15 mins ago',
    sector: 'IT Services',
  },
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    price: 2550,
    change: 32.50,
    changePercent: 1.29,
    aiSignal: 'BULLISH',
    confidence: 85,
    risk: 'Low',
    lastAnalyzed: '42 mins ago',
    sector: 'Conglomerate',
  },
  {
    symbol: 'HDFC BANK',
    name: 'HDFC Bank Limited',
    price: 1385,
    change: -14.30,
    changePercent: -1.02,
    aiSignal: 'WARNING',
    confidence: 71,
    risk: 'Moderate',
    lastAnalyzed: '1 hour ago',
    sector: 'Banking',
  },
  {
    symbol: 'ITC',
    name: 'ITC Limited',
    price: 432,
    change: 3.10,
    changePercent: 0.72,
    aiSignal: 'POSITIVE',
    confidence: 79,
    risk: 'Low',
    lastAnalyzed: '3 hours ago',
    sector: 'FMCG',
  },
  {
    symbol: 'ICICI BANK',
    name: 'ICICI Bank Limited',
    price: 1220,
    change: 18.60,
    changePercent: 1.55,
    aiSignal: 'BULLISH',
    confidence: 88,
    risk: 'Low',
    lastAnalyzed: '4 hours ago',
    sector: 'Banking',
  },
];

export const TCS_EVIDENCE_DOCS: DocumentSource[] = [
  {
    id: 'doc-1',
    title: 'Q4 FY26 Audited Earnings Report',
    type: 'Financial Filing',
    relevance: 94,
    date: 'Apr 12, 2026',
    excerpt: 'Consolidated revenue for the quarter increased 11.2% year-over-year to ₹64,479 Cr. Operating margin expanded by 38 bps to 26.0% supported by enterprise AI cloud deals.',
    fullDocText: `TATA CONSULTANCY SERVICES LIMITED
FINANCIAL RESULTS FOR THE QUARTER AND YEAR ENDED MARCH 31, 2026

Highlights:
1. Revenue at ₹64,479 Crore ($7.75 Bn), YoY growth of +11.2%.
2. Constant currency revenue growth of +8.8% YoY driven by North American BFSI and European manufacturing transformation mandates.
3. Operating Margin expanded by 38 bps YoY to 26.0%; Net Margin stood at 19.8%.
4. Total Contract Value (TCV) signed during Q4 was $13.2 Billion with major enterprise GenAI engagements.
5. Headcount additions turned positive with 5,800 net additions in the second half of FY26.
6. Board recommended a final dividend of ₹28 per equity share.`,
    verified: true,
    citationKey: 'Source: Q4 FY26 Earnings Report (p. 4)',
  },
  {
    id: 'doc-2',
    title: 'Recent Earnings Call Transcript & Management Q&A',
    type: 'Earnings Transcript',
    relevance: 87,
    date: 'Apr 14, 2026',
    excerpt: 'CEO commentary on enterprise tech spending: "We are witnessing accelerated demand across Tier-1 banking clients for cloud modernization, while discretionary consulting continues steady recovery."',
    fullDocText: `TCS Q4 FY26 INVESTOR EARNINGS CONFERENCE CALL
Executive Commentary & Analyst Q&A

K. Krithivasan (CEO & MD):
"Clients are shifting from experimental AI pilots into large-scale production deployments. Our GenAI pipeline now exceeds $1.8 Billion. While discretionary non-critical IT projects faced scrutiny earlier, our core services pipeline remains exceptionally robust with multi-year renewals."

Samir Seksaria (CFO):
"We maintain our aspirational operating margin band of 26-28% through disciplined operational levers, pyramid rationalization, and automation."`,
    verified: true,
    citationKey: 'Source: Q4 FY26 Earnings Transcript (Line 42)',
  },
  {
    id: 'doc-3',
    title: 'SEBI Regulatory Disclosure: Multi-Year BFSI Contract',
    type: 'SEBI Filing',
    relevance: 81,
    date: 'May 02, 2026',
    excerpt: 'Regulatory filing under Regulation 30: Executed $1.2B digital transformation agreement with leading global custodian bank spanning a 7-year implementation lifecycle.',
    fullDocText: `DISCLOSURE UNDER REGULATION 30 OF SEBI (LODR) REGULATIONS, 2015

To: BSE Limited & National Stock Exchange of India Ltd.
Subject: Material Event - Multi-Year Commercial Engagement

This is to inform that Tata Consultancy Services has entered into a strategic digital modernization partnership with a premier North American Financial Institution.
- Contract Value: USD 1.2 Billion
- Duration: 7 Years
- Scope: Cloud migration, microservices architecture, automated compliance surveillance platform.`,
    verified: true,
    citationKey: 'Source: SEBI Filing Ref SEBI/LODR/2026/0582',
  },
  {
    id: 'doc-4',
    title: 'Consensus Brokerage & Institutional Research Note',
    type: 'Analyst Note',
    relevance: 78,
    date: 'May 10, 2026',
    excerpt: 'Consensus rating: 28 Buy, 12 Hold, 4 Sell. Average 12-month target price set at ₹4,150 (+12.7% upside) citing margin defensibility and dividend yield support.',
    fullDocText: `INSTITUTIONAL EQUITY RESEARCH — SECTOR UPDATE: INDIAN IT

Key Takeaways:
- Valuation multiple trades at 28.4x 1-yr forward EPS, which is at a 7% premium to 5-year historical average, reflecting superior return on equity (ROE > 44%).
- Downside risk is cushioned by strong net cash position (₹44,000 Cr) and consistent payout ratio exceeding 80%.`,
    verified: true,
    citationKey: 'Source: Institutional Consensus Research Note',
  }
];

export function getStockAnalysis(
  symbol: string = 'TCS',
  amount: number = 50000,
  profile: UserRiskProfile = INITIAL_USER_PROFILE,
  isDegraded: boolean = false
): {
  agents: AgentOutput[];
  verdict: CommitteeVerdict;
  stock: StockInfo;
  sources: DocumentSource[];
} {
  const stock = STOCKS_DATABASE[symbol] || STOCKS_DATABASE['TCS'];
  const sources: DocumentSource[] = symbol === 'TCS' ? TCS_EVIDENCE_DOCS : [
    {
      id: 'doc-gen-1',
      title: `${stock.symbol} Q4 FY26 Financial Results`,
      type: 'Financial Filing' as const,
      relevance: 92,
      date: 'May 2026',
      excerpt: `Reported annual revenue expansion with steady EBITDA margins in ${stock.sector}.`,
      fullDocText: `Official filing for ${stock.name} showing positive operating leverage and steady cashflow generation.`,
      verified: true,
      citationKey: `Source: ${stock.symbol} Annual Disclosure`,
    },
    ...TCS_EVIDENCE_DOCS.slice(1),
  ];

  // Agent 1: Technical Analyst
  const technicalAgent: AgentOutput = {
    id: 'technical',
    name: 'Technical Analyst',
    role: 'Price Action, Momentum, RSI & Trend Wave Engine',
    iconName: 'TrendingUp',
    status: 'Analysis Complete',
    signal: 'BULLISH',
    signalLabel: 'BULLISH',
    confidence: 82,
    metrics: [
      { label: 'Momentum', value: 'Strong', highlight: true, trend: 'up' },
      { label: 'RSI (14D)', value: stock.rsi.toString(), trend: 'up' },
      { label: 'Volume Trend', value: stock.volumeChange, highlight: true, trend: 'up' },
      { label: 'Trend Direction', value: 'Upward', trend: 'up' },
    ],
    inputData: [
      { label: 'Current Price', value: `₹${stock.price.toLocaleString('en-IN')}` },
      { label: '30D Return', value: `+${(stock.changePercent * 3.4).toFixed(1)}%` },
      { label: 'RSI (14)', value: stock.rsi.toString() },
      { label: 'Moving Avg (50 DMA)', value: `₹${(stock.price * 0.96).toFixed(0)}` },
      { label: '20D Volume Surge', value: stock.volumeChange },
    ],
    timeline: [
      { step: 1, title: 'Market data retrieved', description: 'Streamed live tick feeds & tick-by-tick order book depth via NSE', status: 'completed', timestamp: '10:00:01' },
      { step: 2, title: 'Technical indicators calculated', description: `RSI-14 at ${stock.rsi}, MACD golden cross verified above zero line`, status: 'completed', timestamp: '10:00:02' },
      { step: 3, title: 'Momentum detected', description: 'Strong multi-session upward impulse with high buyer aggression', status: 'completed', timestamp: '10:00:03' },
      { step: 4, title: 'Volume anomaly identified', description: `${stock.volumeChange} above 20-day moving average confirmation`, status: 'completed', timestamp: '10:00:04' },
      { step: 5, title: 'Signal classified', description: 'High probability bullish continuation pattern within Bollinger channels', status: 'completed', timestamp: '10:00:05' },
      { step: 6, title: 'Confidence calculated', description: 'Ensemble score calculated across 12 quantitative models at 82%', status: 'completed', timestamp: '10:00:06' },
    ],
    conclusion: 'Strong positive momentum supported by increasing volume and an upward short-term trend.',
    sources: [sources[0]],
  };

  // Agent 2: Fundamental Analyst
  const fundamentalAgent: AgentOutput = isDegraded ? {
    id: 'fundamental',
    name: 'Fundamental Analyst',
    role: 'Financial Statements, Earnings, Margins & Valuation',
    iconName: 'Building2',
    status: 'Degraded Data',
    signal: 'NEUTRAL',
    signalLabel: 'DATA UNAVAILABLE',
    confidence: 35,
    isAvailable: false,
    unavailableReason: 'Live SEBI quarterly XBRL feeds temporarily offline for maintenance.',
    metrics: [
      { label: 'Revenue Growth', value: 'N/A' },
      { label: 'EPS Growth', value: 'N/A' },
      { label: 'Operating Margin', value: 'N/A' },
      { label: 'P/E Valuation', value: `${stock.peRatio}x` },
    ],
    inputData: [
      { label: 'Audited Statement', value: 'Awaiting Feed' },
      { label: 'Trailing P/E', value: `${stock.peRatio}x` },
      { label: 'ROCE', value: 'Pending' },
    ],
    timeline: [
      { step: 1, title: 'Connecting to regulatory repository', description: 'Attempting connection to SEBI Edgar API', status: 'warning', timestamp: '10:00:01' },
      { step: 2, title: 'Parsing quarterly filings', description: 'XBRL parse timed out after 3 retries', status: 'warning', timestamp: '10:00:03' },
      { step: 3, title: 'Fallback to historical snapshots', description: 'Fundamental analysis degraded to safeguard compliance', status: 'warning', timestamp: '10:00:05' },
    ],
    conclusion: 'Fundamental data stream temporarily unavailable. The committee suppresses unverified claims until valid filings arrive.',
    sources: [],
  } : {
    id: 'fundamental',
    name: 'Fundamental Analyst',
    role: 'Financial Statements, Earnings, Margins & Valuation',
    iconName: 'Building2',
    status: 'Analysis Complete',
    signal: 'POSITIVE',
    signalLabel: 'POSITIVE',
    confidence: 76,
    metrics: [
      { label: 'Revenue Growth', value: '+11%', highlight: true, trend: 'up' },
      { label: 'EPS Growth', value: '+8%', trend: 'up' },
      { label: 'Operating Margin', value: '26% Stable', trend: 'neutral' },
      { label: 'Valuation', value: 'Moderate (28.4x)', trend: 'neutral' },
    ],
    inputData: [
      { label: 'Revenue (Q4)', value: '₹64,479 Cr (+11.2%)' },
      { label: 'EBIT Margin', value: '26.0% (+38 bps YoY)' },
      { label: 'Free Cash Flow', value: '₹11,200 Cr' },
      { label: 'P/E vs 5Y Mean', value: '28.4x (7% premium)' },
      { label: 'Dividend Yield', value: '2.4%' },
    ],
    timeline: [
      { step: 1, title: 'Audited Q4 financial statements retrieved', description: 'Extracted income statement and cash flows from verified filings', status: 'completed', timestamp: '10:00:01' },
      { step: 2, title: 'Growth metrics normalized', description: 'Revenue grew +11% YoY; operating cash flow conversion at 104%', status: 'completed', timestamp: '10:00:02' },
      { step: 3, title: 'Margin sustainability analyzed', description: 'Operating margin stable at 26.0% with strong enterprise pricing power', status: 'completed', timestamp: '10:00:03' },
      { step: 4, title: 'Valuation multiple compared', description: 'Trading at 28.4x P/E; reasonable relative to high ROE profile', status: 'completed', timestamp: '10:00:04' },
      { step: 5, title: 'Fundamental score synthesized', description: 'Solid fundamentals confirm healthy operational foundation', status: 'completed', timestamp: '10:00:05' },
    ],
    conclusion: 'Robust financial foundation marked by double-digit revenue expansion, healthy operating cash flows, and defensible margins.',
    sources: [sources[0], sources[1]],
  };

  // Agent 3: Sentiment Analyst
  const sentimentAgent: AgentOutput = {
    id: 'sentiment',
    name: 'Sentiment Analyst',
    role: 'News Sentiment, Social Alpha & Analyst Consensus',
    iconName: 'MessageSquareText',
    status: 'Analysis Complete',
    signal: 'NEUTRAL',
    signalLabel: 'NEUTRAL',
    confidence: 64,
    metrics: [
      { label: 'News Sentiment', value: '+0.18 (Mild Pos)', trend: 'up' },
      { label: 'Analyst Sentiment', value: 'Neutral (Hold bias)', trend: 'neutral' },
      { label: 'Social Sentiment', value: 'Positive (+62%)', trend: 'up' },
      { label: 'Headlines Analyzed', value: '148 Articles' },
    ],
    inputData: [
      { label: 'Financial News Feed', value: '148 articles (72% bullish / 28% cautious)' },
      { label: 'Social Velocity', value: '+34% mention surge on AI deals' },
      { label: 'Analyst Revisions', value: '4 Upgrades, 2 Downgrades this quarter' },
      { label: 'Institutional Flow', value: '₹185 Cr net FII inflow in 5 days' },
    ],
    timeline: [
      { step: 1, title: 'Indexed 148 verified media articles', description: 'Scanned Bloomberg, Reuters, Economic Times and Mint feeds', status: 'completed', timestamp: '10:00:01' },
      { step: 2, title: 'Sentiment polarity computed', description: 'Net score +0.18 indicating cautious optimism on US IT budget spend', status: 'completed', timestamp: '10:00:02' },
      { step: 3, title: 'Analyst consensus parsed', description: 'Consensus target ₹4,150 indicates +12.7% potential upside', status: 'completed', timestamp: '10:00:03' },
      { step: 4, title: 'Retail social buzz weighed', description: 'Positive enthusiasm on recent multi-year deal announcements', status: 'completed', timestamp: '10:00:04' },
      { step: 5, title: 'Sentiment signal unified', description: 'Overall balanced/neutral climate with positive bias', status: 'completed', timestamp: '10:00:05' },
    ],
    conclusion: 'Market sentiment is mildly positive across media but tempered by conservative institutional analyst upgrades.',
    sources: [sources[1], sources[3]],
  };

  // Agent 4: Risk Analyst
  const riskAgent: AgentOutput = {
    id: 'risk',
    name: 'Risk Analyst',
    role: 'Portfolio Exposure, Sector Concentration & Drawdown Risk',
    iconName: 'ShieldAlert',
    status: 'Risk Detected',
    signal: 'WARNING',
    signalLabel: 'WARNING',
    confidence: 81,
    metrics: [
      { label: 'IT Exposure', value: `${profile.itExposure}%`, highlight: true, trend: 'down' },
      { label: 'Concentration Risk', value: 'High (>30% Cap)', highlight: true, trend: 'down' },
      { label: 'Portfolio Risk', value: 'Moderate (68/100)' },
      { label: 'Drawdown Est.', value: '-7.2% max 1Y' },
    ],
    inputData: [
      { label: 'Current Portfolio IT Share', value: `${profile.itExposure}% (₹1,68,875 of ₹4,82,500)` },
      { label: 'Simulated Purchase Amount', value: `₹${amount.toLocaleString('en-IN')}` },
      { label: 'Post-Trade IT Exposure', value: `${Math.round(((profile.itExposure * 4825 + amount) / (482500 + amount)) * 100)}%` },
      { label: 'Investor Risk Tolerance', value: profile.riskTolerance },
      { label: 'Recommended Sector Ceiling', value: '25.0%' },
    ],
    timeline: [
      { step: 1, title: 'Loaded investor portfolio weights', description: `Identified ₹1,68,875 already allocated to IT equities (${profile.itExposure}%)`, status: 'completed', timestamp: '10:00:01' },
      { step: 2, title: 'Simulated capital addition', description: `Adding ₹${amount.toLocaleString('en-IN')} pushes sector concentration over recommended ceiling`, status: 'warning', timestamp: '10:00:02' },
      { step: 3, title: 'Evaluated single-stock correlation', description: 'High correlation with existing INFY position in tech cluster', status: 'warning', timestamp: '10:00:03' },
      { step: 4, title: 'Assessed investor risk mandate', description: `${profile.riskTolerance} risk profile mandates diversification guardrails`, status: 'completed', timestamp: '10:00:04' },
      { step: 5, title: 'Risk flag issued', description: 'Concentration warning triggered: Committee should avoid strong BUY rating', status: 'warning', timestamp: '10:00:05' },
    ],
    conclusion: `Your portfolio already carries heavy ${profile.itExposure}% exposure to IT. Adding ₹${amount.toLocaleString('en-IN')} increases sector concentration above prudent risk boundaries.`,
    sources: [sources[2]],
  };

  const agents = [technicalAgent, fundamentalAgent, sentimentAgent, riskAgent];

  // Calculate Impact
  const beforeVal = 482500;
  const afterVal = beforeVal + amount;
  const currentITMoney = (profile.itExposure / 100) * beforeVal;
  const afterITMoney = (symbol === 'TCS' || symbol === 'INFY') ? currentITMoney + amount : currentITMoney;
  const afterITPercent = Math.round((afterITMoney / afterVal) * 100);
  
  const beforeRisk = profile.riskScore;
  const afterRisk = (symbol === 'TCS' || symbol === 'INFY') 
    ? Math.min(95, beforeRisk + Math.round((amount / 50000) * 6))
    : Math.max(50, beforeRisk - 2);

  const beforeDiv = 78;
  const afterDiv = (symbol === 'TCS' || symbol === 'INFY')
    ? Math.max(40, beforeDiv - Math.round((amount / 50000) * 9))
    : Math.min(88, beforeDiv + 4);

  const finalConfidence = isDegraded ? 67 : 78;

  const verdict: CommitteeVerdict = {
    verdict: 'WATCH',
    verdictLabel: 'HOLD / WATCH',
    confidence: finalConfidence,
    likes: [
      'Strong technical momentum with +18% volume confirmation',
      'Positive revenue growth (+11% YoY) and solid 26% operating margins',
      'Increasing institutional order volume and resilient enterprise AI pipeline',
    ],
    concerns: [
      `High existing IT sector exposure (${profile.itExposure}% of current portfolio)`,
      'Valuation multiple (28.4x P/E) trades at premium requiring entry discipline',
      'Market sentiment remains mixed on discretionary US tech corporate budgets',
    ],
    aiExplanation: `${stock.symbol} currently shows positive technical and fundamental signals. However, your portfolio already has significant exposure to the IT sector (${profile.itExposure}%). Investing another ₹${amount.toLocaleString('en-IN')} would increase concentration risk to ${afterITPercent}%. Based on your ${profile.riskTolerance} Risk profile, the committee recommends WATCH rather than immediately adding to the position.`,
    personalization: {
      riskProfile: profile.riskTolerance,
      investmentHorizon: profile.horizon,
      currentSectorExposure: `${profile.itExposure}%`,
      maxSingleStockCap: `${profile.maxAllocation}%`,
    },
    bullBear: {
      bullCase: {
        score: 68,
        points: [
          'Strong momentum with RSI at 61 breaking past 50 DMA resistance',
          'Positive earnings growth (+11% YoY) backed by $13.2B quarterly TCV contract bookings',
          'Volume confirmation (+18% spike) showing sustained institutional accumulation',
          'Robust dividend yield (2.4%) provides strong downside floor',
        ],
      },
      bearCase: {
        score: 42,
        points: [
          'High user portfolio sector concentration (IT would reach 44%)',
          'Mixed news & macro sentiment regarding global enterprise discretionary spending',
          'Valuation trading near top of 5-year historical PE band',
          'Currency fluctuation risks impacting near-term margin expansion',
        ],
      },
      resolution: 'Bull case wins on fundamental strength, but portfolio concentration prevents a strong BUY recommendation.',
    },
    portfolioImpact: {
      investmentAmount: amount,
      stockSymbol: stock.symbol,
      before: {
        portfolioValue: beforeVal,
        sectorExposure: profile.itExposure,
        riskScore: beforeRisk,
        diversification: beforeDiv,
      },
      after: {
        portfolioValue: afterVal,
        sectorExposure: afterITPercent,
        riskScore: afterRisk,
        diversification: afterDiv,
      },
    },
  };

  return {
    agents,
    verdict,
    stock,
    sources,
  };
}

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    timestamp: 'Today, 09:45 AM',
    stockSymbol: 'TCS',
    amount: 50000,
    verdict: 'WATCH',
    confidence: 78,
    keyDrivers: 'Strong technical momentum restrained by 35% IT sector concentration alert.',
  },
  {
    id: 'act-2',
    timestamp: 'Yesterday, 03:15 PM',
    stockSymbol: 'RELIANCE',
    amount: 75000,
    verdict: 'BUY',
    confidence: 85,
    keyDrivers: 'Retail expansion numbers strong + Diversified energy basket lowered portfolio risk.',
  },
  {
    id: 'act-3',
    timestamp: '28 Aug, 11:20 AM',
    stockSymbol: 'HDFC',
    amount: 100000,
    verdict: 'HOLD',
    confidence: 71,
    keyDrivers: 'NIM compression fears flagged by Fundamental Agent; awaiting next rate cycle.',
  },
  {
    id: 'act-4',
    timestamp: '25 Aug, 02:30 PM',
    stockSymbol: 'INFY',
    amount: 25000,
    verdict: 'WATCH',
    confidence: 68,
    keyDrivers: 'Portfolio concentration threshold reached for Tech sector.',
  },
];

export const MARKET_INTELLIGENCE_DATA = {
  momentum: [
    { symbol: 'TCS', signal: 'Strong', color: 'emerald', change: '+2.80%', rsi: 61 },
    { symbol: 'INFY', signal: 'Positive', color: 'emerald', change: '+1.55%', rsi: 55 },
    { symbol: 'HDFC', signal: 'Neutral', color: 'amber', change: '-1.02%', rsi: 44 },
    { symbol: 'RELIANCE', signal: 'Strong', color: 'emerald', change: '+1.29%', rsi: 58 },
    { symbol: 'ICICI', signal: 'Strong', color: 'emerald', change: '+1.55%', rsi: 63 },
    { symbol: 'ITC', signal: 'Positive', color: 'emerald', change: '+0.72%', rsi: 52 },
  ],
  volumeAnomalies: [
    { symbol: 'TCS', volume: '+18% unusual volume', currentVol: '4.2M shares', avgVol: '3.5M shares' },
    { symbol: 'RELIANCE', volume: '+12% unusual volume', currentVol: '6.8M shares', avgVol: '6.0M shares' },
    { symbol: 'ICICI BANK', volume: '+14% unusual volume', currentVol: '14.1M shares', avgVol: '12.3M shares' },
    { symbol: 'BHARTIARTL', volume: '+9% unusual volume', currentVol: '8.4M shares', avgVol: '7.7M shares' },
  ],
  sentimentShifts: [
    { sector: 'IT Sector', sentiment: 'Improving', trend: '+0.24 polarity', status: 'positive' },
    { sector: 'Banking & Financials', sentiment: 'Neutral', trend: '-0.05 polarity', status: 'neutral' },
    { sector: 'Auto & Mobility', sentiment: 'Strong Bullish', trend: '+0.42 polarity', status: 'positive' },
    { sector: 'Energy & Utilities', sentiment: 'Stable', trend: '+0.10 polarity', status: 'neutral' },
  ],
};

export const PORTFOLIO_PERFORMANCE_HISTORY = [
  { time: '09:15', value: 470070 },
  { time: '10:00', value: 472400 },
  { time: '11:00', value: 475100 },
  { time: '12:00', value: 473800 },
  { time: '13:00', value: 478200 },
  { time: '14:00', value: 480100 },
  { time: '15:00', value: 481900 },
  { time: '15:30', value: 482500 },
];
