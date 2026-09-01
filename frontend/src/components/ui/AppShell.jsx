import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Clock, LogOut, Menu, X } from 'lucide-react';
import Logo from './Logo';

/**
 * AppShell — authenticated page layout.
 *
 * Desktop: fixed sidebar (224px) + scrollable main content area.
 * Mobile (<768px): sidebar hidden, hamburger button reveals it as a drawer
 *   overlay with a semi-transparent backdrop. Sidebar slides in via CSS
 *   transform (no JS animation library).
 *
 * Props:
 *   children   — page content
 *   activeNav  — 'generator' | 'history'  (highlights the correct sidebar link)
 */
export default function AppShell({ children, activeNav = 'generator' }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userEmail = localStorage.getItem('userEmail') || '';
  const initial   = userEmail ? userEmail[0].toUpperCase() : 'U';

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/login');
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  const NAV_ITEMS = [
    { id: 'generator', label: 'New Document', icon: <FileText size={15} strokeWidth={1.75} />, path: '/app'     },
    { id: 'history',   label: 'History',      icon: <Clock    size={15} strokeWidth={1.75} />, path: '/history' },
  ];

  return (
    <div className="app-shell">

      {/* ── Mobile: semi-transparent backdrop ── */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`app-sidebar${sidebarOpen ? ' sidebar-open' : ''}`}
        aria-label="Navigation"
      >
        {/* Logo area */}
        <div
          className="sidebar-logo-area"
          onClick={() => { navigate('/'); closeSidebar(); }}
          role="link"
          tabIndex={0}
        >
          <Logo size={20} />
          <span className="sidebar-wordmark">DocuCraft</span>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <span className="sidebar-nav-label">Workspace</span>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`sidebar-link${activeNav === item.id ? ' active' : ''}`}
              onClick={() => { navigate(item.path); closeSidebar(); }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* User section */}
        <div className="sidebar-footer">
          <div className="sidebar-user-info">
            <div className="sidebar-user-avatar">{initial}</div>
            <span className="sidebar-user-email" title={userEmail}>{userEmail}</span>
          </div>
          <button
            className="sidebar-link"
            onClick={handleLogout}
            style={{ color: 'var(--text-tertiary)' }}
          >
            <LogOut size={15} strokeWidth={1.75} />
            Log out
          </button>
        </div>
      </aside>

      {/* ── Mobile top bar (hidden on desktop) ── */}
      <header className="app-mobile-bar" aria-label="Mobile navigation bar">
        <button
          className="hamburger-btn"
          onClick={() => setSidebarOpen(prev => !prev)}
          aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <div
          className="mobile-logo"
          onClick={() => navigate('/')}
          role="link"
          tabIndex={0}
        >
          <Logo size={18} />
          <span>DocuCraft</span>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="app-main">
        <div className="app-main-inner">
          {children}
        </div>
      </main>
    </div>
  );
}
