# VoiceAds MVP - Complete No-Code Generation Prompt

Copy and paste this entire prompt into your no-code AI tool (v0.dev, Cursor Composer, etc.) to generate a fully-fledged MVP demo.

---

## PROJECT OVERVIEW

Create a complete, production-ready MVP for "VoiceAds" - an AI-powered platform that transforms customer reviews into high-converting ad copy. This is a demo for judges, so it needs to be polished, fully functional, and visually impressive.

**Tech Stack Requirements:**
- Next.js 16+ with App Router
- React 19 with TypeScript
- Tailwind CSS 4
- Server-side API routes
- Groq API integration (use environment variable GROQ_API_KEY)
- Google Fonts (Sora for body, Fraunces for headings)

**Key Principle:** Single-prompt AI architecture - one API call generates all outputs (text ads, marketing copy, structured JSON). No prompt chaining.

---

## COMPLETE UI/UX SPECIFICATIONS

### Color Palette & Design System

**Primary Colors:**
- Background: Radial gradient from `#f9f4ef` → `#f6f4f1` → `#ece7e1`
- Accent: `#d4542f` (coral/orange)
- Accent Dark: `#b54423` (hover states)
- Foreground: `#141414` (text)
- Muted: `#6b6b6b` (secondary text)
- Surface: `#ffffff` (cards)
- Soft: `#f0ece7` (subtle backgrounds)

**Typography:**
- Body Font: Sora (Google Fonts) - clean, modern sans-serif
- Display Font: Fraunces (Google Fonts) - elegant serif for headings
- Font sizes: Use Tailwind scale (text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl, text-5xl)
- Font weights: 400 (normal), 600 (semibold), 700 (bold)

**Spacing & Layout:**
- Max width: 6xl (1152px) for main content
- Padding: px-6 on mobile, responsive
- Border radius: rounded-2xl (16px) for cards, rounded-3xl (24px) for large containers, rounded-full for buttons
- Shadows: shadow-sm for subtle, shadow-lg for cards

**Component Styles:**
- Buttons: rounded-full, px-4 to px-8, py-2 to py-3, font-semibold, transition effects
- Cards: white background, border border-black/5, rounded-2xl or rounded-3xl, shadow-sm or shadow-lg
- Inputs: rounded-2xl, border border-black/10, bg-[var(--soft)], focus:border-[var(--accent)]

---

## PAGE STRUCTURE & LAYOUT

### Header Component
- Fixed or sticky header with backdrop-blur
- Logo/Text: "VOICEADS" (text-lg, font-semibold, tracking-tight)
- Right side: CTA button "Generate Ads from Customer Voice" (rounded-full, accent color)
- Border bottom: border-black/5
- Background: bg-white/70 backdrop-blur

### Hero Section
- Two-column grid on desktop (lg:grid-cols-[1.1fr_0.9fr])
- Left column:
  - Small uppercase label: "AI-powered customer language" (text-sm, font-semibold, tracking-[0.2em], accent color)
  - Main headline: "Ads written by your customers, not your brand." (text-4xl md:text-5xl, font-semibold, Fraunces font)
  - Subheadline: "Turn real customer reviews into high-trust ads and marketing copy." (text-lg, muted color)
  - Two CTA buttons side by side
  - Feature card: "Why VOICEADS works" with bullet points
- Right column:
  - Sample output card showing 3 example ad cards
  - Each example: headline, body text, CTA, with description below

### Main Input Section
- Large card container (rounded-3xl, white background, shadow-sm)
- Header: "Create your ad engine" with review count badge
- Five-step form layout:

**Step 1: Business Context**
- Business Name: Text input (optional)
- Business Category: Button group with 5 options:
  - Hotel / Hospitality
  - Restaurant / Cafe
  - E-commerce / D2C
  - Service Business
  - Personal Brand
- Selected state: accent background, white text
- Unselected: white background, border

**Step 2: Marketing Intent**
- Primary Goal: Button group with 4 options:
  - Get more bookings / sales
  - Build brand trust
  - Promote an offer
  - Increase awareness
