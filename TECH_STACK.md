# VOICEADS - Complete Tech Stack Documentation

## Overview

This document provides a comprehensive overview of the complete technology stack used in the VOICEADS MVP (24-hour codebase). The application is built as a full-stack Next.js application with a focus on simplicity, speed, and AI-powered content generation.

---

## Architecture Overview

**Architecture Pattern**: Full-Stack Next.js Application (App Router)
- **Frontend**: React Server Components + Client Components
- **Backend**: Next.js API Routes (Serverless Functions)
- **Deployment**: Vercel (recommended) or any Node.js hosting
- **Data Flow**: Stateless, no database, no caching layer
- **AI Integration**: Direct API calls to Groq

```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│      Next.js Application        │
│  ┌─────────────┐  ┌──────────┐ │
│  │   Frontend  │  │   API    │ │
│  │  (React 19) │  │  Routes  │ │
│  └─────────────┘  └────┬──────┘ │
└───────────────────────┼─────────┘
                        │
                        ▼
              ┌─────────────────┐
              │   Groq API       │
              │  (Llama-3.1-8b)  │
              └─────────────────┘
```

---

## Frontend Stack

### Core Framework

**Next.js 16.1.6**
- **App Router**: Modern routing with file-based routing
- **Server Components**: Default React Server Components for optimal performance
- **Client Components**: Marked with `"use client"` directive for interactivity
- **API Routes**: Serverless functions in `/app/api/` directory
- **Font Optimization**: Built-in `next/font` for Google Fonts
- **Image Optimization**: Built-in image optimization (not used in MVP)

**Key Features Used**:
- App Router (`/app` directory structure)
- Server Components (default)
- Client Components (for interactive UI)
- API Routes (`/app/api/generate/route.ts`)
- Metadata API (SEO)
- Font optimization

### React

**React 19.2.3**
- Latest React version with improved Server Components support
- **React DOM 19.2.3**: Client-side rendering
- **Hooks Used**:
  - `useState`: Component state management
  - `useMemo`: Memoized computations (review count)
- **No State Management Library**: Uses React's built-in state (sufficient for MVP)

### TypeScript

**TypeScript 5.x**
- **Configuration**: `tsconfig.json`
- **Target**: ES2017
- **Module Resolution**: `bundler` (Next.js optimized)
- **Strict Mode**: Enabled
- **JSX**: `react-jsx` (new JSX transform)
- **Path Aliases**: `@/*` mapped to project root

**Type Definitions**:
- `@types/node`: ^20
- `@types/react`: ^19
- `@types/react-dom`: ^19

### Styling

**Tailwind CSS 4.x**
- **PostCSS Integration**: `@tailwindcss/postcss` plugin
- **Configuration**: `postcss.config.mjs`
- **Custom Theme**: Inline theme configuration in `globals.css`
- **CSS Variables**: Custom color palette defined in `:root`

**Custom CSS Variables**:
```css
--background: #f6f4f1
--foreground: #141414
--accent: #d4542f
--accent-dark: #b54423
--surface: #ffffff
--muted: #6b6b6b
--soft: #f0ece7
```

**Styling Approach**:
- Utility-first CSS with Tailwind
- Custom CSS variables for theming
- Responsive design with Tailwind breakpoints
- Custom gradient backgrounds

### Typography

**Google Fonts (via next/font)**
- **Sora**: Sans-serif font for body text
  - Variable: `--font-sora`
  - Subsets: Latin
  - Display: Swap (performance optimization)
  
- **Fraunces**: Display font for headings
  - Variable: `--font-fraunces`
  - Subsets: Latin
  - Display: Swap

**Implementation**:
- Fonts loaded via `next/font/google` in `layout.tsx`
- CSS variables for font family assignment
- Automatic font optimization and subsetting

---

## Backend Stack

### API Framework

**Next.js API Routes (App Router)**
- **Route Handler**: `app/api/generate/route.ts`
- **HTTP Method**: POST only
- **Response Format**: JSON
- **Error Handling**: Try-catch with structured error responses

**API Endpoint Structure**:
```
POST /api/generate
Content-Type: application/json

Request Body:
{
  businessName?: string
  businessCategory: string
  primaryGoal: string
  brandTone: string
  reviews: string
  preferredCTA?: string
  outputFormats?: string[]
}

Response:
{
  insights: { phrases, benefits, trust_signals }
  text_ads: Array<{ headline, body, cta }>
  marketing_copy: { campaign_summary, headlines, ... }
}
```

### External API Integration

