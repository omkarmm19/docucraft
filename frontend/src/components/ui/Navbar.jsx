import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Logo from './Logo';
import Button from './Button';

/**
 * Navbar — landing page top bar.
 * Logo + wordmark left, nav links center, auth CTAs right.
 * Sticky with border-bottom (no blur blob, no shadow).
 */
export default function Navbar() {
  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem('token');

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <nav className="landing-nav">
      <div className="nav-inner">
        {/* Logo + wordmark */}
        <div className="nav-logo" onClick={() => navigate('/')} role="link" tabIndex={0}>
          <Logo size={22} />
          <span className="nav-wordmark">DocuCraft</span>
        </div>

        {/* Page anchor links */}
        <div className="nav-links">
          <span className="nav-link" onClick={() => scrollTo('features')}>
            Features
          </span>
          <span className="nav-link" onClick={() => scrollTo('howto')}>
            How it works
          </span>
        </div>

        {/* Auth actions */}
        <div className="nav-actions">
          {isAuth ? (
            <Button
              variant="primary"
              size="sm"
              iconRight={<ArrowRight size={13} />}
              onClick={() => navigate('/app')}
            >
              Open app
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Log in
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
                Get started
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
