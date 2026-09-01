import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, FileText, Download, Shield } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import api from '../api';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const STRENGTH_MAP = [
  { color: 'transparent',    label: '' },
  { color: 'var(--error)',   label: 'Weak' },
  { color: 'var(--warning)', label: 'Fair' },
  { color: 'var(--success)', label: 'Strong' },
];

export default function RegisterPage() {
  const navigate  = useNavigate();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [loading,  setLoading]  = useState(false);

  const strengthScore  = password.length >= 12 ? 3 : password.length >= 8 ? 2 : password.length >= 4 ? 1 : 0;
  const strength       = STRENGTH_MAP[strengthScore];
  const confirmError   = confirm && confirm !== password ? "Passwords don't match" : '';

  async function handleRegister(e) {
    e.preventDefault();
    if (!email || !password || !confirm) { toast.error('Please fill in all fields'); return; }
    if (password.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    if (password !== confirm) { toast.error("Passwords don't match"); return; }
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { email, password });
      localStorage.setItem('token',     res.data.access_token);
      localStorage.setItem('userEmail', email);
      toast.success('Account created!');
      navigate('/app');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Registration failed. Try again.');
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
            Start building your<br />document library.
          </h2>
          <p className="auth-brand-desc">
            Every generation is saved to your history. Revisit, regenerate,
            and download past documents in seconds.
          </p>

          <div className="auth-brand-bullets">
            <div className="auth-bullet">
              <div className="auth-bullet-icon">
                <FileText size={14} strokeWidth={1.5} />
              </div>
              <p className="auth-bullet-text">
                <strong>Unlimited generations</strong> — create as many
                documents as you need, no cap.
              </p>
            </div>
            <div className="auth-bullet">
              <div className="auth-bullet-icon">
                <Download size={14} strokeWidth={1.5} />
              </div>
              <p className="auth-bullet-text">
                <strong>History & re-generate</strong> — every generation
                saved with its exact settings.
              </p>
            </div>
            <div className="auth-bullet">
              <div className="auth-bullet-icon">
                <Shield size={14} strokeWidth={1.5} />
              </div>
              <p className="auth-bullet-text">
                <strong>Secure account</strong> — JWT authentication,
                bcrypt-hashed passwords.
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
              Create your<br />workspace.
            </h1>
            <p className="auth-form-subtitle">
              Free to use. No credit card required.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleRegister}>
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

            {/* Password + strength bar */}
            <div>
              <Input
                id="password"
                label="Password"
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                icon={<Lock size={15} />}
                autoComplete="new-password"
              />
              {password.length > 0 && (
                <div className="pw-strength" style={{ marginTop: 'var(--sp-2)' }}>
                  <div className="pw-strength-bar-track">
                    <div
                      className="pw-strength-bar-fill"
                      style={{
                        width:      `${(strengthScore / 3) * 100}%`,
                        background: strength.color,
                      }}
                    />
                  </div>
                  <p
                    className="pw-strength-label"
                    style={{ color: strength.color }}
                  >
                    {strength.label}
                  </p>
                </div>
              )}
            </div>

            <Input
              id="confirm"
              label="Confirm password"
              type="password"
              placeholder="••••••••"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              icon={<Lock size={15} />}
              error={confirmError}
              autoComplete="new-password"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              {loading ? 'Creating account…' : 'Create account'}
            </Button>
          </form>

          <p className="auth-form-footer">
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
