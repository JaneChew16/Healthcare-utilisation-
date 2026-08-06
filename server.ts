import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { STUDY_METADATA, YEARLY_TRENDS, CARE_SETTINGS, AGE_COHORTS, CLINICAL_SEGMENTS } from "./src/data/singhealthData.js";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini API SDK on server-side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health & Data Endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", study: "SingHealth 2019-2024 Annals Study" });
});

app.get("/api/study-data", (req, res) => {
  res.json({
    metadata: STUDY_METADATA,
    yearlyTrends: YEARLY_TRENDS,
    careSettings: CARE_SETTINGS,
    ageCohorts: AGE_COHORTS,
    clinicalSegments: CLINICAL_SEGMENTS,
  });
});

// AI Policy & Health Economics Analysis Endpoint
app.post("/api/ai/analyze-policy", async (req, res) => {
  try {
    const { prompt, context } = req.body;

    if (!ai) {
      return res.status(500).json({
        error: "Gemini API Key is not configured on the server. Please check environment variables.",
      });
    }

    const systemInstruction = `You are a Senior Health Economist and Health Systems Strategist specializing in Singapore Healthcare (Ministry of Health, SingHealth, Regional Health Systems, Healthier SG).
You are analyzing the research paper published in the Annals Academy of Medicine Singapore titled:
"Trends in healthcare costs and utilisation in SingHealth 2019–2024: The effects of an ageing population"

Key Evidence Base from Study:
- Patient Population: 1.21M (2019) -> 1.37M (2024) [+13.2%]
- Total Real Expenditure: SGD $4.37B (2019) -> $6.05B (2024) [+38.4% inflation-adjusted growth]
- Inpatient Dominance: 63.8% of total expenditure ($3.86B in 2024).
- Ageing Concentration: Patients aged >=60 rose from 29.4% to 34.2% of cohort, but consume 57.0% ($3.45B) of total spend.
- 80+ Age Group: Population grew +50.9%, expenditure grew +92.3%, highest per-user annual cost ($11,555/user).
- Clinical Complexity: 14.8% of patients (High-Complex Chronic & Cancer) drive 46.7% of total expenditure.
- Demographic vs. Intensity: Utilization rates per age band remained stable; cost growth is driven by demographic shift toward an elderly population.

Your task: Provide sharp, evidence-backed health policy insights, economic evaluations, or executive memos.
Structure your answers with clean markdown headings, quantitative evidence from the paper, policy recommendations (e.g. Healthier SG primary care shift, community hospital step-down, chronic disease management programs, value-based care), and strategic implications for SingHealth leadership.`;

    const fullPrompt = `${context ? `[Context: ${JSON.stringify(context)}]\n\n` : ''}User Query: ${prompt}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "No analysis could be generated.";

    res.json({
      text: replyText,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("Error in AI analysis endpoint:", err);
    res.status(500).json({ error: err?.message || "Failed to execute AI policy query" });
  }
});

// Vite Middleware & Production Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
