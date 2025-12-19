"use client";

import { useState, useMemo } from "react";
import { Search, ExternalLink, Star, Code, Zap, DollarSign, TrendingUp } from "lucide-react";

interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  pricing: string;
  rating: number;
  features: string[];
  logo: string;
  popular: boolean;
  new?: boolean;
}

const tools: Tool[] = [
  {
    id: "cursor",
    name: "Cursor",
    category: "IDE",
    description: "VS Code tabanlı AI destekli kod editörü. Multi-model desteği ve real-time diff özellikleriyle kodlama deneyimini yeni seviyeye taşır.",
    url: "https://cursor.sh",
    pricing: "Ücretsiz - $200/ay",
    rating: 4.8,
    features: ["Multi-model AI", "Real-time diffs", "Chat ile kodlama", "Otomatik test"],
    logo: "⚡",
    popular: true,
  },
  {
    id: "windsurf",
    name: "Windsurf",
    category: "IDE",
    description: "Büyük kod tabanları için tasarlanmış Cascade AI özelliği ile otonom planlama ve refactoring yapabilir.",
    url: "https://codeium.com/windsurf",
    pricing: "Ücretsiz - $60/kullanıcı/ay",
    rating: 4.7,
    features: ["Cascade AI", "Büyük kod tabanı", "Otonom refactoring", "Extended reasoning"],
    logo: "🌊",
    popular: true,
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    category: "IDE",
    description: "VS Code, JetBrains ve tarayıcıda çalışan pair programmer. OpenAI ve Anthropic modelleri kullanır.",
    url: "https://github.com/features/copilot",
    pricing: "Ücretsiz - $39/kullanıcı/ay",
    rating: 4.6,
    features: ["Pair programming", "Multi-IDE", "OpenAI + Anthropic", "Kod açıklaması"],
    logo: "🐙",
    popular: true,
  },
  {
    id: "cline",
    name: "Cline",
    category: "IDE",
    description: "VS Code için açık kaynaklı AI otomasyon. Ollama desteği ile yerel veya uzak modeller kullanabilir.",
    url: "https://github.com/cline/cline",
    pricing: "Ücretsiz (Açık Kaynak)",
    rating: 4.5,
    features: ["Açık kaynak", "Yerel modeller", "Ollama desteği", "Gizlilik odaklı"],
    logo: "🔓",
    popular: false,
  },
  {
    id: "lovable",
    name: "Lovable",
    category: "Full-Stack",
    description: "Full-stack geliştirme için en dengeli deneyim. Frontend tasarım + Supabase entegrasyonu ile backend.",
    url: "https://lovable.dev",
    pricing: "$25/ay (100 kredi)",
    rating: 4.9,
    features: ["Full-stack", "Supabase entegre", "Frontend + Backend", "Dengeli deneyim"],
    logo: "💜",
    popular: true,
    new: true,
  },
  {
    id: "bolt",
    name: "Bolt.new",
    category: "Full-Stack",
    description: "Açık kaynak motor ile şeffaf full-stack geliştirme. Geniş entegrasyon desteği.",
    url: "https://bolt.new",
    pricing: "Değişken fiyatlandırma",
    rating: 4.8,
    features: ["Açık kaynak", "Cloud + Local AI", "Geniş entegrasyon", "Şeffaflık"],
    logo: "⚡",
    popular: true,
  },
  {
    id: "v0",
    name: "v0 by Vercel",
    category: "UI Generator",
    description: "Doğal dilde UI tanımlayın, production-ready React bileşenleri üretin. %90 başarı oranı.",
    url: "https://v0.dev",
    pricing: "$20/ay",
    rating: 4.9,
    features: ["React bileşen", "Design systems", "Figma benzeri", "Yüksek başarı"],
    logo: "▲",
    popular: true,
  },
  {
    id: "replit",
    name: "Replit Agent",
    category: "Full-Stack",
    description: "Tek promptta tüm proje yapısını oluşturur: backend, frontend, config. En hızlı agent.",
    url: "https://replit.com",
    pricing: "Effort-based (hesaplama zamanı)",
    rating: 4.6,
    features: ["En hızlı agent", "Multi-file generation", "Cloud IDE", "Multiplayer"],
    logo: "🔄",
    popular: false,
  },
  {
    id: "claude",
    name: "Claude Sonnet 4.5",
    category: "AI Model",
    description: "2025'in #1 kodlama modeli. SWE-bench'te %77.2 skor. 1M token context window.",
    url: "https://www.anthropic.com/claude",
    pricing: "$3/$15 per 1M token",
    rating: 5.0,
    features: ["#1 kodlama modeli", "1M context", "30+ saat otonom", "Computer use"],
    logo: "🤖",
    popular: true,
  },
  {
    id: "gpt5",
    name: "GPT-5",
    category: "AI Model",
    description: "Gelişmiş reasoning, daha az hallucination. Mimari tavsiye ve refactoring için en iyi.",
    url: "https://openai.com",
    pricing: "Değişken fiyatlandırma",
    rating: 4.8,
    features: ["İyileştirilmiş reasoning", "Multi-step dialogue", "Refactoring", "Mimari tavsiye"],
    logo: "🔮",
    popular: true,
  },
  {
    id: "gemini",
    name: "Gemini 2.5 Pro",
    category: "AI Model",
    description: "SWE-bench'te %63.2. En iyi maliyet/performans oranı. Dramatik fiyat düşüşü.",
    url: "https://deepmind.google/gemini",
    pricing: "$0.10/$0.40 per 1M token",
    rating: 4.5,
    features: ["Uygun fiyat", "İyi performans", "Google ekosistemi", "Maliyet etkin"],
    logo: "💎",
    popular: false,
  },
  {
    id: "wegic",
    name: "Wegic",
    category: "Design-to-Code",
    description: "Görsel fikirleri hızla koda çevirir. Figma import, prompt-based yapı, multi-framework export.",
    url: "https://wegic.ai",
    pricing: "Değişken fiyatlandırma",
    rating: 4.4,
    features: ["Figma import", "Multi-framework", "Hızlı iterasyon", "Görsel odaklı"],
    logo: "🎨",
    popular: false,
  },
  {
    id: "tempo",
    name: "Tempo Labs",
    category: "Design-to-Code",
    description: "Figma benzeri arayüz ile production React kodu üzerinde işbirliği. Tasarımcılar için ideal.",
    url: "https://tempo.labs",
    pricing: "Değişken fiyatlandırma",
    rating: 4.3,
    features: ["Figma-like UI", "React code", "İşbirliği", "Tasarımcı dostu"],
    logo: "⏱️",
    popular: false,
  },
  {
    id: "webflow",
    name: "Webflow AI",
    category: "Design-to-Code",
    description: "Tasarımcılar için en iyi seçim. No-code platform + AI özellikleri.",
    url: "https://webflow.com",
    pricing: "$14/ay+",
    rating: 4.7,
    features: ["Tasarımcı favorisi", "No-code", "CMS entegre", "Responsive"],
    logo: "🌐",
    popular: false,
  },
  {
    id: "builderio",
    name: "Builder.io",
    category: "Design-to-Code",
    description: "Visual development platform. Drag-and-drop ile production-ready kod.",
    url: "https://www.builder.io",
    pricing: "Ücretsiz - Enterprise",
    rating: 4.5,
    features: ["Visual dev", "Drag-and-drop", "A/B testing", "Headless CMS"],
    logo: "🏗️",
    popular: false,
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const categories = ["Tümü", "IDE", "Full-Stack", "UI Generator", "AI Model", "Design-to-Code"];

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === "Tümü" || tool.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const stats = {
    totalTools: tools.length,
    categories: categories.length - 1,
    popular: tools.filter((t) => t.popular).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🚀</div>
              <div>
                <h1 className="text-2xl font-bold text-white">Vibe Coding Hub</h1>
                <p className="text-sm text-purple-300">Tüm AI Kodlama Araçları Tek Platformda</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-purple-300">
                <Code className="w-4 h-4" />
                <span>{stats.totalTools} Araç</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300">
                <Star className="w-4 h-4" />
                <span>{stats.popular} Popüler</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300">
                <TrendingUp className="w-4 h-4" />
                <span>2025 Güncel</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            2025&apos;in En İyi AI Kodlama Araçları
          </h2>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Cursor, Windsurf, Lovable, Bolt, v0 ve daha fazlası. Claude Sonnet 4.5 ve GPT-5 gibi son teknoloji AI modelleri.
            Hepsine tek platformdan erişin ve karşılaştırın.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Araç, özellik veya kategori ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                    : "bg-white/10 text-purple-200 hover:bg-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="bg-purple-500/30 p-3 rounded-lg">
                <Code className="w-8 h-8 text-purple-300" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{stats.totalTools}</p>
                <p className="text-purple-200">Toplam Araç</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/30 p-3 rounded-lg">
                <Zap className="w-8 h-8 text-blue-300" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{stats.categories}</p>
                <p className="text-blue-200">Kategori</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="bg-orange-500/30 p-3 rounded-lg">
                <Star className="w-8 h-8 text-orange-300" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{stats.popular}</p>
                <p className="text-orange-200">Popüler Araç</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/20 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{tool.logo}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {tool.name}
                    </h3>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 mt-1">
                      {tool.category}
                    </span>
                  </div>
                </div>
                {tool.popular && (
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                )}
                {tool.new && (
                  <div className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300 font-semibold">
                    YENİ
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(tool.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-500"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-purple-300 font-semibold">{tool.rating}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-300 mb-4 line-clamp-3">{tool.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tool.features.slice(0, 3).map((feature, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded-full bg-white/5 text-purple-200 border border-white/10"
                  >
                    {feature}
                  </span>
                ))}
                {tool.features.length > 3 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-purple-200 border border-white/10">
                    +{tool.features.length - 3}
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">{tool.pricing}</span>
                </div>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-all text-sm font-semibold group-hover:shadow-lg group-hover:shadow-purple-500/50"
                >
                  Ziyaret Et
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-purple-300">Aramanızla eşleşen araç bulunamadı.</p>
            <p className="text-gray-400 mt-2">Farklı bir arama terimi veya kategori deneyin.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-lg border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-purple-300 mb-2">
              🚀 2025&apos;in en güncel AI kodlama araçları listesi
            </p>
            <p className="text-gray-400 text-sm">
              Cursor, Windsurf, Lovable, Bolt, v0, Claude Sonnet 4.5, GPT-5 ve daha fazlası
            </p>
            <p className="text-gray-500 text-xs mt-4">
              Vibe Coding Hub - Tüm AI araçlarına tek platformdan erişin
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
