"use client";

import { useMemo, useState } from "react";

const categories = [
  "Hotel / Hospitality",
  "Restaurant / Cafe",
  "E-commerce / D2C",
  "Service Business",
  "Personal Brand",
];

const goals = [
  "Get more bookings / sales",
  "Build brand trust",
  "Promote an offer",
  "Increase awareness",
];

const outputs = ["Text Ads", "Marketing Copy", "Structured JSON"];

const tones = ["Professional", "Friendly", "Bold", "Premium"];

const ctas = ["Book now", "Order now", "Learn more", "Contact us"];

export default function Home() {
  const [businessName, setBusinessName] = useState("");
  const [businessCategory, setBusinessCategory] = useState(categories[0]);
  const [primaryGoal, setPrimaryGoal] = useState(goals[0]);
  const [selectedOutputs, setSelectedOutputs] = useState(outputs);
  const [brandTone, setBrandTone] = useState(tones[0]);
  const [reviews, setReviews] = useState("");
  const [preferredCta, setPreferredCta] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Record<string, any> | null>(null);

  const reviewsCount = useMemo(
    () => reviews.split("\n").filter((line) => line.trim().length > 0).length,
    [reviews]
  );

  const toggleOutput = (value: string) => {
    setSelectedOutputs((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleGenerate = async () => {
    setError(null);
    if (reviewsCount < 2) {
      setError("Please paste at least 2–3 customer reviews.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          businessCategory,
          primaryGoal,
          brandTone,
          reviews,
          preferredCTA: preferredCta,
          outputFormats: selectedOutputs,
        }),
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload?.error || "Failed to generate ads.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f9f4ef_0%,_#f6f4f1_40%,_#ece7e1_100%)] text-foreground">
      <header className="border-b border-black/5 bg-white/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <div className="text-lg font-semibold tracking-tight">VOICEADS</div>
          <button
            className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-dark)]"
            onClick={() =>
              document
                .getElementById("voiceads-input")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Generate Ads from Customer Voice
          </button>
        </div>
      </header>

      <main>
        <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 pb-16 pt-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              AI-powered customer language
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl" style={{ fontFamily: "var(--font-fraunces)" }}>
              Ads written by your customers, not your brand.
            </h1>
            <p className="text-lg text-[var(--muted)]">
              Turn real customer reviews into high-trust ads and marketing copy.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--accent-dark)]"
                onClick={() =>
                  document
                    .getElementById("voiceads-input")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Generate Ads from Customer Voice
              </button>
              <button className="rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-foreground">
                Demo-ready in minutes
              </button>
            </div>
            <div className="grid gap-4 rounded-2xl border border-black/5 bg-white/80 p-6 shadow-sm">
              <p className="text-sm font-semibold">Why VOICEADS works</p>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li>• Keeps the exact words your customers already trust.</li>
                <li>• Generates ads, marketing copy, and structured JSON in one pass.</li>
                <li>• Built for fast demos, no integrations or data setup.</li>
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  Sample output
                </p>
                <h3 className="text-xl font-semibold">Customer-driven ad set</h3>
              </div>
              <span className="rounded-full bg-[var(--soft)] px-3 py-1 text-xs font-semibold text-[var(--muted)]">
                Demo
              </span>
            </div>
            <div className="mt-6 space-y-4 text-sm">
              <div className="rounded-2xl bg-[var(--soft)] p-4">
                <p className="font-semibold">“Spotless rooms, unbelievably quiet.”</p>
                <p className="text-[var(--muted)]">Headline + body pulled from real reviews.</p>
              </div>
              <div className="rounded-2xl bg-[var(--soft)] p-4">
                <p className="font-semibold">“Staff remembered our names.”</p>
                <p className="text-[var(--muted)]">Trust signals surfaced automatically.</p>
              </div>
              <div className="rounded-2xl bg-[var(--soft)] p-4">
                <p className="font-semibold">“Booking was effortless.”</p>
                <p className="text-[var(--muted)]">Clear CTA suggestions from reviews.</p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="voiceads-input"
          className="mx-auto w-full max-w-6xl space-y-10 px-6 pb-20"
        >
          <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  Business snapshot
                </p>
                <h2 className="text-3xl font-semibold">Create your ad engine</h2>
              </div>
              <div className="rounded-full bg-[var(--soft)] px-4 py-2 text-xs font-semibold text-[var(--muted)]">
                {reviewsCount} review lines detected
              </div>
            </div>

            <div className="mt-8 grid gap-8">
              <div className="grid gap-4">
                <p className="text-sm font-semibold">Step 1 · Business context</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-sm">
                    Business Name
                    <input
                      value={businessName}
                      onChange={(event) => setBusinessName(event.target.value)}
                      placeholder="e.g. Conrad Hotel"
                      className="rounded-2xl border border-black/10 bg-[var(--soft)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
                    />
                  </label>
                  <div className="grid gap-2 text-sm">
                    Business Category
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() => setBusinessCategory(category)}
                          className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                            businessCategory === category
                              ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                              : "border-black/10 bg-white text-foreground hover:border-[var(--accent)]"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <p className="text-sm font-semibold">Step 2 · Marketing intent</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2 text-sm">
                    Primary Goal
                    <div className="flex flex-wrap gap-2">
                      {goals.map((goal) => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => setPrimaryGoal(goal)}
                          className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                            primaryGoal === goal
                              ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                              : "border-black/10 bg-white text-foreground hover:border-[var(--accent)]"
                          }`}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-2 text-sm">
                    Output Formats
                    <div className="flex flex-wrap gap-2">
                      {outputs.map((output) => (
                        <button
                          key={output}
                          type="button"
                          onClick={() => toggleOutput(output)}
                          className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                            selectedOutputs.includes(output)
                              ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                              : "border-black/10 bg-white text-foreground hover:border-[var(--accent)]"
                          }`}
                        >
                          {output}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <p className="text-sm font-semibold">Step 3 · Brand feel</p>
                <div className="flex flex-wrap gap-2">
                  {tones.map((tone) => (
                    <button
                      key={tone}
                      type="button"
                      onClick={() => setBrandTone(tone)}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                        brandTone === tone
                          ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                          : "border-black/10 bg-white text-foreground hover:border-[var(--accent)]"
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <p className="text-sm font-semibold">Step 4 · Customer voice</p>
                <label className="grid gap-2 text-sm">
                  Customer Reviews
                  <textarea
                    value={reviews}
                    onChange={(event) => setReviews(event.target.value)}
                    placeholder="Spotless rooms, incredibly comfortable beds, staff went above and beyond..."
                    rows={6}
                    className="rounded-3xl border border-black/10 bg-[var(--soft)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
                  />
                  <span className="text-xs text-[var(--muted)]">
                    Paste real customer reviews. This language will be used directly in your ads.
                  </span>
                </label>
              </div>

              <div className="grid gap-4">
                <p className="text-sm font-semibold">Step 5 · Optional CTA</p>
                <div className="flex flex-wrap gap-2">
                  {ctas.map((cta) => (
                    <button
                      key={cta}
                      type="button"
                      onClick={() => setPreferredCta(cta)}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                        preferredCta === cta
                          ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                          : "border-black/10 bg-white text-foreground hover:border-[var(--accent)]"
                      }`}
                    >
                      {cta}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="rounded-full bg-[var(--accent)] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--accent-dark)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Generating…" : "Generate Ads from Customer Voice"}
              </button>
              <p className="text-xs text-[var(--muted)]">
                Single LLM call · No external data · Demo-ready
              </p>
            </div>
          </div>

          {result && (
            <div className="grid gap-8">
              <section className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">Text Ads</h3>
                  <button
                    onClick={() => handleCopy(JSON.stringify(result.text_ads, null, 2))}
                    className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold"
                  >
                    Copy section
                  </button>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {result.text_ads?.map((ad: any, index: number) => (
                    <div key={index} className="rounded-2xl bg-[var(--soft)] p-4 text-sm">
                      <p className="font-semibold">{ad.headline}</p>
                      <p className="mt-2 text-[var(--muted)]">{ad.body}</p>
                      <p className="mt-3 text-xs font-semibold text-[var(--accent)]">
                        {ad.cta}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">Marketing Copy</h3>
                  <button
                    onClick={() =>
                      handleCopy(
                        JSON.stringify(result.marketing_copy, null, 2)
                      )
                    }
                    className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold"
                  >
                    Copy section
                  </button>
                </div>
                <div className="mt-6 grid gap-6 text-sm">
                  <div className="rounded-2xl bg-[var(--soft)] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                      Campaign summary
                    </p>
                    <p className="mt-2 font-semibold">
                      {result.marketing_copy?.campaign_summary?.objective}
                    </p>
                    <p className="text-[var(--muted)]">
                      {result.marketing_copy?.campaign_summary?.target_audience}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                      Headlines
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {result.marketing_copy?.headlines?.map(
                        (headline: string, index: number) => (
                          <span
                            key={index}
                            className="rounded-full bg-[var(--soft)] px-3 py-2 text-xs"
                          >
                            {headline}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                      Core copy
                    </p>
                    <p className="mt-2 text-[var(--muted)]">
                      {result.marketing_copy?.core_copy}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                      Value points
                    </p>
                    <ul className="mt-2 space-y-2 text-[var(--muted)]">
                      {result.marketing_copy?.value_points?.map(
                        (point: string, index: number) => (
                          <li key={index}>• {point}</li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-[var(--soft)] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                      Social proof
                    </p>
                    <p className="mt-2 text-[var(--muted)]">
                      {result.marketing_copy?.social_proof}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                      CTAs
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {result.marketing_copy?.ctas?.map(
                        (cta: string, index: number) => (
                          <span
                            key={index}
                            className="rounded-full bg-[var(--soft)] px-3 py-2 text-xs"
                          >
                            {cta}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">Structured JSON</h3>
                  <button
                    onClick={() => handleCopy(JSON.stringify(result, null, 2))}
                    className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold"
                  >
                    Copy JSON
                  </button>
                </div>
                <pre className="mt-6 max-h-[420px] overflow-auto rounded-2xl bg-[var(--soft)] p-4 text-xs text-[var(--muted)]">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </section>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