- Output Formats: Multi-select buttons (can select multiple):
  - Text Ads
  - Marketing Copy
  - Structured JSON

**Step 3: Brand Feel**
- Brand Tone: Button group with 4 options:
  - Professional
  - Friendly
  - Bold
  - Premium

**Step 4: Customer Voice**
- Large textarea for reviews (rows={6})
- Placeholder: "Spotless rooms, incredibly comfortable beds, staff went above and beyond..."
- Helper text: "Paste real customer reviews. This language will be used directly in your ads."
- Real-time review count display: "X review lines detected"

**Step 5: Optional CTA**
- Preferred CTA: Button group with 4 options:
  - Book now
  - Order now
  - Learn more
  - Contact us
- Optional, can be left unselected

**Generate Button:**
- Large, prominent button: "Generate Ads from Customer Voice"
- Loading state: "Generating…" with disabled state
- Helper text: "Single LLM call · No external data · Demo-ready"

**Error Display:**
- Red error banner if validation fails or API error
- Rounded-2xl, border-red-200, bg-red-50, text-red-700

### Results Section (Shown after generation)

**Text Ads Section:**
- Section header with "Copy section" button
- Grid of 3 ad cards (md:grid-cols-3)
- Each card shows:
  - Headline (font-semibold)
  - Body text (muted color)
  - CTA (accent color, font-semibold)

**Marketing Copy Section:**
- Section header with "Copy section" button
- Multiple subsections:
  - Campaign Summary card (objective, target audience)
  - Headlines (flex wrap, pill badges)
  - Core Copy (paragraph)
  - Value Points (bullet list)
  - Social Proof card
  - CTAs (pill badges)

**Structured JSON Section:**
- Section header with "Copy JSON" button
- Code block with syntax highlighting
- Scrollable (max-h-[420px])
- Shows complete JSON structure

**Copy Functionality:**
- All sections have copy buttons
- Use navigator.clipboard.writeText
- Show toast notification on copy (optional but recommended)

---

## FUNCTIONALITY REQUIREMENTS

### Form Validation
- Minimum 2 reviews required (count non-empty lines)
- Required fields: businessCategory, primaryGoal, brandTone, reviews
- Show error message if validation fails
- Disable generate button if validation fails

### API Integration

**Endpoint:** POST /api/generate

**Request Body:**
```typescript
{
  businessName?: string;
  businessCategory: string;
  primaryGoal: string;
  brandTone: string;
  reviews: string;
  preferredCTA?: string;
  outputFormats?: string[];
}
```

**API Route Implementation:**
- Create `/app/api/generate/route.ts`
- Validate required fields
- Check for GROQ_API_KEY environment variable
- Build comprehensive prompt (see prompt structure below)
- Call Groq API: `https://api.groq.com/openai/v1/chat/completions`
- Model: `process.env.GROQ_MODEL || "llama-3.1-8b-instant"`
- Temperature: 0.4
- Parse JSON response with fallback regex extraction
- Return structured response

**Prompt Structure:**
```
You are an expert advertising strategist working with real businesses.

Customer reviews:
"""
{reviews}
"""

Business context:
- Business category: {businessCategory}
- Primary goal: {primaryGoal}
- Brand tone: {brandTone}

Instructions:
1. Identify recurring phrases, benefits, and trust signals from the reviews.
2. Use ONLY these insights to generate advertising content.
3. Do NOT invent claims, numbers, awards, guarantees, or outcomes.
4. Use the brand tone specified. Keep language concise, human, and confident.
5. Prefer direct phrases from reviews where possible (quote or lightly paraphrase).
6. If a detail is missing in reviews, omit it entirely.
7. Keep CTAs simple and grounded (no aggressive hype).
8. Headlines should be 4–8 words, body copy 1–2 short sentences.
9. Avoid generic marketing jargon ("world-class", "best-in-class", "unmatched").
10. Ensure each text ad highlights a distinct theme from reviews.
11. For marketing_copy.value_points, keep each point to a short phrase.
12. For marketing_copy.social_proof, use a single sentence in first-person plural (e.g., "Guests mention...").
13. Output must be valid JSON only, no markdown or commentary.

Return VALID JSON in the following structure:

{
  "insights": {
    "phrases": [],
    "benefits": [],
    "trust_signals": []
  },
  "text_ads": [
    { "headline": "", "body": "", "cta": "" },
    { "headline": "", "body": "", "cta": "" },
    { "headline": "", "body": "", "cta": "" }
  ],
  "marketing_copy": {
    "campaign_summary": {
      "objective": "",
      "target_audience": "",
      "emotion": "",
      "proof_source": "Customer reviews"
    },
    "headlines": [],
    "subheadline": "",
    "core_copy": "",
    "value_points": [],
    "social_proof": "",
    "ctas": []
  }
}
```

