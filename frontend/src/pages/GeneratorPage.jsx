import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Presentation, FileText, FileDown, Check, Download } from 'lucide-react';
import api from '../api';
import AppShell from '../components/ui/AppShell';
import Button from '../components/ui/Button';

/* ─── Format definitions ─────────────────────────────────────────────────── */
const FORMATS = [
  {
    id:           'ppt',
    label:        'PowerPoint',
    badge:        'PPT',
    ext:          'pptx',
    icon:         <Presentation size={20} strokeWidth={1.5} />,
    color:        'var(--ppt-color)',
    bgColor:      'rgba(20, 184, 166, 0.10)',
    desc:         'Slide deck with your chosen theme, ready for PowerPoint or Google Slides.',
    lengthLabel:  'Number of slides',
    lengthUnit:   'slides',
    min:          4,
    max:          15,
    defaultCount: 8,
  },
  {
    id:           'doc',
    label:        'Word Document',
    badge:        'DOC',
    ext:          'docx',
    icon:         <FileText size={20} strokeWidth={1.5} />,
    color:        'var(--doc-color)',
    bgColor:      'rgba(59, 130, 246, 0.10)',
    desc:         'Structured Word document with headings, paragraphs, and proper formatting.',
    lengthLabel:  'Number of sections',
    lengthUnit:   'sections',
    min:          2,
    max:          8,
    defaultCount: 4,
  },
  {
    id:           'pdf',
    label:        'PDF Document',
    badge:        'PDF',
    ext:          'pdf',
    icon:         <FileDown size={20} strokeWidth={1.5} />,
    color:        'var(--pdf-color)',
    bgColor:      'rgba(239, 68, 68, 0.10)',
    desc:         'Portable, print-ready PDF formatted for sharing and presentation.',
    lengthLabel:  'Number of pages',
    lengthUnit:   'pages',
    min:          2,
    max:          8,
    defaultCount: 4,
  },
];

/* ─── Theme swatches ─────────────────────────────────────────────────────── */
const THEMES = [
  { id: 'dark',   label: 'Dark',   swatch: '#1a1a2e', titleColor: '#00d4ff', textColor: '#fff' },
  { id: 'blue',   label: 'Blue',   swatch: '#1e3a5f', titleColor: '#64b4ff', textColor: '#dceaff' },
  { id: 'green',  label: 'Green',  swatch: '#1a3320', titleColor: '#00e678', textColor: '#c8ffdc' },
  { id: 'purple', label: 'Purple', swatch: '#2d1b4e', titleColor: '#c864ff', textColor: '#f0dcff' },
  { id: 'light',  label: 'Light',  swatch: '#f5f5f5', titleColor: '#1e1e1e', textColor: '#3c3c3c' },
];

