import { Router, Request, Response } from 'express';
import {
  STOCKS_DATABASE,
  INITIAL_HOLDINGS,
  INITIAL_ACTIVITY_LOGS,
  MARKET_INTELLIGENCE_DATA,
  WATCHLIST_DATA,
  TCS_EVIDENCE_DOCS,
  INITIAL_USER_PROFILE,
  getStockAnalysis,
} from '../data/mockData';
import { enhanceCommitteeWithGemini, askFinancialRAGQuery } from './geminiService';
import { ActivityLog, UserRiskProfile } from '../types';

export const apiRouter = Router();

// In-memory persistent state during server runtime
let userProfileState: UserRiskProfile = { ...INITIAL_USER_PROFILE };
let activityLogsState: ActivityLog[] = [...INITIAL_ACTIVITY_LOGS];

// 1. Health check
apiRouter.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    service: 'InvestAI Committee Backend',
    timestamp: new Date().toISOString(),
    geminiEnabled: Boolean(process.env.GEMINI_API_KEY),
  });
});

// 2. Stocks list & detail
apiRouter.get('/stocks', (req: Request, res: Response) => {
  res.json({
    stocks: Object.values(STOCKS_DATABASE),
  });
});

apiRouter.get('/stocks/:symbol', (req: Request, res: Response) => {
  const symbol = req.params.symbol.toUpperCase();
  const stock = STOCKS_DATABASE[symbol];
  if (!stock) {
    return res.status(404).json({ error: `Stock ${symbol} not found` });
  }
  res.json({ stock });
});

// 3. AI Committee Multi-Agent Analysis
apiRouter.post('/committee/analyze', async (req: Request, res: Response) => {
  try {
    const {
      symbol = 'TCS',
      amount = 50000,
      userProfile = userProfileState,
      isDegraded = false,
      useAI = true,
    } = req.body;

    const baseAnalysis = getStockAnalysis(symbol, Number(amount), userProfile, Boolean(isDegraded));

    let finalVerdict = { ...baseAnalysis.verdict };
    let aiEnhanced = false;

    if (useAI && process.env.GEMINI_API_KEY) {
      const geminiResult = await enhanceCommitteeWithGemini({
        stock: baseAnalysis.stock,
        investmentAmount: Number(amount),
        userProfile,
        isDegraded: Boolean(isDegraded),
        baseAgents: baseAnalysis.agents,
        baseVerdict: baseAnalysis.verdict,
        sources: baseAnalysis.sources,
      });

      if (geminiResult.enhancedVerdict) {
        finalVerdict = {
          ...finalVerdict,
          ...geminiResult.enhancedVerdict,
        };
        aiEnhanced = true;
      }

      if (geminiResult.dynamicBullCasePoints) {
        finalVerdict.bullBear.bullCase.points = geminiResult.dynamicBullCasePoints;
      }
      if (geminiResult.dynamicBearCasePoints) {
        finalVerdict.bullBear.bearCase.points = geminiResult.dynamicBearCasePoints;
      }
    }

    // Auto-record to activity audit log
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      stockSymbol: baseAnalysis.stock.symbol,
      amount: Number(amount),
      verdict: finalVerdict.verdict,
      confidence: finalVerdict.confidence,
      keyDrivers: `${finalVerdict.likes[0] || 'Technical strength'} vs ${finalVerdict.concerns[0] || 'Sector limit'}`,
    };
    activityLogsState.unshift(newLog);

    res.json({
      stock: baseAnalysis.stock,
      agents: baseAnalysis.agents,
      verdict: finalVerdict,
      sources: baseAnalysis.sources,
      aiEnhanced,
      auditLogId: newLog.id,
    });
  } catch (err: any) {
    console.error('Error running committee analysis:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
});

// 4. Portfolio state & impact simulator
apiRouter.get('/portfolio', (req: Request, res: Response) => {
  const totalValue = INITIAL_HOLDINGS.reduce(
    (acc, h) => acc + h.currentPrice * h.quantity,
    0
  );
  res.json({
    holdings: INITIAL_HOLDINGS,
    totalPortfolioValue: totalValue,
    todayGain: 12430,
    todayGainPercent: 2.64,
  });
});

apiRouter.post('/portfolio/simulate', (req: Request, res: Response) => {
  const { symbol = 'TCS', amount = 50000, userProfile = userProfileState } = req.body;
  const analysis = getStockAnalysis(symbol, Number(amount), userProfile, false);
  res.json({
    impact: analysis.verdict.portfolioImpact,
    verdict: analysis.verdict.verdict,
  });
});

// 5. Market Signals & Scanners
apiRouter.get('/signals', (req: Request, res: Response) => {
  res.json({
    intelligence: MARKET_INTELLIGENCE_DATA,
    watchlist: WATCHLIST_DATA,
  });
});

// 6. RAG Financial Research & Vector Search
apiRouter.get('/research/docs', (req: Request, res: Response) => {
  const query = (req.query.q as string || '').toLowerCase();
  const filtered = TCS_EVIDENCE_DOCS.filter(
    (d) =>
      d.title.toLowerCase().includes(query) ||
      d.excerpt.toLowerCase().includes(query) ||
      d.type.toLowerCase().includes(query)
  );
  res.json({
    documents: filtered,
    totalCount: TCS_EVIDENCE_DOCS.length,
  });
});

apiRouter.post('/research/query', async (req: Request, res: Response) => {
  const { query = '' } = req.body;
  const result = await askFinancialRAGQuery(query, TCS_EVIDENCE_DOCS);
  res.json(result);
});

// 7. Activity Audit Trail
apiRouter.get('/activity', (req: Request, res: Response) => {
  res.json({
    logs: activityLogsState,
  });
});

apiRouter.post('/activity', (req: Request, res: Response) => {
  const newLog: ActivityLog = {
    id: `log-${Date.now()}`,
    timestamp: 'Just now',
    stockSymbol: req.body.stockSymbol || 'TCS',
    amount: req.body.amount || 50000,
    verdict: req.body.verdict || 'WATCH',
    confidence: req.body.confidence || 78,
    keyDrivers: req.body.keyDrivers || 'Multi-agent consensus analysis',
  };
  activityLogsState.unshift(newLog);
  res.status(201).json({ log: newLog });
});

// 8. User Risk Profile
apiRouter.get('/profile', (req: Request, res: Response) => {
  res.json({ profile: userProfileState });
});

apiRouter.post('/profile', (req: Request, res: Response) => {
  userProfileState = {
    ...userProfileState,
    ...req.body,
  };
  res.json({ profile: userProfileState, success: true });
});
