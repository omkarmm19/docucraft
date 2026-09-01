import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, Download, Palette } from 'lucide-react';
import Navbar from '../components/ui/Navbar';
import Button from '../components/ui/Button';
import Logo from '../components/ui/Logo';

/* ─── Hero Mockup ────────────────────────────────────────────────────────────
   A hand-built CSS/div wireframe of a slide deck output panel.
   Abstract rectangles + bars + lines styled with design tokens.
   No AI-generated image — no wrong text rendering risk.
   ─────────────────────────────────────────────────────────────────────────── */
function HeroMockup() {
  return (
    <div className="hero-visual">
      <div className="hm-window">

        {/* Window chrome */}
        <div className="hm-chrome">
          <div className="hm-dots">
            <span className="hm-dot hm-dot-r" />
            <span className="hm-dot hm-dot-y" />
            <span className="hm-dot hm-dot-g" />
          </div>
          <span className="hm-filename">quarterly_review.pptx</span>
          <span className="badge badge-ppt">PPT</span>
        </div>

        {/* Body: thumbnail strip + main slide */}
        <div className="hm-body">

          {/* Slide thumbnails */}
          <div className="hm-thumbstrip">
            {[0, 1, 2, 3, 4].map(i => (
              <div
                key={i}
                className={`hm-thumb${i === 0 ? ' hm-thumb-active' : ''}`}
              >
                <div className="hm-tbar" />
                <div className="hm-tbar hm-tbar-short" />
                <div className="hm-trect" />
              </div>
            ))}
          </div>

          {/* Main slide view */}
          <div className="hm-slide">
            <div className="hm-slide-title-bar" />
            <div className="hm-slide-sub-bar" />

            <div className="hm-slide-body">
              {/* Bar chart — abstract data visualization */}
              <div className="hm-chart">
                <div className="hm-cbar"               style={{ height: '52%' }} />
                <div className="hm-cbar hm-cbar-accent" style={{ height: '80%' }} />
                <div className="hm-cbar"               style={{ height: '38%' }} />
                <div className="hm-cbar"               style={{ height: '66%' }} />
                <div className="hm-cbar hm-cbar-accent" style={{ height: '90%' }} />
              </div>

              {/* Bullet list */}
              <div className="hm-bullets">
                {[1, 0.72, 1, 0.58].map((w, i) => (
                  <div key={i} className="hm-bullet-row">
                    <div className="hm-bul-dot" />
                    <div className={`hm-bul-line${w < 1 ? ' hm-bul-line-sm' : ''}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Slide status footer */}
            <div className="hm-slide-footer">
              <span className="hm-page-num">01 / 12</span>
              <span className="hm-gen-tag">
                <span className="hm-pulse" />
                Generated in 28s
              </span>
            </div>
          </div>
        </div>

        {/* Format download row */}
        <div className="hm-dl-row">
          <div className="hm-dl-item hm-dl-ppt">PPT</div>
          <div className="hm-dl-item hm-dl-doc">DOC</div>
          <div className="hm-dl-item hm-dl-pdf">PDF</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Features data ──────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: <FileText size={18} strokeWidth={1.5} />,
    title: 'Structured slide decks',
    desc:  'Set a topic and slide count — DocuCraft handles outline, content, and layout. Exports as .pptx, ready for PowerPoint or Google Slides.',
  },
  {
    icon: <Download size={18} strokeWidth={1.5} />,
    title: 'Three ready-to-use formats',
    desc:  'Every generation produces .pptx, .docx, and .pdf simultaneously — each formatted correctly for its use case.',
  },
  {
    icon: <Palette size={18} strokeWidth={1.5} />,
    title: 'Custom visual themes',
    desc:  'Choose from five built-in color themes, each tuned for readability and contrast across presentations and documents.',
  },
];

/* ─── How it works steps ─────────────────────────────────────────────────── */
const STEPS = [
  {
    num:  '01',
    title: 'Describe',
    desc: 'Type your topic, set the slide count, and pick a color theme. No template setup, no formatting decisions.',
  },
  {
    num:  '02',
    title: 'Generate',
    desc: 'The engine writes structured content, organizes it into a slide hierarchy, and applies your chosen visual theme.',
  },
  {
    num:  '03',
    title: 'Download',
    desc: 'Your file is ready in seconds. Open it directly in PowerPoint, Word, or any PDF reader — no editing required.',
  },
];

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate();
  const isAuth   = !!localStorage.getItem('token');
  const ctaPath  = isAuth ? '/app' : '/register';
  const ctaLabel = isAuth ? 'Open app' : 'Start for free';

  return (
    <div className="landing-page">
      <Navbar />

      {/* ── Hero (asymmetric 2-col grid) ────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-label">AI Document Engine</div>

          <h1 className="hero-h1">
            From prompt to<br />
            document,{' '}
            <em>instantly.</em>
          </h1>

          <p className="hero-body">
            Describe any topic. Set your format. DocuCraft structures,
            writes, and exports your PowerPoint, Word document, or PDF —
            polished and ready to share.
          </p>

          <div className="hero-ctas">
            <Button
              variant="primary"
              size="lg"
              iconRight={<ArrowRight size={15} />}
              onClick={() => navigate(ctaPath)}
            >
              {ctaLabel}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() =>
                document.getElementById('howto')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              See how it works
            </Button>
          </div>
        </div>

        <HeroMockup />
      </section>

      {/* ── Stats bar ───────────────────────────────────────────────────── */}
      <div className="stats-bar">
        <div className="stats-inner">
          <div className="stat-item">
            <div className="stat-value">PPT · DOC · PDF</div>
            <div className="stat-label">Three output formats</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">~30 seconds</div>
            <div className="stat-label">Typical generation time</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">4 – 15 slides</div>
            <div className="stat-label">Configurable document depth</div>
          </div>
        </div>
      </div>

      {/* ── Features (bordered grid, not floating cards) ─────────────────── */}
      <section id="features" className="features-section">
        <div className="section-header">
          <p className="section-eyebrow">Capabilities</p>
          <h2 className="section-title">What DocuCraft builds for you</h2>
        </div>

        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-cell">
              <div className="feature-icon-wrap">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works (numbered steps, horizontal) ────────────────────── */}
      <div className="howto-section">
        <div className="howto-inner" id="howto">
          <div className="section-header">
            <p className="section-eyebrow">Process</p>
            <h2 className="section-title">Three steps, thirty seconds</h2>
          </div>

          <div className="steps-row">
            {STEPS.map(s => (
              <div key={s.num} className="step-item">
                <div className="step-num-circle">{s.num}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
      <section className="cta-section">
        <h2 className="cta-title">
          Stop formatting.<br />Start delivering.
        </h2>
        <p className="cta-desc">
          DocuCraft handles structure, content, and design so you can
          focus on what the document is actually for.
        </p>
        <Button
          variant="primary"
          size="lg"
          iconRight={<ArrowRight size={15} />}
          onClick={() => navigate(ctaPath)}
        >
          {ctaLabel}
        </Button>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">
              <Logo size={20} />
              <span className="footer-wordmark">DocuCraft</span>
            </div>
            <p className="footer-tagline">
              AI-powered document generation.<br />
              PPT, DOC, and PDF in seconds.
            </p>
          </div>

          <div className="footer-col">
            <span className="footer-col-title">Product</span>
            <span
              className="footer-link"
              onClick={() => navigate('/app')}
            >
              Generator
            </span>
            <span
              className="footer-link"
              onClick={() => navigate('/history')}
            >
              History
            </span>
            <span
              className="footer-link"
              onClick={() =>
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Formats
            </span>
          </div>

          <div className="footer-col">
            <span className="footer-col-title">Built by</span>
            <a
              className="footer-link"
              href="https://github.com/omkarmm19"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <span
              className="footer-link"
              onClick={() => navigate('/register')}
            >
              Sign up free
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© 2026 DocuCraft by Omkar Mahesh.</span>
          <span className="footer-copy">All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
