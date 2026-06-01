export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is not set.' });
  }

  try {
    const { systemPrompt, sanitizedInput, defLevel } = req.body;

    const MODEL = "gemini-1.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [{
          role: "user",
          parts: [{ text: sanitizedInput }]
        }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 512,
          candidateCount: 1
        }
      })
    });

    if (!response.ok) {
      let errorMessage = `API Error ${response.status}`;
      try {
        const errorBody = await response.json();
        const detail = errorBody?.error?.message || "";
        if (response.status === 429) {
          errorMessage = "Rate limit reached (429) — please wait a moment and try again.";
        } else if (response.status === 400) {
          errorMessage = `Bad request (400): ${detail || "Check your API key or request format."}`;
        } else if (response.status === 403) {
          errorMessage = "Access denied (403) — your API key may be invalid or quota-exhausted.";
        } else if (response.status === 404) {
          errorMessage = `Model not found (404): ${detail || "The model endpoint may have changed."}`;
        } else {
          errorMessage = detail || errorMessage;
        }
      } catch (_) {}
      
      return res.status(response.status).json({ error: errorMessage });
    }

    const result = await response.json();
    const modelOutput = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "The AI returned an empty response.";

    return res.status(200).json({ result: modelOutput });
  } catch (error) {
    console.error("Error in /api/generate:", error);
    return res.status(500).json({ error: "Internal server error during generation." });
  }
}
