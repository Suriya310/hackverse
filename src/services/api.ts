import {
  AgentOutput,
  CommitteeVerdict,
  DocumentSource,
  StockInfo,
  UserRiskProfile,
  ActivityLog,
  PortfolioImpact,
  MarketIntelligenceData,
  WatchlistItem,
} from '../types';
import {
  getStockAnalysis,
  STOCKS_DATABASE,
  MARKET_INTELLIGENCE_DATA,
  WATCHLIST_DATA,
  TCS_EVIDENCE_DOCS,
  INITIAL_USER_PROFILE,
} from '../data/mockData';

export interface CommitteeAnalysisResponse {
  stock: StockInfo;
  agents: AgentOutput[];
  verdict: CommitteeVerdict;
  sources: DocumentSource[];
  aiEnhanced?: boolean;
  auditLogId?: string;
  isMocked?: boolean;
  latencyMs?: number;
}

export interface MockFetcherOptions {
  minLatencyMs?: number;
  maxLatencyMs?: number;
  errorProbability?: number; // 0.0 to 1.0 (e.g., 0.10 for 10% chance)
  forcedErrorType?: 'TIMEOUT' | 'SERVER_503' | 'RATE_LIMIT_429' | 'NETWORK_ERROR' | null;
  enableStreamProgress?: boolean;
}

export interface AsyncAgentArrivalEvent {
  step: 'INITIALIZING' | 'AGENT_ARRIVED' | 'SYNTHESIS' | 'COMPLETE';
  agentIndex?: number;
  agent?: AgentOutput;
  partialAgents: AgentOutput[];
  progressPercent: number;
  message: string;
}

/**
 * Utility helper to simulate variable asynchronous network latency.
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generic mock fetcher that simulates realistic network latency (e.g., 800-1500ms),
 * network jitter, and randomized failure states to test error handling in the UI.
 */
export async function mockFetcher<T>(
  dataGenerator: () => T,
  options: MockFetcherOptions = {}
): Promise<T> {
  const {
    minLatencyMs = 800,
    maxLatencyMs = 1500,
    errorProbability = 0.08, // 8% randomized failure rate for UI error testing
    forcedErrorType = null,
  } = options;

  // Calculate random jitter latency between minLatencyMs and maxLatencyMs
  const latency =
    Math.floor(Math.random() * (maxLatencyMs - minLatencyMs + 1)) + minLatencyMs;
  await delay(latency);

  // Trigger randomized failure state or forced error
  if (forcedErrorType || (errorProbability > 0 && Math.random() < errorProbability)) {
    const errorType =
      forcedErrorType ||
      (Math.random() < 0.4
        ? 'SERVER_503'
        : Math.random() < 0.7
        ? 'TIMEOUT'
        : 'NETWORK_ERROR');

    switch (errorType) {
      case 'TIMEOUT':
        throw new Error('InvestAI Gateway Timeout (504): Downstream financial data feed timed out after ' + latency + 'ms.');
      case 'SERVER_503':
        throw new Error('InvestAI Service Unavailable (503): High demand on quantitative financial inference cluster.');
      case 'RATE_LIMIT_429':
        throw new Error('Too Many Requests (429): Rate limit exceeded for financial analysis queries. Please retry in a moment.');
      case 'NETWORK_ERROR':
      default:
        throw new Error('Network Connection Error: Failed to establish handshake with market exchange feeds.');
    }
  }

  return dataGenerator();
}

/**
 * Primary Asynchronous Service Layer function requested:
 * fetchStockAnalysis(symbol: string, amount: number)
 *
 * Returns a Promise with mocked stock analysis data, simulating realistic network
 * latency (800-1500ms) and randomized failure states to thoroughly test UI error boundaries.
 */
export async function fetchStockAnalysis(
  symbol: string,
  amount: number,
  options: MockFetcherOptions = {}
): Promise<CommitteeAnalysisResponse> {
  const startTime = Date.now();

  return mockFetcher<CommitteeAnalysisResponse>(
    () => {
      const formattedSymbol = (symbol || 'TCS').toUpperCase();
      const analysis = getStockAnalysis(
        formattedSymbol,
        amount || 50000,
        INITIAL_USER_PROFILE,
        false
      );

      return {
        stock: analysis.stock,
        agents: analysis.agents,
        verdict: analysis.verdict,
        sources: analysis.sources,
        aiEnhanced: false,
        auditLogId: `mock-log-${Date.now()}`,
        isMocked: true,
        latencyMs: Date.now() - startTime,
      };
    },
    {
      minLatencyMs: 800,
      maxLatencyMs: 1500,
      errorProbability: options.errorProbability ?? 0.08,
      ...options,
    }
  );
}