**System Message:**
"Return only valid JSON. Do not wrap in markdown or add commentary."

### Error Handling
- Network errors: Show user-friendly message
- API errors: Display error from API response
- JSON parsing errors: Try regex extraction, show error if fails
- Missing API key: Clear error message with setup instructions

### Loading States
- Show loading spinner or "Generating…" text
- Disable form during generation
- Prevent multiple simultaneous requests

### State Management
- Use React useState for all form fields
- Use useMemo for computed values (review count)
- Manage loading, error, and result states

---

## INTERACTIVE FEATURES

### Smooth Scrolling
- Header CTA buttons scroll to input section
- Use `scrollIntoView({ behavior: "smooth" })`

### Copy to Clipboard
- Implement for all copy buttons
- Use `navigator.clipboard.writeText()`
- Optional: Show toast notification on success

### Real-time Updates
- Review count updates as user types
- Form validation feedback
- Button states change based on selection

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Stack columns on mobile, side-by-side on desktop
- Adjust font sizes and spacing for mobile

---

## MOCK DATA FOR DEMO

### Sample Reviews (for placeholder/demo)
```
The rooms were spotless and incredibly comfortable. The beds were like sleeping on clouds!

Staff went above and beyond to make our stay memorable. They remembered our names and preferences.

Breakfast was outstanding - fresh, local ingredients and so many options. Best hotel breakfast I've ever had.

The location is perfect - walking distance to everything. We didn't need a car at all.

Quiet and peaceful, even though it's in the city center. We slept like babies every night.
```

### Sample Output (for demo/fallback)
```json
{
  "insights": {
    "phrases": ["spotless rooms", "comfortable beds", "staff went above and beyond", "outstanding breakfast"],
    "benefits": ["Perfect location", "Peaceful atmosphere", "Personalized service"],
    "trust_signals": ["Staff remembered names", "Fresh local ingredients", "Walking distance to everything"]
  },
  "text_ads": [
    {
      "headline": "Spotless rooms, unbelievably comfortable beds",
      "body": "Guests consistently praise our attention to detail and peaceful atmosphere.",
      "cta": "Book your stay"
    },
    {
      "headline": "Staff that remembers your name",
      "body": "Experience personalized service that goes above and beyond.",
      "cta": "Reserve now"
    },
    {
      "headline": "Outstanding breakfast, perfect location",
      "body": "Start your day with fresh local ingredients, then explore everything on foot.",
      "cta": "Check availability"
    }
  ],
  "marketing_copy": {
    "campaign_summary": {
      "objective": "Drive bookings by highlighting authentic guest experiences",
      "target_audience": "Travelers seeking comfort, personalized service, and convenience",
      "emotion": "Trust and relaxation",
      "proof_source": "Customer reviews"
    },
    "headlines": [
      "Where comfort meets exceptional service",
      "Guests call it the perfect stay",
      "Experience what 200+ guests already love"
    ],
    "subheadline": "A hotel that feels like home, in the heart of the city",
    "core_copy": "Our guests consistently praise our spotless rooms, comfortable beds, and staff that goes above and beyond. Located in the perfect spot for exploring, with an outstanding breakfast to start your day right.",
    "value_points": [
      "Spotless, comfortable rooms",
      "Staff that remembers your name",
      "Outstanding breakfast with local ingredients",
      "Perfect location - walk everywhere",
      "Peaceful atmosphere in city center"
    ],
    "social_proof": "Guests mention our attention to detail, personalized service, and the best hotel breakfast they've ever had.",
    "ctas": ["Book your stay", "Reserve now", "Check availability", "Plan your visit"]
  }
}
```

