# 💰 Multi-Agent Financial Intelligence System

## HackVerse: Into the Web — Sprint 1

### IEEE Robotics & Automation Society · VIT Chennai Student Chapter

A multi-agent AI-powered financial intelligence system designed to transform raw financial data into **personalized, explainable investment intelligence for retail investors**.

The system combines financial analysis, savings optimization, risk assessment, and investment recommendations through independent specialist AI agents coordinated through a central workflow.

---

# 🚀 Project Overview

Retail investors often struggle to interpret financial data, identify spending patterns, understand risk, and make informed investment decisions.

This project addresses that problem using a **multi-agent architecture** where each specialist agent focuses on a specific financial responsibility.

Instead of relying on one AI model to make every decision, the system decomposes the problem into independent agents and aggregates their outputs into a final investor report.

### Core Pipeline

```text
                    FINANCIAL DATA
                         │
                         ▼
                ┌─────────────────┐
                │  DATA COLLECTOR │
                │      AGENT      │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │    FINANCIAL    │
                │    ANALYZER     │
                │      AGENT      │
                └────────┬────────┘
                         │
              ┌──────────┼──────────┐
              │          │          │
              ▼          ▼          ▼
        ┌──────────┐ ┌──────────┐ ┌──────────────┐
        │ SAVINGS  │ │   RISK   │ │ INVESTMENT   │
        │ ADVISOR  │ │ ADVISOR  │ │   ADVISOR    │
        └────┬─────┘ └────┬─────┘ └──────┬───────┘
             │            │              │
             └────────────┼──────────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │    NOTIFIER     │
                 │      AGENT      │
                 └────────┬────────┘
                          │
                          ▼
                 PERSONALIZED REPORT
                          │
                          ▼
                 STREAMLIT DASHBOARD
```

---

# 🤖 Multi-Agent Architecture

## 1. Data Collector Agent

Responsible for collecting and validating financial information.

### Responsibilities

* Read financial data from CSV sources
* Merge data from multiple sources
* Validate input data
* Clean malformed or incomplete records
* Provide normalized data to downstream agents

---

## 2. Financial Analyzer Agent

Performs deterministic financial analysis before recommendations are generated.

### Responsibilities

* Calculate total wealth
* Analyze spending categories
* Detect spending anomalies
* Calculate financial trends
* Identify abnormal spending behavior
* Generate structured analytical data

Example:

```text
Total Wealth: $2,574.50

Spending Analysis:
- Food
- Transportation
- Shopping
- Utilities
- Other

Anomaly Detection:
- Abnormal spending categories
- Spending volatility
```

---

## 3. Savings Advisor Agent

Analyzes financial capacity and identifies opportunities to improve savings.

### Responsibilities

* Estimate potential savings
* Identify unnecessary or excessive spending
* Recommend savings strategies
* Suggest emergency-fund planning
* Recommend automated savings

Example recommendations:

```text
1. Set aside 20% of monthly income for savings.
2. Review categories exceeding budget.
3. Build an emergency fund.
4. Automate recurring savings contributions.
```

---

## 4. Risk Advisor Agent

Evaluates financial risk using analytical signals from the previous agents.

### Responsibilities

* Analyze spending anomalies
* Evaluate financial volatility
* Generate a risk score
* Determine risk level
* Identify financial risks
* Recommend mitigation strategies

Example:

```text
Risk Score: 0.50 / 1.00
Risk Level: MEDIUM

Findings:
- Spending anomalies detected
- Category volatility detected

Mitigation:
- Diversify portfolio
- Set spending alerts
- Establish emergency fund
```

---

## 5. Investment Advisor Agent

Produces investment intelligence using the financial analysis and risk assessment.

### Responsibilities

* Interpret financial position
* Consider risk profile
* Generate market outlook
* Suggest portfolio allocation
* Identify diversification opportunities
* Provide investment ideas

Example:

```text
Suggested Allocation:

Stocks: 60%
Bonds: 30%
Cash: 10%

Potential Opportunities:
- Index funds
- REITs
- Other diversified assets
```

> Investment recommendations are intended as informational intelligence and should not be treated as guaranteed financial advice.

---

## 6. Notifier Agent

Combines outputs from the specialist agents into a human-readable investor report.

### Responsibilities

* Aggregate advisor outputs
* Format recommendations
* Present risk assessment
* Present investment intelligence
* Generate final action plan
* Provide explainability information

---

# 🧠 Explainability

Explainability is a core part of the system.

The final recommendations are not generated from a single black-box decision.

The system combines:

```text
✓ Transaction data
✓ Spending category analysis
✓ Spending anomaly detection
✓ Financial trends
✓ Savings capacity
✓ Risk assessment
✓ Investment objectives
```

This allows users and judges to understand **why a recommendation was produced**.

---

# 🖥️ Streamlit Dashboard

The project includes a Streamlit-based dashboard layer for visualizing the multi-agent results.

The dashboard is designed to present:

### Financial Overview

```text
┌──────────────────────────────────────────────────────┐
│          MULTI-AGENT FINANCIAL INTELLIGENCE          │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Total Wealth    Potential Savings    Risk Score     │
│    $2,574.50          $63.82             0.50         │
│                                                      │
├──────────────────────┬───────────────────────────────┤
│   SAVINGS ADVISOR    │       RISK ADVISOR            │
│                      │                               │
│   Recommendations    │   Risk Score                  │
│   Savings potential  │   Risk findings               │
│                      │   Mitigation strategies       │
├──────────────────────┴───────────────────────────────┤
│                                                      │
│              INVESTMENT ADVISOR                     │
│                                                      │
│       Portfolio Allocation & Opportunities           │
│                                                      │
├──────────────────────────────────────────────────────┤
│                  EXPLAINABILITY                       │
│                                                      │
│       Why were these recommendations generated?      │
│                                                      │
├──────────────────────────────────────────────────────┤
│                   ACTION PLAN                         │
└──────────────────────────────────────────────────────┘
```

---

# 📊 Dashboard Features

The Streamlit interface provides:

* Total wealth metric
* Potential savings metric
* Risk score
* Risk level
* Multi-agent execution status
* Savings recommendations
* Risk analysis
* Investment allocation
* Investment opportunities
* Explainability
* Final action plan
* Interactive charts

---

# 🛠️ Technology Stack

## Backend

* Python
* Object-Oriented Agent Architecture
* JSON-based agent communication
* CSV financial data processing

## AI / LLM

* LiteLLM-compatible provider architecture
* NVIDIA NIM
* OpenAI-compatible API interface
* DeepSeek / NVIDIA-hosted models

## Frontend

* Streamlit
* Plotly
* Pandas

## Architecture

* Multi-Agent System
* Coordinator-based orchestration
* Specialist financial agents
* Rule-based fallback mechanisms
* Structured JSON communication

---

# 📁 Project Structure

```text
multi-agent-financial-intelligence/
│
├── agents/
│   ├── coordinator/
│   │   └── coordinator_agent.py
│   │
│   ├── data_collector/
│   │   └── data_collector_agent.py
│   │
│   ├── analyzer/
│   │   └── analyzer_agent.py
│   │
│   ├── savings_advisor/
│   │   └── savings_advisor_agent.py
│   │
│   ├── risk_advisor/
│   │   └── risk_advisor_agent.py
│   │
│   ├── investment_advisor/
│   │   └── investment_advisor_agent.py
│   │
│   └── notifier/
│       └── notifier_agent.py
│
├── llm_provider/
│   ├── interface.py
│   ├── factory.py
│   ├── config.py
│   │
│   └── providers/
│       ├── litellm_provider.py
│       └── mock_provider.py
│
├── data/
│   └── *.csv
│
├── llm_config.json
├── dashboard.py
├── main.py
├── requirements.txt
├── .env
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd multi-agent-financial-intelligence
```