/**
 * Progressive asynchronous data arrival service for multi-agent financial queries.
 * Simulates staggered arrival of Technical, Fundamental, Sentiment, and Risk agents.
 */
export async function fetchCommitteeAnalysisWithStream(
  symbol: string,
  amount: number,
  userProfile: UserRiskProfile,
  isDegraded: boolean,
  onProgress?: (event: AsyncAgentArrivalEvent) => void,
  options: MockFetcherOptions = {}
): Promise<CommitteeAnalysisResponse> {
  const startTime = Date.now();
  const fullAnalysis = getStockAnalysis(symbol, amount, userProfile, isDegraded);

  onProgress?.({
    step: 'INITIALIZING',
    partialAgents: [],
    progressPercent: 10,
    message: `Connecting to financial data streams for ${symbol.toUpperCase()}...`,
  });

  await delay(options.minLatencyMs || 300);

  const progressiveAgents: AgentOutput[] = [];
  const agentNames = ['Technical Agent', 'Fundamental Agent', 'Sentiment Agent', 'Risk & Compliance Agent'];

  for (let i = 0; i < fullAnalysis.agents.length; i++) {
    const agent = fullAnalysis.agents[i];
    // Variable arrival delay per agent
    const agentDelay = Math.floor(Math.random() * 250) + 200;
    await delay(agentDelay);

    progressiveAgents.push(agent);
    const progress = Math.round(15 + ((i + 1) / fullAnalysis.agents.length) * 65);

    onProgress?.({
      step: 'AGENT_ARRIVED',
      agentIndex: i,
      agent,
      partialAgents: [...progressiveAgents],
      progressPercent: progress,
      message: `${agentNames[i] || agent.name} completed signal evaluation.`,
    });
  }

  // Quorum synthesis phase
  onProgress?.({
    step: 'SYNTHESIS',
    partialAgents: [...progressiveAgents],
    progressPercent: 90,
    message: 'Investment Committee quorum synthesizing unified verdict...',
  });

  await delay(350);

  const totalLatency = Date.now() - startTime;

  const result: CommitteeAnalysisResponse = {
    stock: fullAnalysis.stock,
    agents: progressiveAgents,
    verdict: fullAnalysis.verdict,
    sources: fullAnalysis.sources,
    aiEnhanced: false,
    auditLogId: `log-${Date.now()}`,
    isMocked: true,
    latencyMs: totalLatency,
  };

  onProgress?.({
    step: 'COMPLETE',
    partialAgents: progressiveAgents,
    progressPercent: 100,
    message: 'Committee evaluation completed.',
  });

  return result;
}

/**
 * Primary Backend Communication: Committee Analysis
 * Checks live backend API first, falling back to mock fetcher if unavailable.
 */
export async function fetchCommitteeAnalysis(
  symbol: string,
  amount: number,
  userProfile: UserRiskProfile,
  isDegraded: boolean,
  options: MockFetcherOptions = {}
): Promise<CommitteeAnalysisResponse> {
  const startTime = Date.now();

  try {
    const response = await fetch('/api/committee/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        symbol,
        amount,
        userProfile,
        isDegraded,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return {
        ...data,
        latencyMs: Date.now() - startTime,
        isMocked: false,
      };
    }
  } catch (err) {
    console.warn('[API Service] Backend unreachable, falling back to asynchronous mock-fetcher:', err);
  }

  // Fallback to mock fetcher
  return mockFetcher<CommitteeAnalysisResponse>(
    () => {
      const local = getStockAnalysis(symbol, amount, userProfile, isDegraded);
      return {
        stock: local.stock,
        agents: local.agents,
        verdict: local.verdict,
        sources: local.sources,
        aiEnhanced: false,
        auditLogId: `mock-log-${Date.now()}`,
        isMocked: true,
        latencyMs: Date.now() - startTime,
      };
    },
    { minLatencyMs: 800, maxLatencyMs: 1500, errorProbability: 0, ...options }
  );
}

/**
 * Portfolio Simulation API with mock latency and error handling
 */
