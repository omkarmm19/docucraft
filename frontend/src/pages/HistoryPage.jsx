import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, History, FileText, Presentation, FileDown, Trash2, ArrowLeft, Loader, RefreshCw } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { getHistory } from "../api";
import api from "../api";

const TYPE_META = {
  ppt: { label: "PPT",  Icon: Presentation, color: "#f59e0b" },
  doc: { label: "DOC",  Icon: FileText,      color: "#3b82f6" },
  pdf: { label: "PDF",  Icon: FileDown,       color: "#ef4444" },
};

const THEME_COLORS = {
  dark:   "#00d4ff",
  blue:   "#64b4ff",
  green:  "#00e678",
  purple: "#c864ff",
  light:  "#888888",
};

function formatDate(iso) {
  return new Date(iso).toLocaleString("en-IN", {
    day:    "2-digit",
    month:  "short",
    year:   "numeric",
    hour:   "2-digit",
    minute: "2-digit",
  });
}

export default function HistoryPage() {
  const navigate = useNavigate();
  const [records,  setRecords]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    getHistory()
      .then((res) => setRecords(res.data))
      .catch(() => toast.error("Could not load history"))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this record? This can't be undone.")) return;
    setDeleting(id);
    try {
      await api.delete(`/history/${id}`);
      setRecords((prev) => prev.filter((r) => r.id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleting(null);
    }
  }

  // Navigate to generator with the record's settings pre-filled
  function handleRegenerate(r) {
    navigate("/", { state: { topic: r.topic, theme: r.theme, slideCount: r.slide_count } });
  }

  return (
    <div style={{ minHeight: "100vh", padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <Toaster position="top-right" />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Sparkles size={24} color="#00d4ff" />
          <span
            style={{ fontSize: "1.6rem", fontWeight: "700", background: "linear-gradient(135deg, #00d4ff, #7b2fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            DocuCraft
          </span>
        </div>
        <button
          onClick={() => navigate("/")}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "8px", border: "1px solid #ffffff20", background: "#13131a", color: "#aaa", cursor: "pointer", fontSize: "0.875rem", transition: "all 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#00d4ff60"; e.currentTarget.style.color = "#00d4ff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#ffffff20"; e.currentTarget.style.color = "#aaa"; }}
        >
          <ArrowLeft size={14} />
          Back to Generator
        </button>
      </div>

      {/* Title */}
      <div style={{ marginBottom: "1.8rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
          <History size={20} color="#00d4ff" />
          <h1 style={{ fontSize: "1.4rem", fontWeight: "600", color: "#fff", margin: 0 }}>Generation History</h1>
        </div>
        <p style={{ color: "#555", fontSize: "0.875rem", margin: 0 }}>Your last 50 document generations — click ↩ to regenerate with the same settings</p>
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
          <Loader size={28} color="#00d4ff" className="spin" />
        </div>
      ) : records.length === 0 ? (
        <div style={{ textAlign: "center", padding: "5rem 2rem", background: "#13131a", border: "1px solid #ffffff10", borderRadius: "16px" }}>
          <History size={48} color="#2a2a3a" style={{ marginBottom: "1rem" }} />
          <p style={{ color: "#444", fontSize: "1rem" }}>No generations yet</p>
          <p style={{ color: "#333", fontSize: "0.85rem", marginTop: "4px" }}>Generate a PPT, DOC or PDF to see it here</p>
          <button
            onClick={() => navigate("/")}
            style={{ marginTop: "1.5rem", padding: "10px 24px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #00d4ff, #7b2fff)", color: "#fff", fontWeight: "600", cursor: "pointer", fontSize: "0.9rem" }}
          >
            Generate Now
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {records.map((r) => {
            const meta       = TYPE_META[r.doc_type]  || TYPE_META.doc;
            const themeColor = THEME_COLORS[r.theme]  || "#888";
            const { Icon }   = meta;
            return (
              <div
                key={r.id}
                style={{ display: "flex", alignItems: "center", gap: "16px", background: "#13131a", border: "1px solid #ffffff0d", borderRadius: "12px", padding: "14px 18px", transition: "border-color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#ffffff20")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#ffffff0d")}
              >
                {/* Type badge */}
                <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: meta.color + "18", border: `1px solid ${meta.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={20} color={meta.color} />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: "#e5e5e5", fontWeight: "500", fontSize: "0.95rem", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {r.topic}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.75rem", color: meta.color, fontWeight: "600", background: meta.color + "15", padding: "2px 8px", borderRadius: "4px" }}>
                      {meta.label}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: themeColor, fontWeight: "500" }}>
                      ● {r.theme}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#555" }}>
                      {r.slide_count} slides
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#444" }}>
                      {formatDate(r.created_at)}
                    </span>
                  </div>
                </div>

                {/* Regenerate */}
                <button
                  onClick={() => handleRegenerate(r)}
                  title="Regenerate with same settings"
                  style={{ flexShrink: 0, padding: "7px", borderRadius: "8px", border: "1px solid transparent", background: "transparent", color: "#444", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#00d4ff40"; e.currentTarget.style.color = "#00d4ff"; e.currentTarget.style.background = "#00d4ff10"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.color = "#444"; e.currentTarget.style.background = "transparent"; }}
                >
                  <RefreshCw size={15} />
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(r.id)}
                  disabled={deleting === r.id}
                  title="Delete record"
                  style={{ flexShrink: 0, padding: "7px", borderRadius: "8px", border: "1px solid transparent", background: "transparent", color: "#444", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#ef444440"; e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.background = "#ef444410"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.color = "#444"; e.currentTarget.style.background = "transparent"; }}
                >
                  {deleting === r.id ? <Loader size={15} className="spin" /> : <Trash2 size={15} />}
                </button>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
