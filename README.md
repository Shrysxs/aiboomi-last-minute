# VOICEADS

## Problem Statement
Most businesses receive large volumes of customer reviews, yet this feedback rarely translates into advertising content.  
As a result, marketing messages are often based on assumptions, leading to generic ads that fail to build trust or convert effectively.

---

## Users & Context
**Primary users**
- Local businesses (hotels, restaurants, service providers)
- D2C brands
- Marketing teams and agencies

**Context**
These users already have authentic customer feedback but lack a simple way to convert real customer language into credible, high-performing advertising content.

---

## Solution Overview
VOICEADS turns real customer reviews into ad-ready content.

Instead of guessing what to say, the system analyzes customer language to extract recurring phrases, trust signals, and sentiments, and then generates:
- Text ads
- Enterprise-style marketing copy
- Structured JSON output for programmatic use

All outputs are grounded strictly in customer reviews to maintain authenticity and trust.

---

## Setup & Run

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- API key for the configured LLM provider

### Steps
```bash
git clone <repository-url>
cd voiceads

npm install

# Create environment file
touch .env.local
# Add:
# LLM_API_KEY=your_api_key_here

npm run dev