export async function simulatePortfolioImpact(
  symbol: string,
  amount: number,
  userProfile: UserRiskProfile,
  options: MockFetcherOptions = {}
): Promise<PortfolioImpact> {
  try {
    const response = await fetch('/api/portfolio/simulate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symbol, amount, userProfile }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.impact;
    }
  } catch (err) {
    console.warn('[API Service] Simulation API fallback to mock-fetcher:', err);
  }

  return mockFetcher<PortfolioImpact>(
    () => {
      const res = getStockAnalysis(symbol, amount, userProfile, false);
      return res.verdict.portfolioImpact;
    },
    { minLatencyMs: 600, maxLatencyMs: 1200, errorProbability: 0, ...options }
  );
}

/**
 * Financial RAG Query Engine with async citation resolution
 */
export async function queryRAGRepository(
  query: string,
  options: MockFetcherOptions = {}
): Promise<{ answer: string; matchedCitations: string[] }> {
  try {
    const response = await fetch('/api/research/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn('[API Service] RAG API fallback to mock-fetcher:', err);
  }

  return mockFetcher<{ answer: string; matchedCitations: string[] }>(
    () => {
      const queryLower = query.toLowerCase();
      const matched = TCS_EVIDENCE_DOCS.filter(
        (d) =>
          d.title.toLowerCase().includes(queryLower) ||
          d.excerpt.toLowerCase().includes(queryLower)
      );

      const citations =
        matched.length > 0
          ? matched.map((m) => m.citationKey)
          : ['DOC-01', 'DOC-02'];

      return {
        answer: `Verified SEBI filing excerpt for "${query}": Operating margins sustained at 26.0% with strong BFSI order pipeline expansion of $13.2B TCV.`,
        matchedCitations: citations,
      };
    },
    { minLatencyMs: 800, maxLatencyMs: 1500, errorProbability: 0, ...options }
  );
}

/**
 * Market Signals and Watchlist Scanner
 */
export async function fetchMarketSignals(
  options: MockFetcherOptions = {}
): Promise<{ intelligence: MarketIntelligenceData; watchlist: WatchlistItem[] }> {
  try {
    const response = await fetch('/api/signals');
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn('[API Service] Signals API fallback to mock-fetcher:', err);
  }

  return mockFetcher(
    () => ({
      intelligence: MARKET_INTELLIGENCE_DATA,
      watchlist: WATCHLIST_DATA,
    }),
    { minLatencyMs: 500, maxLatencyMs: 1000, errorProbability: 0, ...options }
  );
}

/**
 * Fetch Stock Info with latency simulation
 */
export async function fetchStockQuote(
  symbol: string,
  options: MockFetcherOptions = {}
): Promise<StockInfo | null> {
  try {
    const response = await fetch(`/api/stocks/${symbol.toUpperCase()}`);
    if (response.ok) {
      const data = await response.json();
      return data.stock;
    }
  } catch (err) {
    console.warn('[API Service] Stock quote API fallback:', err);
  }

  return mockFetcher<StockInfo | null>(
    () => {
      return STOCKS_DATABASE[symbol.toUpperCase()] || null;
    },
    { minLatencyMs: 400, maxLatencyMs: 900, errorProbability: 0, ...options }
  );
}

/**
 * Activity Audit Trail API
 */
export async function fetchActivityAuditTrail(
  options: MockFetcherOptions = {}
): Promise<ActivityLog[]> {
  try {
    const response = await fetch('/api/activity');
    if (response.ok) {
      const data = await response.json();
      return data.logs;
    }
  } catch (err) {
    console.warn('[API Service] Activity logs API fallback:', err);
  }

  return mockFetcher<ActivityLog[]>(
    () => {
      return [
        {
          id: 'log-1',
          timestamp: '10 mins ago',
          stockSymbol: 'TCS',
          amount: 50000,
          verdict: 'BUY',
          confidence: 84,
          keyDrivers: 'RSI oversold rebound + steady 26% margin',
        },
        {
          id: 'log-2',
          timestamp: '2 hours ago',
          stockSymbol: 'INFY',
          amount: 35000,
          verdict: 'ACCUMULATE',
          confidence: 76,
          keyDrivers: 'Large deal TCV expansion offset by attrition',
        },
      ];
    },
    { minLatencyMs: 400, maxLatencyMs: 800, errorProbability: 0, ...options }
  );
}

/**
 * Save user profile settings
 */
export async function saveProfileToBackend(
  profile: UserRiskProfile,
  options: MockFetcherOptions = {}
): Promise<boolean> {
  try {
    const response = await fetch('/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    });
    return response.ok;
  } catch (err) {
    console.warn('[API Service] Save profile API fallback:', err);
  }

  return mockFetcher<boolean>(() => true, options);
}
