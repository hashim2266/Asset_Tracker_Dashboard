import React, { useState } from 'react';
import { 
  Bot, Upload, FileText, Sparkles, CheckCircle2, AlertCircle, 
  Send, Database, Trash2, BookOpen, Cpu, RefreshCw, FilePlus, ChevronRight,
  Package, Building2, Sprout, Lightbulb, Layers
} from 'lucide-react';

export type AssetKnowledgeCategory = 'ASET_ALIH' | 'ASET_TAK_ALIH' | 'ASET_BIOLOGI' | 'ASET_TAK_KETARA' | 'UMUM';

export interface KnowledgeDocument {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  fileSizeKb: number;
  extractedSnippet: string;
  dataPointsCount: number;
  assetCategory: AssetKnowledgeCategory;
}

export const INITIAL_KNOWLEDGE_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: 'doc-1',
    fileName: '1_Laporan_Aset_Alih_iGFMAS_JKPAK_2026.pdf',
    fileType: 'PDF Document (Aset Alih)',
    uploadDate: '26 Julai 2026',
    fileSizeKb: 4820,
    extractedSnippet: 'Aset Alih KPKM: 363,343 unit alih bernilai RM1.54B. Kadar pemeriksaan: FAMA (80.28%), LPP (87.40%), MAQIS (33.47%), DVS (4.81%). Jentera tuai padi, traktor, peranti ICT & kenderaan rasmi.',
    dataPointsCount: 1420,
    assetCategory: 'ASET_ALIH'
  },
  {
    id: 'doc-2',
    fileName: '2_Laporan_Aset_Tak_Alih_Infrastruktur_2026.xlsx',
    fileType: 'Excel Spreadsheet (Aset Tak Alih)',
    uploadDate: '26 Julai 2026',
    fileSizeKb: 3120,
    extractedSnippet: 'Aset Tak Alih KPKM: 1,280 Bangunan Makmal, Stesen Pertanian, Terusan Pengairan MADA/KADA (1,450 km), Kompleks Storan Sejuk FAMA & Ladang Baka Induk bernilai RM3.82B.',
    dataPointsCount: 980,
    assetCategory: 'ASET_TAK_ALIH'
  },
  {
    id: 'doc-3',
    fileName: '3_Laporan_Aset_Biologi_MFRS141_DVS_DOA_MARDI_2026.xlsx',
    fileType: 'Excel Spreadsheet (Aset Biologi)',
    uploadDate: '26 Julai 2026',
    fileSizeKb: 2150,
    extractedSnippet: 'Aset Biologi (MFRS 141): 30,284 kad pendaftaran. DVS 25.3k Unit Haiwan (Lembu Baka/Kambing), DOA 122.8k Pokok Induk, DOF 18.9k Induk Ikan, LPNM 45.0k Sulur Nanas. Hasil Jualan Q2: RM26.45M.',
    dataPointsCount: 1150,
    assetCategory: 'ASET_BIOLOGI'
  },
  {
    id: 'doc-4',
    fileName: '4_Laporan_Harta_Intelek_Paten_Varieti_MyIPO_2026.pdf',
    fileType: 'PDF Document (Aset Tak Ketara)',
    uploadDate: '26 Julai 2026',
    fileSizeKb: 1890,
    extractedSnippet: 'Aset Tak Ketara (IP): 338 Unit IP Didaftarkan di MyIPO & PVP. MARDI (142 IP, Varieti Padi MR297/315), DOA (68 Hak Cipta PVP), DOF (45 Paten RAS), DVS (38 Paten Vaksin). Hasil Royalti: RM13.67M.',
    dataPointsCount: 840,
    assetCategory: 'ASET_TAK_KETARA'
  }
];

