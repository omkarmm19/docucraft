import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FileText, Presentation, FileDown, Sparkles, Download, LogOut, History } from "lucide-react";
import api from "../api";

const THEMES = [
  { id: "dark",   label: "Dark",   color: "#00d4ff" },
  { id: "blue",   label: "Blue",   color: "#64b4ff" },
  { id: "green",  label: "Green",  color: "#00e678" },
  { id: "purple", label: "Purple", color: "#c864ff" },
  { id: "light",  label: "Light",  color: "#888888" },
];

export default function GeneratorPage() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail") || "User";

  const [topic,      setTopic]      = useState("");
  const [slideCount, setSlideCount] = useState(8);
  const [theme,      setTheme]      = useState("dark");
  const [loading,    setLoading]    = useState(null);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  }

  async function generate(type) {
    if (!topic.trim()) { toast.error("Please enter a topic!"); return; }
    setLoading(type);
    try {
      const res = await api.post(
        `/generate/${type}`,
        { topic, slide_count: slideCount, theme },
        { responseType: "blob" }
      );
      const ext = type === "ppt" ? "pptx" : type;
      const url = URL.createObjectURL(new Blob([res.data]));
      const a   = document.createElement("a");
      a.href     = url;
      a.download = `${topic}.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`${type.toUpperCase()} generated! 🎉`);
    } catch {
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <Toaster position="top-right" />

      {/* Top bar: user email + history + logout */}
      <div style={{ position: "fixed", top: "1.2rem", right: "1.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ color: "#555", fontSize: "0.85rem" }}>{userEmail}</span>
        <button
          onClick={() => navigate("/history")}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "8px", border: "1px solid #ffffff15", background: "#13131a", color: "#888", cursor: "pointer", fontSize: "0.85rem", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#00d4ff60"; e.currentTarget.style.color = "#00d4ff"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#ffffff15"; e.currentTarget.style.color = "#888"; }}
        >
          <History size={14} />
          History
        </button>
        <button
          onClick={handleLogout}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "8px", border: "1px solid #ffffff15", background: "#13131a", color: "#888", cursor: "pointer", fontSize: "0.85rem", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#ef444460"; e.currentTarget.style.color = "#ef4444"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#ffffff15"; e.currentTarget.style.color = "#888"; }}
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "1rem" }}>
          <Sparkles size={32} color="#00d4ff" />
          <h1 style={{ fontSize: "3rem", fontWeight: "700", background: "linear-gradient(135deg, #00d4ff, #7b2fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            DocuCraft
          </h1>
        </div>
        <p style={{ color: "#888", fontSize: "1.1rem" }}>AI-powered document generator — PPT, DOC &amp; PDF in seconds</p>
      </div>

      {/* Card */}
      <div style={{ background: "#13131a", border: "1px solid #ffffff15", borderRadius: "16px", padding: "2.5rem", width: "100%", maxWidth: "560px" }}>

        {/* Topic Input */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", color: "#888", fontSize: "0.85rem", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>Topic</label>
          <input
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="e.g. Machine Learning, Climate Change..."
            style={{ width: "100%", background: "#0a0a0f", border: "1px solid #ffffff20", borderRadius: "10px", padding: "14px 16px", color: "#fff", fontSize: "1rem", outline: "none" }}
          />
        </div>

        {/* Slide Count */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", color: "#888", fontSize: "0.85rem", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
            Slides — <span style={{ color: "#00d4ff" }}>{slideCount}</span>
          </label>
          <input
            type="range" min="4" max="15" value={slideCount}
            onChange={e => setSlideCount(+e.target.value)}
            style={{ width: "100%", accentColor: "#00d4ff" }}
          />
        </div>

        {/* Theme Picker */}
        <div style={{ marginBottom: "2rem" }}>
          <label style={{ display: "block", color: "#888", fontSize: "0.85rem", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>Theme</label>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {THEMES.map(t => (
              <button key={t.id} onClick={() => setTheme(t.id)}
                style={{ padding: "8px 18px", borderRadius: "8px", border: `2px solid ${theme === t.id ? t.color : "#ffffff20"}`, background: theme === t.id ? t.color + "22" : "transparent", color: theme === t.id ? t.color : "#888", cursor: "pointer", fontSize: "0.9rem", transition: "all 0.2s" }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          {[
            { type: "ppt", label: "PPT",  Icon: Presentation },
            { type: "doc", label: "DOC",  Icon: FileText },
            { type: "pdf", label: "PDF",  Icon: FileDown },
          ].map(({ type, label, Icon }) => (
            <button key={type} onClick={() => generate(type)} disabled={!!loading}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: "1.2rem", borderRadius: "12px", border: "1px solid #ffffff20", background: loading === type ? "#00d4ff22" : "#0a0a0f", color: loading === type ? "#00d4ff" : "#ccc", cursor: loading ? "not-allowed" : "pointer", fontSize: "0.9rem", fontWeight: "500", transition: "all 0.2s" }}>
              {loading === type ? <Download size={22} /> : <Icon size={22} />}
              {loading === type ? "..." : label}
            </button>
          ))}
        </div>
      </div>

      <p style={{ color: "#444", fontSize: "0.8rem", marginTop: "2rem" }}>Powered by Groq Llama-3 • DocuCraft 2025</p>
    </div>
  );
}