---

## ADDITIONAL POLISH FEATURES

### Animations & Transitions
- Smooth hover effects on buttons (scale or color transition)
- Fade-in animation for results section
- Loading spinner animation
- Button press feedback

### Accessibility
- Proper semantic HTML (header, main, section, button, input)
- ARIA labels where needed
- Keyboard navigation support
- Focus states on interactive elements

### Performance
- Optimize images (if any)
- Lazy load results section
- Debounce review count calculation (optional)

### Edge Cases
- Handle empty reviews gracefully
- Handle very long reviews (truncate or scroll)
- Handle API timeout
- Handle invalid JSON response

---

## ENVIRONMENT SETUP

Create `.env.local` file:
```
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
```

---

## FILE STRUCTURE

```
app/
├── layout.tsx          # Root layout with fonts and metadata
├── page.tsx            # Main page component (client component)
├── globals.css         # Global styles and Tailwind
└── api/
    └── generate/
        └── route.ts   # API endpoint

public/
└── (any static assets)

package.json           # Dependencies
tsconfig.json          # TypeScript config
next.config.ts         # Next.js config
postcss.config.mjs     # PostCSS config
```

---

## SPECIFIC COMPONENT REQUIREMENTS

### Button Component Variants
1. **Primary CTA**: Accent background, white text, rounded-full, hover: darker accent
2. **Secondary**: White background, border, rounded-full, hover: accent border
3. **Selection Button**: Toggle between selected (accent bg) and unselected (white bg, border)
4. **Copy Button**: Small, border style, icon or text

### Card Components
1. **Feature Card**: White/80 background, border, rounded-2xl, shadow-sm
2. **Sample Output Card**: White background, rounded-3xl, shadow-lg
3. **Ad Card**: Soft background, rounded-2xl, padding
4. **Section Card**: White background, rounded-3xl, shadow-sm, padding-8

### Input Components
1. **Text Input**: Rounded-2xl, border, soft background, focus: accent border
2. **Textarea**: Same as text input, rows={6}, resize vertical
3. **Button Group**: Flex wrap, gap-2, responsive

### Badge Components
1. **Review Count Badge**: Rounded-full, soft background, muted text, small
2. **Output Badge**: Pill shape, soft background, muted text
3. **Status Badge**: Rounded-full, colored background

---

## JUDGE DEMO FLOW

1. **Landing**: Show hero section with compelling headline
2. **Input**: Fill form with sample data (use provided mock reviews)
3. **Generate**: Click generate, show loading state
4. **Results**: Display all three output formats (Text Ads, Marketing Copy, JSON)
5. **Interact**: Show copy functionality, scroll through results
6. **Highlight**: Emphasize that content is traceable to reviews (no hallucination)

---

## FINAL CHECKLIST

- [ ] All form fields functional
- [ ] Validation working
- [ ] API integration complete
- [ ] Error handling implemented
- [ ] Loading states shown
- [ ] Results display correctly
- [ ] Copy functionality works
- [ ] Responsive on mobile
- [ ] Smooth animations
- [ ] Accessible (keyboard nav, ARIA)
- [ ] Polished UI (consistent spacing, colors, typography)
- [ ] Sample data for demo
- [ ] Environment variables documented

---

## GENERATION INSTRUCTIONS

Generate this as a complete Next.js application with:
1. All components fully implemented
2. TypeScript types defined
3. Tailwind CSS styling applied
4. API route functional
5. Error handling complete
6. Loading states implemented
7. Responsive design
8. Copy functionality
9. Smooth interactions
10. Production-ready code quality

Make it impressive for judges - polished, professional, and fully functional. Every button should work, every form field should be interactive, and the results should display beautifully.

---

**END OF PROMPT**

Copy everything above this line and paste into your no-code AI tool to generate the complete MVP.
