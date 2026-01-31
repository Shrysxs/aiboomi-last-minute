import { NextResponse } from "next/server";

type GenerateRequest = {
  businessName?: string;
  businessCategory: string;
  primaryGoal: string;
  brandTone: string;
  reviews: string;
  preferredCTA?: string;
  outputFormats?: string[];
};

const buildPrompt = ({
  businessCategory,
  primaryGoal,
  brandTone,
  reviews,
}: GenerateRequest) => {
  return `You are an expert advertising strategist working with real businesses.

Customer reviews:
"""
${reviews}
"""

Business context:
- Business category: ${businessCategory}
- Primary goal: ${primaryGoal}
- Brand tone: ${brandTone}

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
}`;
};

const parseJSON = (content: string) => {
  try {
    return JSON.parse(content);
  } catch {
    const match = content.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw new Error("Invalid JSON response from AI.");
  }
};

export async function POST(request: Request) {
  const body = (await request.json()) as GenerateRequest;
  const { businessCategory, primaryGoal, brandTone, reviews } = body;

  if (!businessCategory || !primaryGoal || !brandTone || !reviews) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "GROQ_API_KEY is not set. Add it to your environment to enable generation.",
      },
      { status: 500 }
    );
  }

  const prompt = buildPrompt(body);

  const requestBody = {
    model: "llama-3.1-70b-versatile",
    temperature: 0.4,
    messages: [
      {
        role: "system",
        content:
          "Return only valid JSON. Do not wrap in markdown or add commentary.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error?.error?.message || "AI request failed." },
        { status: 500 }
      );
    }

    const payload = await response.json();
    const content = payload.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "No content returned from AI." },
        { status: 500 }
      );
    }

    const parsed = parseJSON(content);
    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error." },
      { status: 500 }
    );
  }
}
