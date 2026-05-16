import Summary from "../models/Summary.js";
import User from "../models/User.js";
import Groq from "groq-sdk";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

// 1. Analyze PDF
export const analyzePDF = async (req, res) => {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const user = await User.findById(req.user.id);

    if (!user.isPro && user.summariesUsed >= 10) {
      return res
        .status(403)
        .json({ message: "Free limit reached. Upgrade to Pro." });
    }

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Extract text from PDF
    const pdfData = await pdfParse(req.file.buffer);
    const pdfText = pdfData.text.slice(0, 12000);

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are a legal expert specializing in Indian law. Analyze Indian court judgments and return structured summaries in JSON format only. No extra text, no markdown, no backticks. Only raw JSON.`,
        },
        {
          role: "user",
          content: `Analyze this Indian court judgment and return ONLY a raw JSON object with these exact keys, no markdown, no backticks, no extra text:
          {
            "facts": "Facts of the case",
            "issues": "Legal issues raised",
            "decision": "Court's final decision",
            "ratio": "Ratio decidendi - the binding legal reasoning",
            "precedents": "Key precedents and cases cited"
          }

          Judgment text:
          ${pdfText}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const rawText = completion.choices[0].message.content;
    const clean = rawText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    // Save to DB
    const summary = await Summary.create({
      user: user._id,
      fileName: req.file.originalname,
      ...parsed,
    });

    // Update usage count
    await User.findByIdAndUpdate(user._id, { $inc: { summariesUsed: 1 } });

    res.status(201).json(summary);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 2. Get all summaries of logged in user
export const getSummaries = async (req, res) => {
  try {
    const summaries = await Summary.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(summaries);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 3. Get single summary
export const getSummaryById = async (req, res) => {
  try {
    const summary = await Summary.findById(req.params.id);
    if (!summary) return res.status(404).json({ message: "Summary not found" });
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 4. Delete summary
export const deleteSummary = async (req, res) => {
  try {
    await Summary.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
