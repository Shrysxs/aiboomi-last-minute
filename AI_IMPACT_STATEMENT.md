# AI Impact Statement

## What the AI is doing; model(s) used and why

VOICEADS uses Groq's API with Llama-3.1-8b-instant (configurable) to analyze customer reviews and generate ad-ready content. Extracts recurring phrases, benefits, and trust signals, then generates text ads, marketing copy, and structured JSON. Llama-3.1-8b-instant selected for speed and cost-effectiveness, temperature 0.4 for controlled outputs. Single-prompt architecture (no chaining) reduces hallucination risk.

## Data provenance & licenses

Input: customer reviews manually pasted by users—no external APIs. User-provided reviews assumed used with appropriate consent. Project licensed under MIT. LLM usage complies with Groq's license terms. No data persistence; stateless backend.

## Hallucination/bias mitigations & guardrails

Hallucination prevention: Prompts forbid invented claims, statistics, awards, or guarantees. All content traceable to insights from provided reviews. JSON-only output enforced. Bias mitigation: Insights aggregated across multiple reviews. No inference of sensitive personal/demographic attributes. Temperature 0.4 for controlled output.

## Expected outcomes (user/business/safety)

**User**: Generate trustworthy ads reflecting actual customer language, improving credibility. **Business**: Create high-converting ads grounded in customer voice, reducing generic messaging. **Safety**: Zero data persistence; no model training on user content; stateless architecture prevents data leakage.
