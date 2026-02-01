# VOICEADS

<p align="center">
  <em>Turn real customer reviews into ad-ready content — driven entirely by customer voice.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-MVP-brightgreen?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/Runtime-Node.js%2018%2B-339933?style=flat-square" alt="Node.js" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License" />
</p>

<p align="center">
  <a href="https://voiceads.vercel.app" target="_blank"><strong>🚀 Live Demo →</strong></a>
</p>

---

## Problem Statement

Most businesses collect large volumes of customer reviews, yet this feedback rarely makes it into their advertising. Marketing messages end up based on assumptions, resulting in generic ads that fail to build trust or convert effectively. VOICEADS solves this by transforming authentic customer language into high-trust, ad-ready marketing content.

---

## Users & Context

**Target Users:**
- **Small to Medium Businesses**: Hotels, restaurants, e-commerce stores, service providers who want to leverage customer reviews for marketing
- **Marketing Teams**: Agencies and in-house teams seeking authentic, conversion-focused ad copy
- **Entrepreneurs**: Personal brands and startups looking to build trust through customer testimonials

**Use Cases:**
- Generate text ads for social media and search campaigns
- Create marketing copy for email campaigns and landing pages
- Extract structured insights from customer feedback for strategic planning
- Transform raw reviews into polished, professional marketing assets

**Context:**
Users typically have access to customer reviews from platforms like Google Reviews, Yelp, or internal feedback systems. They need a quick, reliable way to turn this authentic customer language into marketing content that resonates and converts.

---

## Solution Overview

VOICEADS uses AI to analyze customer reviews and extract recurring phrases, benefits, and trust signals—then generates polished, ad-ready content grounded entirely in what customers actually said.

**Architecture:**
```
Customer Reviews (pasted by user)
        │
        ▼
  Extract Insights          ← recurring phrases, benefits, trust signals
        │
        ▼
  Generate Ad Content       ← text ads, marketing copy, JSON
        │
        ▼
  Output to User            ← ready to copy, paste, or integrate
```

**Key Features:**
- **Single-Prompt Architecture**: No prompt chaining—stable, fast, less prone to hallucination
- **Multiple Output Formats**: Text ads, enterprise-grade marketing copy, structured JSON
- **Brand Customization**: Adjustable tone (Professional, Friendly, Bold, Premium)
- **Goal-Oriented**: Generate content aligned with specific marketing objectives

**Output Formats:**
- Short-form text ads (headline + body + CTA)
- Enterprise-grade marketing copy (campaign summaries, headlines, value points, social proof)
- Structured JSON for programmatic use or internal systems

---

