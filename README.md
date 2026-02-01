# VOICEADS

<p align="center">
  <em>Turn real customer reviews into ad-ready content — driven entirely by customer voice.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-MVP-brightgreen?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/Runtime-Node.js%2018%2B-339933?style=flat-square" alt="Node.js" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License" />
</p>

---

## The Problem

Most businesses collect large volumes of customer reviews, yet this feedback rarely makes it into their advertising. Marketing messages end up based on assumptions, resulting in generic ads that fail to build trust or convert effectively.

## The Solution

VOICEADS analyzes real customer reviews to extract recurring phrases, benefits, and trust signals — then generates polished, ad-ready content grounded entirely in what your customers actually said.

**Output formats include:**
- Short-form text ads
- Enterprise-grade marketing copy
- Structured JSON for programmatic or internal use

Because every output is rooted in authentic customer language, the result is advertising that feels credible and resonates.

---

## How It Works

### Architecture

VOICEADS uses a **single-prompt architecture** — no prompt chaining. This keeps the system stable, fast, and less prone to hallucination.

### Data Flow

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

### Data Sources

All input is customer reviews provided manually by the user (pasted text). No external review APIs are used in this MVP.

---

## Guardrails & Safety

### Hallucination Prevention
- Prompts explicitly forbid invented claims, statistics, awards, or guarantees.
- All generated content must be traceable to insights extracted from the provided reviews.

### Bias Mitigation
- Insights are aggregated across multiple reviews to avoid over-representation.
- No inference of sensitive personal or demographic attributes.

### Privacy
- **No data persistence** — nothing is stored between sessions.
- **Stateless backend** — each request is fully independent.
- **No model training** — user-submitted content is not used to retrain any model.

### Licensing
- User-provided reviews are assumed to be used with appropriate consent.
- LLM usage complies with the license terms of the selected provider.

---

## Known Limitations

| Limitation | Notes |
|------------|-------|
| Manual input only | Reviews must be pasted in; no API imports yet |
| Output quality | Depends on the volume and quality of reviews provided |
| No authenticity checks | Reviews are taken at face value |
| No image generation | Planned for a future release |
| No external integrations | Review platform imports are on the roadmap |

---

## Roadmap

- [ ] Import reviews directly from external platforms (Google, Yelp, Trustpilot)
- [ ] AI-generated visual assets to complement text ads
- [ ] Review authenticity scoring
- [ ] Multi-language support
- [ ] Campaign performance analytics dashboard

---

## Team

| Name | Role | Description |
|------|------|-------------|
| **Pradnyesh** | Product Head / CEO | Owns product vision, user experience, and the core idea of turning customer voice into trustworthy advertising content. |
| **Shreyas** | Full-Stack Developer | Built the application end-to-end — frontend, backend, and AI integration. Mostly here for the side quest, but made sure the core product actually works. |

---

*VOICEADS — because your customers already wrote your best ads.*
