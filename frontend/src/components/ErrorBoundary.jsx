import { Component } from "react";
import { Sparkles } from "lucide-react";

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "#0a0a0f",
          textAlign: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2rem" }}>
            <Sparkles size={28} color="#00d4ff" />
            <span style={{ fontSize: "1.8rem", fontWeight: "700", background: "linear-gradient(135deg, #00d4ff, #7b2fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              DocuCraft
            </span>
          </div>

          <div style={{ background: "#13131a", border: "1px solid #ef444430", borderRadius: "16px", padding: "2.5rem", maxWidth: "420px", width: "100%" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>😔</div>
            <h2 style={{ color: "#fff", fontSize: "1.3rem", fontWeight: "600", marginBottom: "0.75rem" }}>
              Something went wrong
            </h2>
            <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1.8rem", lineHeight: "1.6" }}>
              An unexpected error occurred. Your data is safe — try reloading the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(135deg, #00d4ff, #7b2fff)",
                color: "#fff",
                fontSize: "0.95rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