## Setup & Run

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | v18 or higher |
| npm or yarn | Latest |
| Groq API Key | Required (free tier available) |

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd voiceads
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file in the voiceads directory
   GROQ_API_KEY=your_groq_api_key_here
   GROQ_MODEL=llama-3.1-8b-instant  # Optional, defaults to this
   ```

   Get your Groq API key from [console.groq.com](https://console.groq.com)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

6. **Generate ads**
   - Fill in business information (name, category, goal, tone)
   - Paste customer reviews (minimum 2-3 reviews recommended)
   - Click "Generate Ads from Customer Voice"
   - Copy and use the generated content

### Production Build

```bash
npm run build
npm start
```

---

## Models & Data

### AI Model

**Model**: Llama-3.1-8b-instant (via Groq API)
- **Provider**: Groq (https://groq.com)
- **Why Selected**: Fast inference, cost-effective, good performance for structured output
- **Configuration**: Temperature 0.4 (balanced creativity/consistency)
- **API Format**: OpenAI-compatible Chat Completions API
- **License**: Complies with Groq's license terms and Meta's Llama license

### Data Sources

**Input Data:**
- Customer reviews manually pasted by users
- No external review APIs used in MVP
- User-provided reviews assumed to be used with appropriate consent

**Data Processing:**
- Reviews are processed in real-time
- No data persistence or storage
- Stateless backend—each request is independent
- No model training on user-submitted content

**Licensing:**
- **Project License**: MIT
- **LLM Usage**: Complies with Groq's license terms
- **User Data**: User-provided reviews assumed to be used with appropriate consent
- **No Third-Party Data**: All input comes directly from users

---

## Evaluation & Guardrails

### Hallucination Prevention

- **Explicit Prohibitions**: Prompts explicitly forbid invented claims, statistics, awards, or guarantees
- **Traceability Requirement**: All generated content must be traceable to insights extracted from provided reviews
- **JSON-Only Output**: System prompt enforces JSON-only output to reduce formatting errors
- **Single-Prompt Architecture**: Reduces hallucination risk compared to prompt chaining
- **Temperature Control**: Set to 0.4 for controlled, deterministic outputs

### Bias Mitigation

- **Aggregation**: Insights are aggregated across multiple reviews to avoid over-representation of single voices
- **No Demographic Inference**: No inference of sensitive personal or demographic attributes
- **Review-Based Only**: Content generation strictly limited to provided review data
- **No Assumptions**: If a detail is missing in reviews, it is omitted entirely

### Privacy & Safety

- **No Data Persistence**: Nothing is stored between sessions
- **Stateless Backend**: Each request is fully independent
- **No Model Training**: User-submitted content is not used to retrain any model
- **No Data Leakage**: Stateless architecture prevents data leakage between sessions
- **Client-Side Processing**: All user data remains in browser until API call

### Content Quality

- **Validation**: Minimum 2-3 reviews required for generation
- **Structured Output**: Enforced JSON schema ensures consistent output format
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Output Verification**: JSON parsing with fallback regex extraction

---

## Known Limitations & Risks

### Current Limitations

| Limitation | Impact | Notes |
|------------|--------|-------|
| Manual input only | Users must paste reviews manually | No API imports from review platforms yet |
| Output quality dependency | Quality depends on input quality | Better results with more diverse, detailed reviews |
| No authenticity checks | Reviews taken at face value | No verification of review authenticity |
| No image generation | Text-only output | Visual assets planned for future release |
| No external integrations | No direct platform connections | Review platform imports on roadmap |
| No data persistence | No history or saved outputs | Each session is independent |
| Single model | Fixed to Llama-3.1-8b-instant | No model selection UI in MVP |

### Risks

**Technical Risks:**
- **API Rate Limits**: Groq free tier has rate limits; may require queuing for high volume
- **Model Hallucination**: Despite guardrails, model may occasionally generate content not directly traceable to reviews
- **Input Quality Dependency**: Poor quality or insufficient reviews may result in generic outputs
- **No Validation**: No verification that generated claims are accurate or compliant

**Business Risks:**
- **Regulatory Compliance**: Generated ads may require disclaimers or compliance checks depending on industry
- **Content Appropriateness**: No automatic filtering for sensitive or inappropriate content
- **Competition**: Similar tools may offer more features or better performance

**Mitigation Strategies:**
- Clear user guidelines on minimum review requirements
- Explicit prompts to prevent hallucination
- User responsibility for content review before use
- Future roadmap includes authenticity checks and compliance features

---

## Team

**Team Name**: Penguin

| Name | Role | Contact |
|------|------|---------|
| **Pradnyesh** | Product Head / CEO | [workspace.pradnyesh@gmail.com](mailto:workspace.pradnyesh@gmail.com) • [@Pradnyesh_25](https://x.com/Pradnyesh_25) |
| **Shreyas** | Full-Stack Developer | [shreyashborade2@gmail.com](mailto:shreyashborade2@gmail.com) • [@Shrysxs](https://x.com/Shrysxs) |

**Roles & Responsibilities:**
- **Pradnyesh**: Owns product vision, user experience, and the core idea of turning customer voice into trustworthy advertising content
- **Shreyas**: Built the application end-to-end—frontend, backend, and AI integration. Ensured the core product works reliably.

---

## Contributing

Contributions are welcome! If you have ideas, found a bug, or want to add a feature:
- Open an issue to discuss your idea
- Submit a pull request with your changes
- Follow the existing code style and conventions

---

## Additional Resources

- **Live Demo**: [voiceads.vercel.app](https://voiceads.vercel.app)
- **Tech Stack Documentation**: See `TECH_STACK.md` for complete technical details
- **Future Scope**: See `FUTURE_SCOPE.md` for enterprise roadmap
- **AI Impact Statement**: See `AI_IMPACT_STATEMENT.md` for AI ethics and safety details

---

*VOICEADS — because your customers already wrote your best ads.*
