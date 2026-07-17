import { useNavigate } from "react-router-dom";
import { Sparkles, Presentation, Zap, Shield, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0f", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      
      {/* Navbar */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 3rem", borderBottom: "1px solid #ffffff15", background: "rgba(10, 10, 15, 0.8)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div 
          onClick={() => navigate("/")}
          style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
        >
          <Sparkles size={24} color="#00d4ff" />
          <span style={{ fontSize: "1.5rem", fontWeight: "700", background: "linear-gradient(135deg, #00d4ff, #7b2fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            DocuCraft
          </span>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          {!isAuthenticated ? (
            <>
              <button 
                onClick={() => navigate("/login")}
                style={{ padding: "10px 20px", borderRadius: "8px", border: "1px solid #ffffff30", background: "transparent", color: "#fff", cursor: "pointer", fontWeight: "500", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#00d4ff"; e.currentTarget.style.color = "#00d4ff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#ffffff30"; e.currentTarget.style.color = "#fff"; }}
              >
                Log In
              </button>
              <button 
                onClick={() => navigate("/register")}
                style={{ padding: "10px 20px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg, #00d4ff, #7b2fff)", color: "#fff", cursor: "pointer", fontWeight: "600", transition: "opacity 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                Sign Up
              </button>
            </>
          ) : (
            <button 
              onClick={() => navigate("/app")}
              style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 24px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg, #00d4ff, #7b2fff)", color: "#fff", cursor: "pointer", fontWeight: "600" }}
            >
              Go to Dashboard <ArrowRight size={18} />
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: "8rem 2rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "999px", background: "#ffffff0a", border: "1px solid #ffffff15", color: "#00d4ff", fontSize: "0.875rem", fontWeight: "500", marginBottom: "2rem" }}>
          <Sparkles size={16} /> Intelligent Document Generation Platform
        </div>
        <h1 style={{ fontSize: "4.5rem", fontWeight: "800", lineHeight: "1.1", marginBottom: "1.5rem", maxWidth: "900px" }}>
          Generate beautiful documents <br />
          <span style={{ background: "linear-gradient(135deg, #00d4ff, #7b2fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>in seconds.</span>
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#a1a1aa", maxWidth: "600px", marginBottom: "3rem", lineHeight: "1.6" }}>
          Instantly transform any topic into fully formatted PowerPoint presentations, Word documents, or PDFs. Just type a prompt and download your file.
        </p>
        
        <button 
          onClick={() => navigate(isAuthenticated ? "/app" : "/register")}
          style={{ display: "flex", alignItems: "center", gap: "10px", padding: "16px 36px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #00d4ff, #7b2fff)", color: "#fff", cursor: "pointer", fontSize: "1.1rem", fontWeight: "600", boxShadow: "0 10px 30px -10px rgba(0, 212, 255, 0.5)", transition: "transform 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          Start Generating for Free <ArrowRight size={20} />
        </button>
      </section>

      {/* Features Section */}
      <section style={{ padding: "5rem 2rem", background: "#0f0f15", borderTop: "1px solid #ffffff10" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "1rem" }}>Everything you need</h2>
            <p style={{ color: "#888", fontSize: "1.1rem" }}>Generate, download, and manage your documents effortlessly.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            
            {/* Card 1 */}
            <div style={{ background: "#15151e", border: "1px solid #ffffff10", borderRadius: "16px", padding: "2rem", transition: "all 0.3s" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#00d4ff15", color: "#00d4ff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <Presentation size={24} />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.75rem" }}>Stunning Presentations</h3>
              <p style={{ color: "#a1a1aa", lineHeight: "1.6" }}>Generate 4 to 15 slide PowerPoint presentations with custom color themes tailored to your topic.</p>
            </div>

            {/* Card 2 */}
            <div style={{ background: "#15151e", border: "1px solid #ffffff10", borderRadius: "16px", padding: "2rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#7b2fff15", color: "#7b2fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <Zap size={24} />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.75rem" }}>Lightning Fast Generation</h3>
              <p style={{ color: "#a1a1aa", lineHeight: "1.6" }}>High-performance generative pipeline ensuring ultra-fast output and instant document delivery.</p>
            </div>

            {/* Card 3 */}
            <div style={{ background: "#15151e", border: "1px solid #ffffff10", borderRadius: "16px", padding: "2rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#00e67815", color: "#00e678", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <Shield size={24} />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.75rem" }}>Secure & Private</h3>
              <p style={{ color: "#a1a1aa", lineHeight: "1.6" }}>Your data is protected with JWT authentication and secure bcrypt password hashing.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "3rem 2rem", textAlign: "center", borderTop: "1px solid #ffffff10", color: "#555" }}>
        <p>© 2026 DocuCraft. Intelligent Document Suite. All rights reserved.</p>
      </footer>
    </div>
  );
}
