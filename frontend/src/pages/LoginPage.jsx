import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Mail, Lock, LogIn, Loader } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import api from "../api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [focused,  setFocused]  = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill in all fields"); return; }
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token",     res.data.access_token);
      localStorage.setItem("userEmail", email);
      toast.success("Login successful!");
      navigate("/app");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = (name) => ({
    width: "100%",
    background: "#0a0a0f",
    border: `1px solid ${focused === name ? "#00d4ff" : "#ffffff20"}`,
    borderRadius: "10px",
    padding: "13px 16px 13px 44px",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <Toaster position="top-right" />

      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "0.5rem" }}>
          <Sparkles size={28} color="#00d4ff" />
          <h1 style={{ fontSize: "2.2rem", fontWeight: "700", background: "linear-gradient(135deg, #00d4ff, #7b2fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            DocuCraft
          </h1>
        </div>
        <p style={{ color: "#666", fontSize: "0.95rem" }}>Sign in to continue generating documents</p>
      </div>

      {/* Card */}
      <div style={{ background: "#13131a", border: "1px solid #ffffff15", borderRadius: "18px", padding: "2.5rem", width: "100%", maxWidth: "420px" }}>
        <h2 style={{ color: "#fff", fontSize: "1.4rem", fontWeight: "600", marginBottom: "1.8rem", textAlign: "center" }}>Welcome back</h2>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: "1.2rem", position: "relative" }}>
            <Mail size={16} color={focused === "email" ? "#00d4ff" : "#555"} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", transition: "color 0.2s" }} />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              style={inputStyle("email")}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "1.8rem", position: "relative" }}>
            <Lock size={16} color={focused === "password" ? "#00d4ff" : "#555"} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", transition: "color 0.2s" }} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              style={inputStyle("password")}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "none", background: loading ? "#1a3a40" : "linear-gradient(135deg, #00d4ff, #7b2fff)", color: "#fff", fontSize: "1rem", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "opacity 0.2s" }}
          >
            {loading ? <Loader size={18} className="spin" /> : <LogIn size={18} />}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: "center", color: "#555", fontSize: "0.9rem", marginTop: "1.5rem" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#00d4ff", textDecoration: "none", fontWeight: "500" }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