/* ─── Live Preview mockup ─────────────────────────────────────────────────── */
function LivePreview({ format, theme, topic, lengthCount }) {
  const themeData   = THEMES.find(t => t.id === theme) ?? THEMES[0];
  const formatData  = FORMATS.find(f => f.id === format) ?? FORMATS[0];
  const isLight     = theme === 'light';

  // Badge class name
  const badgeVariant = { ppt: 'badge-ppt', doc: 'badge-doc', pdf: 'badge-pdf' }[format];

  return (
    <div className="gen-preview-panel">
      <p className="gen-preview-label">Live Preview</p>

      <div className="gen-preview-window">
        {/* Chrome bar */}
        <div className="hm-chrome">
          <div className="hm-dots">
            <span className="hm-dot hm-dot-r" />
            <span className="hm-dot hm-dot-y" />
            <span className="hm-dot hm-dot-g" />
          </div>
          <span className="hm-filename">
            {topic ? topic.slice(0, 20) + (topic.length > 20 ? '…' : '') : 'untitled'}.{formatData.ext}
          </span>
          <span
            className={`badge ${badgeVariant}`}
            style={{ width: 'fit-content', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            {formatData.badge}
          </span>
        </div>

        {/* Slide / Document body — theme-tinted */}
        <div
          className="gen-preview-body"
          style={{ background: themeData.swatch }}
        >
          {format === 'ppt' ? (
            /* PPT view: thumbnail strip + main slide */
            <div style={{ display: 'flex', height: '100%' }}>

              {/* Thumbnail strip */}
              <div
                className="hm-thumbstrip"
                style={{
                  background: isLight ? '#e8e8e8' : 'rgba(0,0,0,0.28)',
                  borderRight: `1px solid ${isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.07)'}`,
                }}
              >
                {[0, 1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className={`hm-thumb${i === 0 ? ' hm-thumb-active' : ''}`}
                    style={{
                      background: i === 0
                        ? `${themeData.titleColor}22`
                        : (isLight ? '#d4d4d4' : 'rgba(255,255,255,0.06)'),
                      borderColor: i === 0
                        ? `${themeData.titleColor}55`
                        : (isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.06)'),
                    }}
                  >
                    <div className="hm-tbar" style={{ background: isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.18)' }} />
                    <div className="hm-tbar hm-tbar-short" style={{ background: isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.10)' }} />
                    <div className="hm-trect" style={{ background: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)' }} />
                  </div>
                ))}
              </div>

              {/* Main slide */}
              <div className="hm-slide" style={{ padding: '14px 16px' }}>
                <div style={{
                  height: 10,
                  background: themeData.titleColor,
                  borderRadius: 2,
                  width: '70%',
                  marginBottom: 6,
                  opacity: 0.85,
                }} />
                <div style={{
                  height: 6,
                  background: themeData.textColor,
                  borderRadius: 2,
                  width: '42%',
                  marginBottom: 14,
                  opacity: 0.25,
                }} />

                {/* Chart + bullets */}
                <div className="hm-slide-body">
                  <div className="hm-chart">
                    {[52, 80, 38, 66, 90].map((h, i) => (
                      <div
                        key={i}
                        className="hm-cbar"
                        style={{
                          height: `${h}%`,
                          background: i % 2 === 1
                            ? themeData.titleColor
                            : (isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.14)'),
                          opacity: i % 2 === 1 ? 0.75 : 1,
                        }}
                      />
                    ))}
                  </div>
                  <div className="hm-bullets">
                    {[1, 0.72, 1, 0.58].map((w, i) => (
                      <div key={i} className="hm-bullet-row">
                        <div className="hm-bul-dot" style={{ background: themeData.titleColor, opacity: 0.8 }} />
                        <div
                          className={`hm-bul-line${w < 1 ? ' hm-bul-line-sm' : ''}`}
                          style={{ background: isLight ? 'rgba(0,0,0,0.14)' : 'rgba(255,255,255,0.14)' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slide footer */}
                <div className="hm-slide-footer">
                  <span className="hm-page-num" style={{ color: isLight ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.25)' }}>
                    01 / {String(lengthCount).padStart(2, '0')}
                  </span>
                  <span className="hm-gen-tag">
                    <span className="hm-pulse" />
                    Ready to generate
                  </span>
                </div>
              </div>
            </div>

          ) : format === 'doc' ? (
            /* DOC view: structured document layout */
            <div style={{
              height: '100%',
              padding: '18px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              overflow: 'hidden',
            }}>
              {/* Document Main Heading */}
              <div style={{ height: 11, background: themeData.titleColor, borderRadius: 2, width: '68%', opacity: 0.85 }} />
              {/* Document Sub-bar */}
              <div style={{ height: 6, background: themeData.textColor, borderRadius: 2, width: '38%', opacity: 0.3, marginBottom: 2 }} />
              {/* Divider */}
              <div style={{ height: 1, background: isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.10)', marginBottom: 4 }} />
              
              {/* Paragraph block 1 */}
              {[1, 0.92, 0.82, 0.65].map((w, i) => (
                <div key={`p1-${i}`} style={{
                  height: 4,
                  background: isLight ? 'rgba(0,0,0,0.14)' : 'rgba(255,255,255,0.14)',
                  borderRadius: 2,
                  width: `${w * 88}%`,
                }} />
              ))}

              <div style={{ height: 4 }} />

              {/* Section 2 Header */}
              <div style={{ height: 8, background: themeData.titleColor, borderRadius: 2, width: '45%', opacity: 0.65 }} />
              {/* Paragraph block 2 */}
              {[0.95, 0.85, 0.55].map((w, i) => (
                <div key={`p2-${i}`} style={{
                  height: 4,
                  background: isLight ? 'rgba(0,0,0,0.14)' : 'rgba(255,255,255,0.14)',
                  borderRadius: 2,
                  width: `${w * 88}%`,
                }} />
              ))}

              <div style={{ height: 4 }} />

              {/* Section 3 Header */}
              <div style={{ height: 8, background: themeData.titleColor, borderRadius: 2, width: '40%', opacity: 0.65 }} />
              {[0.9, 0.7].map((w, i) => (
                <div key={`p3-${i}`} style={{
                  height: 4,
                  background: isLight ? 'rgba(0,0,0,0.14)' : 'rgba(255,255,255,0.14)',
                  borderRadius: 2,
                  width: `${w * 88}%`,
                }} />
              ))}
            </div>

          ) : (
            /* PDF view: portrait page with header + body + footer */
            <div style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 14,
            }}>
              <div style={{
                background: isLight ? '#ffffff' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.10)'}`,
                borderRadius: 4,
                width: '74%',
                height: '92%',
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}>
                <div style={{ height: 9, background: themeData.titleColor, borderRadius: 2, width: '62%', opacity: 0.85 }} />
                <div style={{ height: 1, background: isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.12)', marginTop: 2, marginBottom: 2 }} />
                {[1, 0.9, 0.75, 1, 0.85, 0.6, 0.95].map((w, i) => (
                  <div key={i} style={{
                    height: 4,
                    background: isLight ? 'rgba(0,0,0,0.14)' : 'rgba(255,255,255,0.16)',
                    borderRadius: 2,
                    width: `${w * 90}%`,
                  }} />
                ))}
                <div style={{ height: 4 }} />
                <div style={{ height: 6, background: themeData.titleColor, borderRadius: 2, width: '42%', opacity: 0.6 }} />
                {[0.9, 0.7, 0.5].map((w, i) => (
                  <div key={i} style={{
                    height: 4,
                    background: isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.14)',
                    borderRadius: 2,
                    width: `${w * 90}%`,
                  }} />
                ))}
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`, paddingTop: 4 }}>
                  <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: isLight ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.3)' }}>
                    01 / {String(lengthCount).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: 9, color: 'var(--success)' }}>
                    PDF Page
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Download row */}
        <div className="hm-dl-row">
          <div className={`hm-dl-item hm-dl-ppt${format === 'ppt' ? ' hm-dl-active' : ''}`}>PPT</div>
          <div className={`hm-dl-item hm-dl-doc${format === 'doc' ? ' hm-dl-active' : ''}`}>DOC</div>
          <div className={`hm-dl-item hm-dl-pdf${format === 'pdf' ? ' hm-dl-active' : ''}`}>PDF</div>
        </div>
      </div>

      {/* Theme and length label below mockup */}
      <div className="gen-preview-meta">
        <span>Theme: <strong>{themeData.label}</strong></span>
        <span>
          <strong>{lengthCount}</strong> {formatData.lengthUnit}
        </span>
      </div>
    </div>
  );
}

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function GeneratorPage() {
  const location = useLocation();
  const prefill  = location.state || {};

  const [topic, setTopic]   = useState(prefill.topic  || '');
  const [format, setFormat] = useState(prefill.format || 'ppt');
  const [theme, setTheme]   = useState(prefill.theme  || 'dark');
  const [loading, setLoading] = useState(false);

  // Per-format length counts
  const [counts, setCounts] = useState({
    ppt: prefill.slideCount || 8,
    doc: prefill.slideCount || 4,
    pdf: prefill.slideCount || 4,
  });

  const toastShownRef = useRef(false);

  const selectedFormat = FORMATS.find(f => f.id === format) ?? FORMATS[0];
  const currentCount   = counts[format] ?? selectedFormat.defaultCount;

  function handleCountChange(newVal) {
    setCounts(prev => ({
      ...prev,
      [format]: newVal,
    }));
  }

  async function handleGenerate() {
    if (!topic.trim()) { toast.error('Please enter a topic first'); return; }
    setLoading(true);
    toastShownRef.current = false;
    try {
      const res = await api.post(
        `/generate/${format}`,
        { topic, slide_count: currentCount, theme },
        { responseType: 'blob' },
      );
      const url = URL.createObjectURL(new Blob([res.data]));
      const a   = document.createElement('a');
      a.href     = url;
      a.download = `${topic}.${selectedFormat.ext}`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`${selectedFormat.label} generated!`);
    } catch {
      if (!toastShownRef.current) {
        toastShownRef.current = true;
        toast.error('Generation failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell activeNav="generator">
      <Toaster position="top-right" />

      {/* ── 2-col split layout: form left, live preview right ─────────────── */}
      <div className="gen-split-layout">

        {/* ── LEFT: form ─────────────────────────────────────────────────── */}
        <div className="gen-form-col">

          {/* Page header */}
          <div className="gen-page-header">
            <h1 className="gen-page-title">New Document</h1>
            <p className="gen-page-subtitle">
              Generate a PowerPoint, Word document, or PDF from a single prompt.
            </p>
          </div>

          {/* Section 1: Topic */}
          <div className="gen-form-section">
            <p className="gen-section-label">
              <span className="gen-section-num">1</span>
              Topic
            </p>
            <div className="input-group">
              <textarea
                id="topic"
                className="input-field"
                placeholder={
                  'Describe what this document is about — e.g. "The impact of renewable energy on global electricity grids" or "Q3 product roadmap for a B2B SaaS startup"'
                }
                value={topic}
                onChange={e => setTopic(e.target.value)}
                rows={4}
              />
              <p className="input-helper">
                Be specific — a clearer topic produces better-structured content.
              </p>
            </div>
          </div>

          {/* Section 2: Format selection */}
          <div className="gen-form-section">
            <p className="gen-section-label">
              <span className="gen-section-num">2</span>
              Output format
            </p>
            <div className="format-cards" role="radiogroup" aria-label="Output format">
              {FORMATS.map(f => (
                <div
                  key={f.id}
                  id={`format-${f.id}`}
                  className={`format-card${format === f.id ? ' selected' : ''}`}
                  onClick={() => setFormat(f.id)}
                  role="radio"
                  aria-checked={format === f.id}
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setFormat(f.id)}
                >
                  <div className="format-card-icon" style={{ background: f.bgColor, color: f.color }}>
                    {f.icon}
                  </div>
                  <div>
                    <p className="format-card-name">{f.label}</p>
                    <p className="format-card-desc">{f.desc}</p>
                  </div>
                  <div className="format-card-check">
                    {format === f.id && (
                      <Check size={9} color="var(--accent-text)" strokeWidth={3.5} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Options */}
          <div className="gen-form-section">
            <p className="gen-section-label">
              <span className="gen-section-num">3</span>
              Options
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>

              {/* Length / Depth control for all 3 formats */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-2)' }}>
                  <span className="input-label">{selectedFormat.lengthLabel}</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--accent)' }}>
                    {currentCount} {selectedFormat.lengthUnit}
                  </span>
                </div>
                <input
                  id="length-slider"
                  type="range"
                  min={selectedFormat.min}
                  max={selectedFormat.max}
                  value={currentCount}
                  onChange={e => handleCountChange(+e.target.value)}
                  className="slide-count-slider"
                  aria-label={`${selectedFormat.lengthLabel}: ${currentCount}`}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--sp-1)' }}>
                  <span className="input-helper">{selectedFormat.min} min</span>
                  <span className="input-helper">{selectedFormat.max} max</span>
                </div>
              </div>

              {/* Theme swatches */}
              <div>
                <p className="input-label" style={{ marginBottom: 'var(--sp-3)' }}>Visual theme</p>
                <div className="theme-swatches" role="radiogroup" aria-label="Visual theme">
                  {THEMES.map(t => (
                    <div
                      key={t.id}
                      className={`theme-swatch${theme === t.id ? ' selected' : ''}`}
                      style={{ background: t.swatch }}
                      onClick={() => setTheme(t.id)}
                      role="radio"
                      aria-label={t.label}
                      aria-checked={theme === t.id}
                      tabIndex={0}
                      onKeyDown={e => e.key === 'Enter' && setTheme(t.id)}
                      title={t.label}
                    />
                  ))}
                </div>
                <p className="input-helper" style={{ marginTop: 'var(--sp-2)' }}>
                  Selected:{' '}
                  <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    {THEMES.find(t => t.id === theme)?.label}
                  </strong>
                </p>
              </div>
            </div>
          </div>

          {/* Generate button */}
          <div className="gen-footer">
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
              File will download automatically when ready.
            </p>
            <Button
              variant="primary"
              size="lg"
              loading={loading}
              icon={loading ? null : <Download size={15} />}
              onClick={handleGenerate}
              disabled={!topic.trim() || loading}
              id="generate-btn"
            >
              {loading ? 'Generating…' : `Generate ${selectedFormat.label}`}
            </Button>
          </div>
        </div>

        {/* ── RIGHT: live preview panel ─────────────────────────────────── */}
        <LivePreview
          format={format}
          theme={theme}
          topic={topic}
          lengthCount={currentCount}
        />
      </div>
    </AppShell>
  );
}