**Groq API**
- **Endpoint**: `https://api.groq.com/openai/v1/chat/completions`
- **Authentication**: Bearer token (`GROQ_API_KEY`)
- **Model**: `llama-3.1-8b-instant` (configurable via `GROQ_MODEL` env var)
- **API Format**: OpenAI-compatible Chat Completions API
- **Temperature**: 0.4 (controlled, deterministic outputs)
- **Max Tokens**: Not explicitly set (uses model defaults)

**Request Structure**:
```json
{
  "model": "llama-3.1-8b-instant",
  "temperature": 0.4,
  "messages": [
    {
      "role": "system",
      "content": "Return only valid JSON..."
    },
    {
      "role": "user",
      "content": "<prompt>"
    }
  ]
}
```

**Error Handling**:
- API key validation
- HTTP error responses
- JSON parsing with fallback regex extraction
- User-friendly error messages

---

## AI/ML Stack

### Large Language Model (LLM)

**Groq API - Llama-3.1-8b-instant**
- **Provider**: Groq (https://groq.com)
- **Model**: Meta's Llama 3.1 8B Instant
- **Why Selected**:
  - Fast inference (optimized for speed)
  - Cost-effective (free tier available)
  - Good performance for structured output
  - OpenAI-compatible API

**Model Configuration**:
- **Temperature**: 0.4 (balanced creativity/consistency)
- **System Prompt**: Enforces JSON-only output
- **User Prompt**: Structured instructions for ad generation

### Prompt Engineering

**Single-Prompt Architecture**
- No prompt chaining (reduces latency and hallucination risk)
- Single comprehensive prompt with all instructions
- Structured JSON output format enforced
- Explicit guardrails against hallucination

**Prompt Structure**:
1. Role definition (expert advertising strategist)
2. Input data (customer reviews)
3. Business context (category, goal, tone)
4. Detailed instructions (13 rules)
5. Output schema (JSON structure)

**Key Prompt Features**:
- Explicit prohibition of invented claims
- Traceability requirement (all content from reviews)
- Tone and style guidelines
- Length constraints (headlines, body copy)
- Anti-jargon instructions

---

## Development Tools

### Code Quality

**ESLint 9.x**
- **Configuration**: `eslint.config.mjs`
- **Presets**: 
  - `eslint-config-next/core-web-vitals`
  - `eslint-config-next/typescript`
- **Ignores**: `.next/`, `out/`, `build/`, `next-env.d.ts`

### Build Tools

**Next.js Built-in**
- **Development Server**: `next dev` (port 3000)
- **Production Build**: `next build`
- **Production Server**: `next start`
- **Type Checking**: Integrated with TypeScript

**PostCSS**
- **Plugin**: `@tailwindcss/postcss`
- **Configuration**: `postcss.config.mjs`
- **Purpose**: Process Tailwind CSS

### Package Management

**npm**
- **Lock File**: `package-lock.json`
- **Scripts**:
  - `dev`: Start development server
  - `build`: Create production build
  - `start`: Start production server
  - `lint`: Run ESLint

---

## Environment Configuration

### Required Environment Variables

```bash
# .env.local (not committed to git)
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant  # Optional, defaults to llama-3.1-8b-instant
```

### Environment Variable Usage

**In API Route** (`app/api/generate/route.ts`):
```typescript
const apiKey = process.env.GROQ_API_KEY;
const model = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
```

**Security**:
- Environment variables not exposed to client
- API key only used server-side
- No sensitive data in client bundle

---

## Project Structure

```
voiceads/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # API endpoint
│   ├── favicon.ico
│   ├── globals.css               # Global styles + Tailwind
│   ├── layout.tsx                # Root layout + fonts
│   └── page.tsx                  # Main page (client component)
├── public/                       # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── eslint.config.mjs            # ESLint configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies
├── postcss.config.mjs           # PostCSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

---

## Data Flow

### Request Flow

1. **User Input** (Client)
   - User fills form: business name, category, goal, tone, reviews
   - Client validates minimum 2 reviews
   - Triggers `handleGenerate()` function

2. **API Request** (Client → Server)
   - POST request to `/api/generate`
   - JSON payload with all form data
   - Loading state management

3. **Server Processing** (API Route)
   - Validates required fields
   - Checks for `GROQ_API_KEY`
   - Builds prompt from input data
   - Calls Groq API

4. **AI Processing** (Groq API)
   - Receives structured prompt
   - Generates JSON response
   - Returns ad content

5. **Response Processing** (API Route)
   - Parses JSON response (with fallback)
   - Handles errors
   - Returns structured data

6. **UI Update** (Client)
   - Displays results in cards
   - Copy-to-clipboard functionality
   - Error handling UI

### Data Storage

**No Persistence**
- No database
- No file storage
- No caching
- Stateless architecture
- Each request is independent

---

## Key Features & Implementation

### Form Management

**React State Hooks**:
- `useState` for all form fields
- `useMemo` for computed values (review count)
- No external state management library

**Form Fields**:
- Business name (optional text input)
- Business category (button selection)
- Primary goal (button selection)
- Output formats (multi-select buttons)
- Brand tone (button selection)
- Customer reviews (textarea)
- Preferred CTA (optional button selection)

### Validation

**Client-Side**:
- Minimum 2 reviews required
- Required field validation
- Error state management

**Server-Side**:
- Required field validation (category, goal, tone, reviews)
- API key validation
- Error response formatting

### Error Handling

**Client**:
- Try-catch in async functions
- Error state display
- User-friendly error messages

**Server**:
- HTTP status codes (400, 500)
- Structured error responses
- Groq API error handling
- JSON parsing fallback

### UI/UX Features

**Responsive Design**:
- Tailwind responsive utilities
- Mobile-first approach
- Grid layouts with breakpoints

**Interactive Elements**:
- Button state management
- Loading states
- Copy-to-clipboard
- Smooth scrolling
- Hover effects

**Visual Design**:
- Custom gradient backgrounds
- Card-based layout
- Accordion-style sections
- Color-coded categories

---

## Performance Optimizations

### Frontend

1. **Font Optimization**
   - `next/font` with `display: swap`
   - Automatic subsetting
   - Preload optimization

2. **Code Splitting**
   - Automatic with Next.js App Router
   - Server Components by default
   - Client Components only when needed

3. **CSS Optimization**
   - Tailwind CSS purging (automatic)
   - Minimal custom CSS
   - CSS variables for theming

### Backend

1. **API Optimization**
   - Single API call (no chaining)
   - Efficient prompt structure
   - JSON parsing optimization

2. **Error Handling**
   - Fast failure (early validation)
   - Minimal processing on errors
   - Efficient error responses

---

## Security Considerations

### Current Implementation

1. **API Key Security**
   - Server-side only
   - Environment variables
   - Not exposed to client

2. **Input Validation**
   - Client-side validation
   - Server-side validation
   - Type checking with TypeScript

3. **No Data Persistence**
   - No database = no data leaks
   - Stateless = no session hijacking
   - No user accounts = no auth vulnerabilities

### Recommendations for Production

1. **Rate Limiting**
   - Implement API rate limiting
   - Per-IP or per-session limits
   - Prevent abuse

2. **Input Sanitization**
   - Sanitize user inputs
   - Prevent injection attacks
   - Validate data types

3. **CORS Configuration**
   - Configure CORS if needed
   - Restrict origins
   - Secure headers

---

## Deployment

### Recommended Platform

**Vercel** (Optimal for Next.js)
- Zero-config deployment
- Automatic builds from Git
- Environment variable management
- Edge network for global performance
- Serverless function support

### Deployment Steps

1. **Prepare Environment**:
   ```bash
   # Set environment variables in Vercel dashboard
   GROQ_API_KEY=your_key
   GROQ_MODEL=llama-3.1-8b-instant
   ```

2. **Build**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   - Connect GitHub repository
   - Vercel auto-detects Next.js
   - Automatic deployments on push

### Alternative Platforms

- **Netlify**: Similar to Vercel, good Next.js support
- **Railway**: Simple deployment, good for full-stack apps
- **Render**: Easy deployment, free tier available
- **AWS Amplify**: AWS ecosystem integration
- **Docker**: Containerized deployment (any platform)

---

## Dependencies Summary

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.1.6 | Full-stack React framework |
| `react` | 19.2.3 | UI library |
| `react-dom` | 19.2.3 | React DOM renderer |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@tailwindcss/postcss` | ^4 | Tailwind CSS PostCSS plugin |
| `@types/node` | ^20 | Node.js TypeScript types |
| `@types/react` | ^19 | React TypeScript types |
| `@types/react-dom` | ^19 | React DOM TypeScript types |
| `eslint` | ^9 | Code linting |
| `eslint-config-next` | 16.1.6 | Next.js ESLint config |
| `tailwindcss` | ^4 | Utility-first CSS framework |
| `typescript` | ^5 | Type-safe JavaScript |

### External Services

| Service | Purpose | Cost |
|---------|---------|------|
| Groq API | LLM inference | Free tier available |
| Google Fonts | Typography | Free |
| Vercel (recommended) | Hosting | Free tier available |

---

## Browser Support

### Supported Browsers

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

### Features Used

- **ES2017+**: Modern JavaScript features
- **CSS Variables**: Custom properties
- **Fetch API**: HTTP requests
- **Clipboard API**: Copy functionality
- **CSS Grid & Flexbox**: Layout

### Polyfills

- None required (Next.js handles most)
- Modern browser support assumed

---

## Limitations & Constraints

### Current Limitations

1. **No Database**
   - No data persistence
   - No user accounts
   - No history/saved outputs

2. **No Caching**
   - Every request hits Groq API
   - No response caching
   - Potential rate limit issues

3. **No Authentication**
   - No user accounts
   - No access control
   - Public access only

4. **Manual Input Only**
   - No API integrations
   - No bulk processing
   - No automated review fetching

5. **Single Model**
   - Fixed to Llama-3.1-8b-instant
   - No model selection UI
   - Limited customization

### Scalability Considerations

**Current Capacity**:
- Suitable for MVP/demo
- Low to medium traffic
- Single user at a time (no concurrency issues)

**Bottlenecks**:
- Groq API rate limits
- No request queuing
- No load balancing
- No horizontal scaling

**Future Improvements** (see FUTURE_SCOPE.md):
- Database for persistence
- Caching layer (Redis)
- User authentication
- Queue system for batch processing
- Multi-region deployment

---

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your GROQ_API_KEY

# Start development server
npm run dev

# Open browser
# http://localhost:3000
```

### Code Quality

```bash
# Run linter
npm run lint

# Type checking (via Next.js)
npm run build
```

### Testing

**Current State**: No automated tests
**Recommendation**: Add tests for:
- API route validation
- Prompt building logic
- JSON parsing
- Error handling

---

## API Documentation

### POST /api/generate

**Endpoint**: `/api/generate`
**Method**: POST
**Content-Type**: `application/json`

**Request Body**:
```typescript
{
  businessName?: string;        // Optional
  businessCategory: string;      // Required
  primaryGoal: string;           // Required
  brandTone: string;             // Required
  reviews: string;               // Required
  preferredCTA?: string;        // Optional
  outputFormats?: string[];     // Optional
}
```

**Response (Success - 200)**:
```typescript
{
  insights: {
    phrases: string[];
    benefits: string[];
    trust_signals: string[];
  };
  text_ads: Array<{
    headline: string;
    body: string;
    cta: string;
  }>;
  marketing_copy: {
    campaign_summary: {
      objective: string;
      target_audience: string;
      emotion: string;
      proof_source: string;
    };
    headlines: string[];
    subheadline: string;
    core_copy: string;
    value_points: string[];
    social_proof: string;
    ctas: string[];
  };
}
```

**Response (Error - 400)**:
```typescript
{
  error: "Missing required fields."
}
```

**Response (Error - 500)**:
```typescript
{
  error: "GROQ_API_KEY is not set..." | "AI request failed..." | "Server error."
}
```

---

## Configuration Files

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", "**/*.mts"],
  "exclude": ["node_modules"]
}
```

### next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

### postcss.config.mjs

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

### eslint.config.mjs

```javascript
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

---

## Performance Metrics

### Current Performance

**Page Load**:
- First Contentful Paint: < 1s (estimated)
- Time to Interactive: < 2s (estimated)
- Lighthouse Score: 90+ (estimated)

**API Response**:
- Groq API latency: ~500ms - 2s (depends on prompt size)
- Total request time: ~1-3s (including network)

**Bundle Size**:
- Minimal dependencies
- No heavy libraries
- Optimized with Next.js

---

## Troubleshooting

### Common Issues

1. **GROQ_API_KEY not set**
   - Error: "GROQ_API_KEY is not set..."
   - Solution: Add `GROQ_API_KEY` to `.env.local`

2. **Invalid JSON response**
   - Error: "Invalid JSON response from AI"
   - Solution: Check Groq API status, verify model name

3. **Build errors**
   - TypeScript errors
   - Solution: Run `npm run build` to see errors, fix type issues

4. **Styling not working**
   - Tailwind classes not applying
   - Solution: Verify `postcss.config.mjs` and restart dev server

---

## Conclusion

The VOICEADS MVP is built with a modern, minimal tech stack optimized for speed and simplicity:

- **Frontend**: Next.js 16 + React 19 + Tailwind CSS 4
- **Backend**: Next.js API Routes
- **AI**: Groq API (Llama-3.1-8b-instant)
- **Language**: TypeScript 5
- **Deployment**: Vercel (recommended)

The architecture is stateless, serverless, and designed for rapid iteration. For enterprise features and scaling, refer to `FUTURE_SCOPE.md`.

---

*Last Updated: Based on current codebase analysis*
*Version: 0.1.0 (MVP)*