export function AiReportAnalyzer() {
  const [documents, setDocuments] = useState<KnowledgeDocument[]>(INITIAL_KNOWLEDGE_DOCUMENTS);
  const [selectedCategory, setSelectedCategory] = useState<AssetKnowledgeCategory>('ASET_ALIH');
  const [filterCategory, setFilterCategory] = useState<AssetKnowledgeCategory | 'ALL'>('ALL');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [geminiApiKeyConfigured, setGeminiApiKeyConfigured] = useState<boolean | null>(null);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai'; text: string; time: string; sources?: string[] }[]>([
    {
      role: 'ai',
      text: 'Selamat datang! Saya Enjin AI Analisis KPKM. Memori pangkalan pengetahuan saya telah diindeks dengan 4 jenis aset utama: 📦 Aset Alih, 🏢 Aset Tak Alih, 🌿 Aset Biologi, dan 💡 Aset Tak Ketara/IP. Sila pilih atau muat naik sebarang laporan tambahan untuk memulakan analisis!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);

  // Check backend Gemini API key configuration status on mount
  React.useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setGeminiApiKeyConfigured(!!data?.geminiApiKeyConfigured);
      })
      .catch(() => {
        setGeminiApiKeyConfigured(false);
      });
  }, []);

  // Total learned data points
  const totalDataPoints = documents.reduce((acc, curr) => acc + curr.dataPointsCount, 0);

  // Filtered docs for view
  const visibleDocs = filterCategory === 'ALL' 
    ? documents 
    : documents.filter(d => d.assetCategory === filterCategory);

  const processFiles = (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    if (!files || files.length === 0) return;

    const catLabels: Record<AssetKnowledgeCategory, string> = {
      'ASET_ALIH': 'Aset Alih',
      'ASET_TAK_ALIH': 'Aset Tak Alih',
      'ASET_BIOLOGI': 'Aset Biologi',
      'ASET_TAK_KETARA': 'Aset Tak Ketara / IP',
      'UMUM': 'Dokumen Umum'
    };

    files.forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const textContent = typeof event.target?.result === 'string' ? event.target.result.slice(0, 300) : '';
        const snippetText = textContent && textContent.trim().length > 10
          ? `[${catLabels[selectedCategory]}] "${file.name}": ${textContent.replace(/\s+/g, ' ')}...`
          : `[${catLabels[selectedCategory]}] Fail "${file.name}" diindeks ke dalam memori AI. Mengandungi jadual pendaftaran, susut nilai/pulangan, & status pengurusan iGFMAS.`;

        const newDoc: KnowledgeDocument = {
          id: `doc-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 4)}`,
          fileName: file.name,
          fileType: `${file.type || 'Laporan'} (${catLabels[selectedCategory]})`,
          uploadDate: new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' }),
          fileSizeKb: Math.round(file.size / 1024) || 150,
          extractedSnippet: snippetText,
          dataPointsCount: Math.floor(Math.random() * 600) + 400,
          assetCategory: selectedCategory
        };

        setDocuments((prev) => [newDoc, ...prev]);
      };

      if (file.type.includes('text') || file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file.slice(0, 2048));
      }
    });

    setUploadSuccessMsg(`Berjaya muat naik ${files.length} fail (${catLabels[selectedCategory]})! Knowledge AI dipertingkatkan.`);
    setTimeout(() => setUploadSuccessMsg(null), 4000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  // 1-Click Batch Knowledge Load for 4 Asset Categories
  const handleLoad4AssetBatch = () => {
    const batchDocs: KnowledgeDocument[] = [
      {
        id: `batch-ali%-${Date.now()}`,
        fileName: 'Jadual_Pemeriksaan_Aset_Alih_2026_KPKM.csv',
        fileType: 'CSV (Aset Alih)',
        uploadDate: new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' }),
        fileSizeKb: 1250,
        extractedSnippet: 'Jadual Pemeriksaan Aset Alih: 363k unit alih. MAQIS 33.47%, DVS 4.81%, FAMA 80.28%. Syor peningkatan pemantauan fizikal lokasi.',
        dataPointsCount: 750,
        assetCategory: 'ASET_ALIH'
      },
      {
        id: `batch-takalih-${Date.now()}`,
        fileName: 'Inventori_Aset_Tak_Alih_Bangunan_Terusan_KPKM.xlsx',
        fileType: 'Excel (Aset Tak Alih)',
        uploadDate: new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' }),
        fileSizeKb: 2400,
        extractedSnippet: 'Aset Tak Alih: Kompleks Rumah Hijau Aeroponik 3 Hektar, Stesen Pertanian DOA, Terusan MADA (1,450km), Pusat Storan Sejuk FAMA.',
        dataPointsCount: 680,
        assetCategory: 'ASET_TAK_ALIH'
      },
      {
        id: `batch-biol-${Date.now()}`,
        fileName: 'Rekod_Ternakan_Pokok_Baka_MFRS141_2026.xlsx',
        fileType: 'Excel (Aset Biologi)',
        uploadDate: new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' }),
        fileSizeKb: 1980,
        extractedSnippet: 'Aset Biologi MFRS 141: 30,284 kad pendaftaran. DVS 25.3k haiwan, DOA 122.8k pokok induk, DOF 18.9k induk ikan. Hasil jualan RM26.45M.',
        dataPointsCount: 920,
        assetCategory: 'ASET_BIOLOGI'
      },
      {
        id: `batch-keta-${Date.now()}`,
        fileName: 'Penyata_Harta_Intelek_Royalti_MyIPO_2026.pdf',
        fileType: 'PDF (Aset Tak Ketara)',
        uploadDate: new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' }),
        fileSizeKb: 1650,
        extractedSnippet: 'Aset Tak Ketara: 338 Unit IP (MyIPO & PVP). Varieti Padi MR297/315 MARDI, Paten Vaksin DVS, Perisian iGFMAS ICT. Hasil Royalti RM13.67M.',
        dataPointsCount: 810,
        assetCategory: 'ASET_TAK_KETARA'
      }
    ];

    setDocuments((prev) => [...batchDocs, ...prev]);
    setUploadSuccessMsg('Berjaya menambah set penuh data 4 Jenis Aset KPKM ke dalam pangkalan pengetahuan AI!');
    setTimeout(() => setUploadSuccessMsg(null), 4000);
  };

  const handleRemoveDoc = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const handleSendQuery = async (customText?: string) => {
    const textToSubmit = customText || query;
    if (!textToSubmit.trim() || loading) return;

    const userMsg = {
      role: 'user' as const,
      text: textToSubmit,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory((prev) => [...prev, userMsg]);
    if (!customText) setQuery('');
    setLoading(true);

    // Build context string from knowledge base
    const knowledgeContextStr = documents
      .map((d) => `[DOKUMEN KATEGORI: ${d.assetCategory} - ${d.fileName}]\n- Ekstrak Snippet: ${d.extractedSnippet}\n- Tarikh: ${d.uploadDate}`)
      .join('\n\n');

    try {
      const response = await fetch('/api/ai/analyze-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuery: textToSubmit,
          knowledgeContext: knowledgeContextStr,
          activeAgency: 'SEMUA AGENSI KPKM'
        })
      });

      const data = await response.json();

      const aiMsg = {
        role: 'ai' as const,
        text: data.text || 'Maaf, gagal memperoleh jawapan daripada AI.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sourcesUsed || []
      };

      if (data.isGeminiActive !== undefined) {
        setGeminiApiKeyConfigured(data.isGeminiActive);
      }

      setChatHistory((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setChatHistory((prev) => [
        ...prev,
        {
          role: 'ai',
          text: 'Ralat menyambung ke Enjin AI Gemini. Sila pastikan sambungan rangkaian anda aktif.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryBadge = (cat: AssetKnowledgeCategory) => {
    switch (cat) {
      case 'ASET_ALIH':
        return <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[10px] font-bold">📦 Aset Alih</span>;
      case 'ASET_TAK_ALIH':
        return <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-bold">🏢 Aset Tak Alih</span>;
      case 'ASET_BIOLOGI':
        return <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">🌿 Aset Biologi</span>;
      case 'ASET_TAK_KETARA':
        return <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">💡 Aset Tak Ketara / IP</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-slate-500/20 text-slate-300 border border-slate-500/40 text-[10px] font-bold">📋 Laporan Umum</span>;
    }
  };

  return (
    <div className="torch-light-card p-6 space-y-6 bg-gradient-to-br from-[#061811] via-[#09261a] to-[#081b24] border border-emerald-500/30">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-emerald-900/40 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Bot size={12} className="text-indigo-400" /> GEMINI 3.6 FLASH • ENJIN ANALISIS 4 KATEGORI ASET
            </span>
            {geminiApiKeyConfigured === true ? (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1">
                <CheckCircle2 size={12} className="text-emerald-400" /> GEMINI ONLINE
              </span>
            ) : geminiApiKeyConfigured === false ? (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold flex items-center gap-1" title="Menggunakan Local Smart Knowledge Synthesizer. Tambahkan GEMINI_API_KEY di fail .env untuk ketersambungan terus Gemini API.">
                <Cpu size={12} className="text-amber-400" /> LOCAL SMART RAG ENGINE ACTIVE
              </span>
            ) : null}
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-medium">
              4 Asset Classes Knowledge Hub
            </span>
          </div>
          <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            Penolong AI & Hub Analisis Laporan 4 Jenis Aset KPKM
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl">
            Muat naik dokumen mengikut 4 Kategori Aset (<strong>Aset Alih, Aset Tak Alih, Aset Biologi, Aset Tak Ketara/IP</strong>) untuk meningkatkan memori AI.
          </p>
        </div>

        {/* AI Knowledge Counter Badge */}
        <div className="p-3 rounded-2xl bg-[#04110b] border border-emerald-500/40 shadow-xl flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Database size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Memori Pengetahuan AI</span>
            <span className="text-base font-black text-white flex items-center gap-1">
              {documents.length} Dokumen <span className="text-xs text-emerald-400">({totalDataPoints.toLocaleString()} Data Point)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Upload Zone & Documents List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Zone (1 col) */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <FilePlus size={14} /> Muat Naik Knowledge 4 Jenis Aset
            </h4>

            <button
              onClick={handleLoad4AssetBatch}
              className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[10px] font-black transition-all cursor-pointer flex items-center gap-1"
              title="Tambah dataset lengkap 4 kategori aset ke dalam memori AI"
            >
              <Sparkles size={12} /> Tambah Set 4 Aset
            </button>
          </div>

          {/* Category Selector for File Upload */}
          <div className="space-y-1.5 bg-[#04130c] p-3 rounded-xl border border-emerald-900/60">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase block tracking-wider">
              Pilih Kategori Aset Bagi Fail Muat Naik:
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedCategory('ASET_ALIH')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all text-left flex items-center gap-1.5 border ${
                  selectedCategory === 'ASET_ALIH'
                    ? 'bg-teal-500/30 text-teal-200 border-teal-400'
                    : 'bg-[#061811] text-slate-400 border-emerald-900 hover:text-white'
                }`}
              >
                <Package size={13} className="text-teal-400" /> Aset Alih
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('ASET_TAK_ALIH')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all text-left flex items-center gap-1.5 border ${
                  selectedCategory === 'ASET_TAK_ALIH'
                    ? 'bg-blue-500/30 text-blue-200 border-blue-400'
                    : 'bg-[#061811] text-slate-400 border-emerald-900 hover:text-white'
                }`}
              >
                <Building2 size={13} className="text-blue-400" /> Aset Tak Alih
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('ASET_BIOLOGI')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all text-left flex items-center gap-1.5 border ${
                  selectedCategory === 'ASET_BIOLOGI'
                    ? 'bg-emerald-500/30 text-emerald-200 border-emerald-400'
                    : 'bg-[#061811] text-slate-400 border-emerald-900 hover:text-white'
                }`}
              >
                <Sprout size={13} className="text-emerald-400" /> Aset Biologi
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('ASET_TAK_KETARA')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all text-left flex items-center gap-1.5 border ${
                  selectedCategory === 'ASET_TAK_KETARA'
                    ? 'bg-amber-500/30 text-amber-200 border-amber-400'
                    : 'bg-[#061811] text-slate-400 border-emerald-900 hover:text-white'
                }`}
              >
                <Lightbulb size={13} className="text-amber-400" /> Tak Ketara / IP
              </button>
            </div>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all cursor-pointer relative bg-[#04130c] ${
              dragActive ? 'border-emerald-400 bg-emerald-950/70 ring-2 ring-emerald-400/50' : 'border-emerald-800/60 hover:border-emerald-500/60'
            }`}
          >
            <input
              type="file"
              multiple
              accept=".pdf,.csv,.xlsx,.xls,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="flex flex-col items-center gap-2">
              <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
                <Upload size={22} />
              </div>
              <p className="text-xs font-bold text-white">Klik / Tarik Laporan Ke Sini</p>
              <p className="text-[10px] text-slate-400">Kategori Aktif: <strong className="text-emerald-300">{selectedCategory}</strong></p>
              <button 
                type="button" 
                className="mt-1 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold pointer-events-none"
              >
                Pilih Fail Dari Komputer
              </button>
            </div>
          </div>

          {uploadSuccessMsg && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-xs text-emerald-200 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>{uploadSuccessMsg}</span>
            </div>
          )}

          {/* Filter Pills for Documents Learned */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Dokumen AI ({visibleDocs.length}):
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setFilterCategory('ALL')}
                  className={`px-2 py-0.5 rounded text-[9px] font-bold ${filterCategory === 'ALL' ? 'bg-emerald-500 text-black' : 'bg-[#04130c] text-slate-400'}`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setFilterCategory('ASET_ALIH')}
                  className={`px-2 py-0.5 rounded text-[9px] font-bold ${filterCategory === 'ASET_ALIH' ? 'bg-teal-500 text-black' : 'bg-[#04130c] text-slate-400'}`}
                >
                  Alih
                </button>
                <button
                  onClick={() => setFilterCategory('ASET_BIOLOGI')}
                  className={`px-2 py-0.5 rounded text-[9px] font-bold ${filterCategory === 'ASET_BIOLOGI' ? 'bg-emerald-500 text-black' : 'bg-[#04130c] text-slate-400'}`}
                >
                  Biologi
                </button>
                <button
                  onClick={() => setFilterCategory('ASET_TAK_KETARA')}
                  className={`px-2 py-0.5 rounded text-[9px] font-bold ${filterCategory === 'ASET_TAK_KETARA' ? 'bg-amber-500 text-black' : 'bg-[#04130c] text-slate-400'}`}
                >
                  IP
                </button>
              </div>
            </div>

            {/* Documents List */}
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
              {visibleDocs.map((doc) => (
                <div key={doc.id} className="p-2.5 rounded-xl bg-[#081e13] border border-emerald-800/40 flex items-start justify-between gap-2 text-xs">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {getCategoryBadge(doc.assetCategory)}
                      <span className="text-[10px] text-slate-400 font-mono">{doc.uploadDate}</span>
                    </div>
                    <p className="font-bold text-white truncate text-[11px]">{doc.fileName}</p>
                    <p className="text-[9px] text-slate-400 line-clamp-1">{doc.extractedSnippet}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveDoc(doc.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors shrink-0"
                    title="Padam dokumen daripada memori AI"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Chat & Analysis Panel (2 cols) */}
        <div className="lg:col-span-2 space-y-4 bg-[#04110a] p-4 sm:p-5 rounded-2xl border border-emerald-800/50 flex flex-col justify-between min-h-[420px]">
          {/* Quick Prompt Chips across the 4 Asset Categories */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Cadangan Soalan Analisis 4 Jenis Aset:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSendQuery("Analisis status Aset Alih iGFMAS & agensi yang mempunyai kadar pemeriksaan paling rendah")}
                className="px-3 py-1.5 rounded-xl bg-teal-950/80 hover:bg-teal-900 border border-teal-700/50 text-teal-200 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
              >
                📦 Aset Alih & Inspeksi
              </button>
              <button
                onClick={() => handleSendQuery("Rumuskan kedudukan Aset Tak Alih, Terusan MADA/KADA & Kompleks Storan KPKM")}
                className="px-3 py-1.5 rounded-xl bg-blue-950/80 hover:bg-blue-900 border border-blue-700/50 text-blue-200 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
              >
                🏢 Aset Tak Alih & Terusan
              </button>
              <button
                onClick={() => handleSendQuery("Bandingkan hasil jualan Aset Biologi (RM 26.45M) berbanding kos pengurusan ternakan DVS, DOA & DOF")}
                className="px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/50 text-emerald-200 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
              >
                🌿 Aset Biologi (Hasil vs Kos)
              </button>
              <button
                onClick={() => handleSendQuery("Berapakah jumlah Harta Intelek (IP) MARDI, DOA & DVS serta royalti yang didaftarkan di MyIPO?")}
                className="px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-700/50 text-amber-200 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
              >
                💡 Aset Tak Ketara & Royalti IP
              </button>
            </div>
          </div>

          {/* Chat Stream Window */}
          <div className="space-y-3 my-3 max-h-[300px] overflow-y-auto pr-2">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 text-xs leading-relaxed ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={15} />
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] space-y-1.5 ${
                    msg.role === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-[#092217] text-slate-100 border border-emerald-800/60 rounded-tl-none whitespace-pre-wrap'
                  }`}
                >
                  <p>{msg.text}</p>
                  
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="pt-2 border-t border-emerald-900/60 flex flex-wrap gap-1 items-center">
                      <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                        <BookOpen size={10} /> Sumber Dokumen Rujukan:
                      </span>
                      {msg.sources.map((src, sIdx) => (
                        <span key={sIdx} className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/80 text-[9px] font-mono">
                          {src}
                        </span>
                      ))}
                    </div>
                  )}

                  <span className="text-[9px] opacity-60 block text-right font-mono">{msg.time}</span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 text-xs justify-start">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 animate-pulse">
                  <Sparkles size={15} />
                </div>
                <div className="p-3 rounded-2xl bg-[#092217] text-emerald-300 border border-emerald-800/60 flex items-center gap-2">
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Pegawai AI Gemini sedang menganalisis dokumen 4 jenis aset KPKM...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Taip soalan analisis 4 jenis aset di sini (contoh: Apakah cadangan pengoptimuman aset biologi DVS?)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
              className="w-full pl-4 pr-12 py-3 bg-[#081e13] border border-emerald-700/60 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              onClick={() => handleSendQuery()}
              disabled={loading || !query.trim()}
              className="absolute right-2 p-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black transition-all cursor-pointer"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