---

## 2. Create a virtual environment

### Windows

```powershell
python -m venv venv
```

Activate it:

```powershell
.\venv\Scripts\Activate.ps1
```

### Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 3. Install dependencies

```bash
pip install -r requirements.txt
```

If Streamlit dependencies are not already present:

```bash
pip install streamlit pandas plotly
```

---

# 🔐 Environment Configuration

Create a `.env` file in the project root.

```env
NVIDIA_NIM_API_KEY=your_nvidia_api_key
```

Do not commit `.env` to GitHub.

Add it to `.gitignore`:

```text
.env
venv/
__pycache__/
*.pyc
```

---

# 🧠 LLM Configuration

The LLM configuration is controlled through:

```text
llm_config.json
```

Example:

```json
{
  "savings": {
    "provider": "litellm",
    "model": "YOUR_MODEL",
    "parameters": {
      "temperature": 0.7,
      "max_tokens": 500
    }
  },
  "risk": {
    "provider": "litellm",
    "model": "YOUR_MODEL",
    "parameters": {
      "temperature": 0.6,
      "max_tokens": 300
    }
  },
  "investment": {
    "provider": "litellm",
    "model": "YOUR_MODEL",
    "parameters": {
      "temperature": 0.7,
      "max_tokens": 400
    }
  }
}
```

The architecture allows the model configuration to be changed without rewriting the advisor agents.

---

# ▶️ Running the Multi-Agent System

Run the main application:

```powershell
python main.py
```

The coordinator executes the workflow:

```text
Step 1 → Data Collection
Step 2 → Financial Analysis
Step 3a → Savings Advisor
Step 3b → Risk Advisor
Step 3c → Investment Advisor
Step 4 → Notifier
```

The final result is printed as a personalized financial intelligence report.

---

# 🖥️ Running the Dashboard

Start Streamlit:

```powershell
streamlit run dashboard.py
```

Streamlit will provide a local URL similar to:

```text
http://localhost:8501
```

Open the URL in a browser.

---

# 🔄 Dashboard + Agent Integration

The intended production flow is:

```text
Streamlit
    │
    │ User selects financial data
    │
    ▼
Coordinator Agent
    │
    ├── Data Collector
    │
    ├── Financial Analyzer
    │
    ├── Savings Advisor
    │
    ├── Risk Advisor
    │
    └── Investment Advisor
    │
    ▼
Notifier
    │
    ▼
Structured Results
    │
    ▼
Streamlit Dashboard
```

This separation keeps the user interface independent from the individual agents.

---

# 🛡️ Fault Tolerance

The system includes fallback behavior when an LLM call fails.

For example:

```text
LLM Request
     │
     ▼
  Success?
   /     \
 YES      NO
 │        │
 ▼        ▼
LLM     Rule-Based
Output    Fallback
           │
           ▼
      Continue Workflow
```

This ensures that temporary API failures do not completely stop the financial analysis pipeline.

---

# 📈 Example Output

```text
FINANCIAL ADVISOR REPORT
========================

TOTAL WEALTH
$2,574.50

SAVINGS ADVISOR
---------------

Potential Savings: $63.82

Recommendations:
1. Set aside 20% of monthly income.
2. Review excessive spending categories.
3. Build an emergency fund.
4. Automate savings contributions.


RISK ADVISOR
------------

Risk Score: 0.50 / 1.00
Risk Level: MEDIUM

Findings:
1. Spending anomalies detected.
2. Category volatility detected.

Mitigation:
1. Diversify investments.
2. Set spending alerts.
3. Establish emergency savings.


INVESTMENT ADVISOR
------------------

Market Outlook:
Positive for a diversified portfolio.

Suggested Allocation:
60% Stocks
30% Bonds
10% Cash
```

---

# 🎯 Key Innovation

The primary innovation is the **decomposition of financial intelligence into cooperating specialist agents**.

Instead of:

```text
User → One AI → Recommendation
```

the system implements:

```text
                 ┌── Savings Agent ──┐
                 │                   │
Data → Analyzer ─┼── Risk Agent ─────┼→ Aggregated Intelligence
                 │                   │
                 └── Investment ─────┘
```

Each agent has a specific responsibility, allowing the system to produce more structured and explainable financial intelligence.

---

# 🔍 Why Multi-Agent?

### Single-Agent Approach

```text
Financial Data
      ↓
     LLM
      ↓
All Recommendations
```

Problems:

* Difficult to specialize
* Harder to debug
* Limited explainability
* One failure can affect the entire decision

### Multi-Agent Approach

```text
Financial Data
      ↓
Financial Analyzer
      ↓
 ┌────────┬────────┬───────────┐
 ↓        ↓        ↓
Savings   Risk   Investment
 ↓        ↓        ↓
 └────────┴────────┴───────────┘
             ↓
       Final Intelligence
```

Advantages:

* Specialized reasoning
* Independent analysis
* Better modularity
* Easier debugging
* Explainable recommendations
* Fault isolation
* Extensible architecture

---

# 🚧 Future Improvements

Potential future extensions include:

* Real-time stock market data
* NSE/BSE integration
* Bank account integration
* Live portfolio tracking
* SEC/regulatory filing analysis
* News sentiment analysis
* Behavioral finance signals
* Personalized risk profiling
* Portfolio optimization
* Real-time alerts
* PDF investor reports
* Historical performance visualization
* Authentication and user profiles
* Cloud deployment
* Mobile-friendly dashboard

---

# ⚠️ Disclaimer

This project is an educational and experimental AI system.

The generated insights are intended for informational purposes and should not be considered professional financial advice or a guarantee of investment performance.

Users should independently verify financial information and consult qualified financial professionals before making investment decisions.

---

# 👥 Hackathon Project

**HackVerse: Into the Web — Sprint 1**

**Problem Statement:**
Multi-Agent Autonomous Financial Intelligence System for Retail Investors

The system demonstrates how autonomous specialist agents can transform raw financial information into personalized, explainable financial intelligence through coordinated multi-agent reasoning.

---

# ⭐ Demo Flow

For the hackathon demonstration:

```text
1. Launch Streamlit Dashboard
        ↓
2. Upload / Select Financial Dataset
        ↓
3. Click "Run Financial Analysis"
        ↓
4. Coordinator starts workflow
        ↓
5. Data Collector processes data
        ↓
6. Financial Analyzer calculates metrics
        ↓
7. Savings Agent generates savings intelligence
        ↓
8. Risk Agent evaluates financial risk
        ↓
9. Investment Agent generates investment intelligence
        ↓
10. Notifier aggregates results
        ↓
11. Dashboard displays:
        • Wealth
        • Savings
        • Risk
        • Investment allocation
        • Explainability
        • Action plan
```

---

# 🏆 Final Architecture

```text
                         USER
                          │
                          ▼
                 ┌─────────────────┐
                 │    STREAMLIT    │
                 │    DASHBOARD    │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │   COORDINATOR   │
                 │      AGENT      │
                 └────────┬────────┘
                          │
             ┌────────────┼────────────┐
             │            │            │
             ▼            ▼            ▼
       ┌──────────┐ ┌──────────┐ ┌─────────────┐
       │  SAVINGS │ │   RISK   │ │ INVESTMENT  │
       │  ADVISOR │ │  ADVISOR │ │   ADVISOR   │
       └────┬─────┘ └────┬─────┘ └──────┬──────┘
            │            │              │
            └────────────┼──────────────┘
                         │
                         ▼
                ┌─────────────────┐
                │    NOTIFIER     │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ EXPLAINABLE     │
                │ FINANCIAL       │
                │ INTELLIGENCE    │
                └─────────────────┘
```

**The system's goal is simple: turn complex financial data into clear, explainable, actionable investor intelligence.**
