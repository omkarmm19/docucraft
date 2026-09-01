import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, FileText, Download, Palette } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import api from '../api';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function LoginPage() {
  const navigate  = useNavigate();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill in all fields'); return; }
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token',     res.data.access_token);
      localStorage.setItem('userEmail', email);
      toast.success('Signed in successfully');
      navigate('/app');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <Toaster position="top-right" />

      {/* ── Left: brand story panel ─────────────────────────────────────── */}
      <div className="auth-brand-panel">
        <div className="auth-brand-logo" onClick={() => navigate('/')}>
          <Logo size={22} />
          <span className="auth-brand-wordmark">DocuCraft</span>
        </div>

        <div className="auth-brand-main">
          <h2 className="auth-brand-quote">
            Your last document<br />took too long to make.
          </h2>
          <p className="auth-brand-desc">
            DocuCraft generates fully structured, formatted documents from
            a single prompt — in under 30 seconds.
          </p>

          <div className="auth-brand-bullets">
            <div className="auth-bullet">
              <div className="auth-bullet-icon">
                <FileText size={14} strokeWidth={1.5} />
              </div>
              <p className="auth-bullet-text">
                <strong>Structured content</strong> — headings, bullets, and
                slides organized automatically.
              </p>
            </div>
            <div className="auth-bullet">
              <div className="auth-bullet-icon">
                <Download size={14} strokeWidth={1.5} />
              </div>
              <p className="auth-bullet-text">
                <strong>Three formats</strong> — PPT, DOC, and PDF generated
                simultaneously from one prompt.
              </p>
            </div>
            <div className="auth-bullet">
              <div className="auth-bullet-icon">
                <Palette size={14} strokeWidth={1.5} />
              </div>
              <p className="auth-bullet-text">
                <strong>Custom themes</strong> — five visual styles designed
                for readability and contrast.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: form panel ───────────────────────────────────────────── */}
      <div className="auth-form-panel">
        <div className="auth-form-card">

          {/* Mobile logo — only visible when brand panel is hidden */}
          <div
            className="auth-mobile-logo"
            onClick={() => navigate('/')}
          >
            <Logo size={20} />
            DocuCraft
          </div>

          <div className="auth-form-header">
            <h1 className="auth-form-title">
              Pick up where<br />you left off.
            </h1>
            <p className="auth-form-subtitle">
              Sign in to your DocuCraft workspace.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            <Input
              id="email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              icon={<Mail size={15} />}
              autoComplete="email"
            />
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              icon={<Lock size={15} />}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <p className="auth-form-footer">
            Don't have an account?{' '}
            <Link to="/register">Create one — it's free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
