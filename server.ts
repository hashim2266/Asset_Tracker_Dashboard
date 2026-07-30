import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });
import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

// Intelligent Knowledge Base RAG Synthesizer for Local/Offline Deployments
function synthesizeSmartKnowledgeResponse(userQuery: string, knowledgeContext: string, activeAgency?: string) {
  const queryLower = (userQuery || "").toLowerCase();
  
  // Extract individual documents from knowledge context
  const docBlocks = (knowledgeContext || "").split(/\[DOKUMEN KATEGORI:/g).filter(Boolean);
  const docs: { category: string; fileName: string; snippet: string; date: string; fullText: string }[] = [];

  docBlocks.forEach((block) => {
    const lines = block.split("\n");
    const header = lines[0] || "";
    const category = header.split("-")[0]?.trim() || "UMUM";
    const fileName = header.split("-")[1]?.replace("]", "")?.trim() || "Dokumen Rasmi";
    
    let snippet = "";
    let date = "";
    lines.forEach((l) => {
      if (l.includes("- Ekstrak Snippet:")) snippet = l.replace("- Ekstrak Snippet:", "").trim();
      if (l.includes("- Tarikh:")) date = l.replace("- Tarikh:", "").trim();
    });

    docs.push({
      category,
      fileName,
      snippet: snippet || block.slice(0, 200),
      date,
      fullText: block
    });
  });

  // Calculate relevance score for each doc based on query keywords
  const queryWords = queryLower.split(/\s+/).filter((w) => w.length > 2);
  const scoredDocs = docs.map((d) => {
    let score = 0;
    const textLower = (d.fileName + " " + d.snippet + " " + d.category).toLowerCase();
    
    queryWords.forEach((word) => {
      if (textLower.includes(word)) score += 2;
    });

    // Category boosts
    if (queryLower.includes("ali") && d.category.includes("ASET_ALIH")) score += 3;
    if ((queryLower.includes("tak alih") || queryLower.includes("bangunan") || queryLower.includes("terusan")) && d.category.includes("ASET_TAK_ALIH")) score += 3;
    if ((queryLower.includes("biologi") || queryLower.includes("kambing") || queryLower.includes("padi") || queryLower.includes("ternakan")) && d.category.includes("ASET_BIOLOGI")) score += 3;
    if ((queryLower.includes("ketara") || queryLower.includes("ip") || queryLower.includes("royalti") || queryLower.includes("paten")) && d.category.includes("ASET_TAK_KETARA")) score += 3;

    return { ...d, score };
  });

  // Sort by score descending
  scoredDocs.sort((a, b) => b.score - a.score);
  const topDocs = scoredDocs.filter((d) => d.score > 0);
  const matchedDocs = topDocs.length > 0 ? topDocs : scoredDocs.slice(0, 3);

  // Extract key facts and metrics from matched documents
  const sourcesUsed = matchedDocs.map((d) => d.fileName);
  const snippetsList = matchedDocs.map((d, idx) => `${idx + 1}. **[${d.category}] ${d.fileName}**: ${d.snippet}`).join("\n");

  let topicTitle = "Analisis Pengurusan Aset KPKM";
  if (queryLower.includes("pekeliling") || queryLower.includes("mof") || queryLower.includes("1ppm")) {
    topicTitle = "Pematuhan Pekeliling Perbendaharaan (1PPM MOF)";
  } else if (queryLower.includes("inspeksi") || queryLower.includes("pemeriksaan")) {
    topicTitle = "Analisis Kadar Inspeksi & Audit Aset iGFMAS";
  } else if (queryLower.includes("biologi") || queryLower.includes("mfrs141") || queryLower.includes("ternakan")) {
    topicTitle = "Penilaian Aset Biologi MFRS 141 (DVS, DOA, DOF, MARDI)";
  } else if (queryLower.includes("ip") || queryLower.includes("royalti") || queryLower.includes("ketara")) {
    topicTitle = "Pengurusan Aset Tak Ketara & Harta Intelek (MyIPO/PVP)";
  }

  const synthesizedText = `### 🤖 ${topicTitle} (Enjin Analisis Pengetahuan RAG)

**Ringkasan Eksekutif & Maklum Balas Utama**:
Berdasarkan pangkalan pengetahuan dan dokumen rasmi yang diindeks (${activeAgency || "Semua Agensi KPKM"}), soalan anda berkenaan **"${userQuery}"** telah dianalisis.

**Dapatan Utama Daripada Dokumen Terlibat**:
${snippetsList || "Dokumen yang diindeks mengandungi rekod pendaftaran, kadar pemeriksaan iGFMAS, serta status pengurusan aset kerajaan."}

**Langkah & Cadangan Tindakan Strategik**:
1. **Pengemaskinian Memori iGFMAS**: Memastikan semua transaksi fizikal, pindahan, dan susut nilai didaftarkan secara real-time.
2. **Pengukuhan Audit & Inspeksi Lapangan**: Mengaktifkan jawatankuasa JKPAK agensi bagi mempertingkatkan kadar pemeriksaan kawasan dan lokasi.
3. **Pengoptimuman Nilai & Hasil**: Memastikan pematuhan tatacara MOF 1PPM serta memanfaatkan pendapatan royalti/hasil jualan aset biologi dan IP.

*(Nota: Mod Local Smart Knowledge Engine aktif. Untuk perkhidmatan Gemini AI secara langsung, sila masukkan GEMINI_API_KEY di dalam fail .env).*`;

  return {
    text: synthesizedText,
    sourcesUsed: Array.from(new Set(sourcesUsed.length > 0 ? sourcesUsed : ["Pangkalan Pengetahuan KPKM"])),
  };
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: "20mb" }));

  // Initialize Gemini AI client safely
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // API Route: AI Report & Knowledge Analysis
  app.post("/api/ai/analyze-report", async (req, res) => {
    try {
      const { userQuery, knowledgeContext, activeAgency } = req.body;

      const ai = getGeminiClient();
      if (!ai) {
        // Use smart local RAG knowledge synthesis if GEMINI_API_KEY is not set
        const result = synthesizeSmartKnowledgeResponse(userQuery, knowledgeContext, activeAgency);
        return res.json({
          text: result.text,
          sourcesUsed: result.sourcesUsed,
          isGeminiActive: false,
        });
      }

      const systemInstruction = `Anda adalah Pegawai Analisis Pintar KPKM (Kementerian Pertanian dan Keterjaminan Makanan Malaysia).
Tugas anda adalah memberikan jawapan yang tepat, profesional, kontekstual dan berstruktur dalam Bahasa Melayu rasmi.

SYARAT PENTING PEMBUKAAN JAWAPAN (MANDATORI):
1. JANGAN SESEKALI memulakan jawapan dengan ayat "Berdasarkan Pangkalan Data Laporan Aset JKPAK Bil. 3/2026..." atau menyebut angka aset 363,343 unit MELAINKAN pengguna secara khusus bertanyakan soalan mengenai Data Aset, Laporan JKPAK, atau iGFMAS!
2. Jika soalan berkaitan Pekeliling, Tatacara, atau Panduan MOF/Kerajaan: Mulakan secara khusus dengan rujukan yang bersesuaian seperti "Berdasarkan Pekeliling Perbendaharaan (1PPM) / Garis Panduan yang dikeluarkan oleh Kementerian Kewangan (MOF)..." atau terus menjawab soalan.
3. Jika soalan berkaitan Hasil Pertanian (Padi, Ternakan Kambing/Lembu, Perikanan): Jawab secara spesifik mengenai data atau isu sektor pertanian tersebut tanpa mencampuradukkan maklumat aset JKPAK melainkan diminta.
4. Gunakan maklumat daripada Dokumen yang dimuat naik / Knowledge Base yang dibekalkan secara meluas untuk menjawab dengan data yang relevan.
5. Jawab terus kepada intent/maksud soalan pengguna secara ringkas, padat, dan berstruktur (bernombor/bullet point).`;

      const prompt = `[PANGKALAN PENGETAHUAN TERKINI (KNOWLEDGE BASE DENGAN DOKUMEN UPLOAD)]
${knowledgeContext || "Panduan & Laporan Rasmi KPKM / MOF Malaysia"}

[AGENSI AKTIF]: ${activeAgency || "SEMUA AGENSI KPKM"}
[SOALAN PENGGUNA]: ${userQuery}`;

      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.3,
          },
        });

        return res.json({
          text: response.text,
          sourcesUsed: ["Laporan Rasmi KPKM", "Pekeliling Perbendaharaan MOF", "Dokumen Muat Naik AI Knowledge Store"],
          isGeminiActive: true,
        });
      } catch (geminiErr: any) {
        console.warn("Gemini API call failed, falling back to Smart Knowledge Synthesizer:", geminiErr?.message || geminiErr);
        const result = synthesizeSmartKnowledgeResponse(userQuery, knowledgeContext, activeAgency);
        return res.json({
          text: result.text,
          sourcesUsed: result.sourcesUsed,
          isGeminiActive: false,
          fallbackReason: geminiErr?.message || "Gemini API failed",
        });
      }
    } catch (err: any) {
      console.error("Server API Error:", err);
      return res.status(500).json({ error: err.message || "Gagal membuat analisis AI" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    const hasKey = !!process.env.GEMINI_API_KEY;
    res.json({ status: "ok", geminiApiKeyConfigured: hasKey });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.use((req, res, next) => {
      if (req.method === "GET" && !req.path.startsWith("/api")) {
        return res.sendFile(path.join(distPath, "index.html"), (err) => {
          if (err && !res.headersSent) {
            res.status(500).send("Gagal memuatkan aplikasi");
          }
        });
      }
      next();
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
