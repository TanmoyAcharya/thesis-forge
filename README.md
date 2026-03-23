# ⚗️ ThesisForge — AI Research Idea Generator for Engineering Students

ThesisForge uses **Google Gemini 1.5 Flash** to generate 5 novel, feasibility-scored thesis research ideas tailored to your engineering field, tools, and interests. Built for students in Electrical, Mechanical, Metallurgy, Chemical, and Computer Science engineering.

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + **Framer Motion**
- **Google Gemini 1.5 Flash** via `@google/generative-ai` npm package (FREE)
- **pdf-parse** for research paper context upload
- **react-hook-form** + **zod** for form validation

## Prerequisites

- Node.js 18+
- A Google Gemini API key — **FREE** ([get one here](https://aistudio.google.com/apikey))

## Setup

```bash
git clone https://github.com/TanmoyAcharya/thesis-forge
cd thesis-forge
npm install
cp .env.example .env.local
# Edit .env.local and add your GOOGLE_AI_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Reference

### POST /api/generate

Generate 5 thesis research ideas.

**Request body:**
```json
{
  "field": "Electrical Engineering",
  "subdomain": "Power Electronics",
  "interests": "solar energy, MPPT, deep learning",
  "tools": ["Simulink", "MATLAB"],
  "degreeLevel": "Master's",
  "paperContext": "optional extracted PDF text"
}
```

**Response:** `GenerateResponse` with 5 `ResearchIdea` objects including feasibility/novelty scores, methodology, experiment design, and more.

### POST /api/parse-pdf

Parse a PDF research paper for context.

**Request:** `multipart/form-data` with `file` field (PDF).

**Response:**
```json
{
  "text": "extracted text (max 8000 chars)",
  "pages": 12,
  "truncated": false
}
```

## Deployment (Vercel)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → import the repo
3. Add `GOOGLE_AI_API_KEY` as an environment variable
4. Deploy ✅

## Getting a Google Gemini API Key (FREE)

1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Sign in with your Google account and create a new key
3. Add it to `.env.local` as `GOOGLE_AI_API_KEY=AIza...`

---

© 2026 ThesisForge. Built with ❤️ for engineering students worldwide.
