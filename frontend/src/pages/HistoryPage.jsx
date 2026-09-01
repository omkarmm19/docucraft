import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Presentation, FileDown,
  Trash2, RefreshCw, Loader,
  Search, FolderOpen, BarChart3, Plus,
  Sparkles, Layers
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { getHistory } from '../api';
import api from '../api';
import AppShell from '../components/ui/AppShell';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

/* ─── Metadata ───────────────────────────────────────────────────────────── */
const TYPE_META = {
  ppt: { label: 'PPT', Icon: Presentation, color: 'var(--ppt-color)' },
  doc: { label: 'DOC', Icon: FileText,     color: 'var(--doc-color)' },
  pdf: { label: 'PDF', Icon: FileDown,     color: 'var(--pdf-color)' },
};

const THEME_LABELS = {
  dark: 'Dark', blue: 'Blue', green: 'Green', purple: 'Purple', light: 'Light',
};

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

/* ─── Loading skeleton row ───────────────────────────────────────────────── */
function SkeletonRow() {
  return (
    <tr>
      <td><span className="skeleton-cell skeleton" style={{ width: 44 }} /></td>
      <td><span className="skeleton-cell skeleton" style={{ width: 220 }} /></td>
      <td><span className="skeleton-cell skeleton" style={{ width: 60 }} /></td>
      <td><span className="skeleton-cell skeleton" style={{ width: 32 }} /></td>
      <td><span className="skeleton-cell skeleton" style={{ width: 110 }} /></td>
      <td />
    </tr>
  );
}

/* ─── Filter tabs ────────────────────────────────────────────────────────── */
const FILTERS = [
  { id: 'all', label: 'All'  },
  { id: 'ppt', label: 'PPT'  },
  { id: 'doc', label: 'DOC'  },
  { id: 'pdf', label: 'PDF'  },
];

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function HistoryPage() {
  const navigate = useNavigate();

  const [records,       setRecords]       = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [deleting,      setDeleting]      = useState(null);  // id being deleted
  const [pendingDelete, setPendingDelete] = useState(null);  // id awaiting inline confirm
  const [search,        setSearch]        = useState('');
  const [typeFilter,    setTypeFilter]    = useState('all');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    getHistory({ signal: controller.signal })
      .then(res => {
        if (isMounted) setRecords(res.data);
      })
      .catch(err => {
        if (!isMounted) return;
        if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') return;
        if (err.response?.status === 401) {
          // Token is expired / invalid - auth interceptor handles redirect
          return;
        }
        // Deduplicate error toast so it never stacks duplicates
        toast.error('Could not load history', { id: 'history-fetch-error' });
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  /* Client-side filter */
  const filtered = useMemo(() =>
    records.filter(r => {
      const matchType   = typeFilter === 'all' || r.doc_type === typeFilter;
      const matchSearch = r.topic.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    }),
  [records, search, typeFilter]);

  /* Stats calculation */
  const stats = useMemo(() => {
    const total = records.length;
    const ppt = records.filter(r => r.doc_type === 'ppt').length;
    const doc = records.filter(r => r.doc_type === 'doc').length;
    const pdf = records.filter(r => r.doc_type === 'pdf').length;
    return {
      total,
      ppt,
      doc,
      pdf,
      pptPct: total ? Math.round((ppt / total) * 100) : 0,
      docPct: total ? Math.round((doc / total) * 100) : 0,
      pdfPct: total ? Math.round((pdf / total) * 100) : 0,
    };
  }, [records]);

  async function handleDelete(id) {
    setDeleting(id);
    try {
      await api.delete(`/history/${id}`);
      setRecords(prev => prev.filter(r => r.id !== id));
      toast.success('Record deleted');
    } catch {
      toast.error('Delete failed', { id: 'history-delete-error' });
    } finally {
      setDeleting(null);
      setPendingDelete(null);
    }
  }

  function handleRegenerate(r) {
    navigate('/app', {
      state: { topic: r.topic, theme: r.theme, slideCount: r.slide_count, format: r.doc_type },
    });
  }

  function clearFilters() {
    setSearch('');
    setTypeFilter('all');
  }

  return (
    <AppShell activeNav="history">
      <Toaster position="top-right" />

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="history-header">
        <div>
          <div className="history-title-row">
            <h1 className="history-page-title">Document History</h1>
            {!loading && (
              <span className="history-count-badge">{records.length} total</span>
            )}
          </div>
          <p className="history-subtitle">
            All generated documents — click ↩ to re-generate with identical settings.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={<Plus size={14} />}
          onClick={() => navigate('/app')}
        >
          New document
        </Button>
      </div>

      {/* ── Split Layout: Table Main + Stats Sidebar ──────────────────────── */}
      <div className="history-split-layout">

        {/* ── Left / Main: Table and Filters ────────────────────────────── */}
        <div className="history-main-col">

          {/* Toolbar: search + type filter tabs */}
          {!loading && records.length > 0 && (
            <div className="history-toolbar">
              <div className="history-search-wrap">
                <span className="history-search-icon">
                  <Search size={14} />
                </span>
                <input
                  id="history-search"
                  type="search"
                  className="history-search"
                  placeholder="Search by topic…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="filter-tabs" role="tablist" aria-label="Filter by type">
                {FILTERS.map(f => (
                  <button
                    key={f.id}
                    className={`filter-tab${typeFilter === f.id ? ' active' : ''}`}
                    onClick={() => setTypeFilter(f.id)}
                    role="tab"
                    aria-selected={typeFilter === f.id}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading: skeleton rows */}
          {loading ? (
            <div className="history-table-wrap">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Topic</th>
                    <th>Theme</th>
                    <th>Slides</th>
                    <th>Date</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonRow key={i} />
                  ))}
                </tbody>
              </table>
            </div>

          /* Empty: no records at all */
          ) : records.length === 0 ? (
            <div className="history-empty">
              <div className="empty-icon">
                <FolderOpen size={24} strokeWidth={1.5} />
              </div>
              <h2 className="empty-title">No documents yet</h2>
              <p className="empty-desc">
                Generate a PowerPoint presentation, Word document, or PDF — it will appear here so you can download or re-run it at any time.
              </p>
              <Button
                variant="primary"
                size="md"
                icon={<Plus size={15} />}
                onClick={() => navigate('/app')}
              >
                Generate your first document
              </Button>
            </div>

          /* Empty: search / filter returned nothing */
          ) : filtered.length === 0 ? (
            <div className="history-empty">
              <div className="empty-icon">
                <Search size={22} strokeWidth={1.5} />
              </div>
              <h2 className="empty-title">No results</h2>
              <p className="empty-desc">
                Nothing matches "{search}". Try a different search term or clear the filter.
              </p>
              <Button variant="secondary" size="sm" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>

          /* Data table */
          ) : (
            <div className="history-table-wrap">
              <table className="history-table" aria-label="Generation history">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Topic</th>
                    <th>Theme</th>
                    <th>Slides</th>
                    <th>Date</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(r => {
                    const meta = TYPE_META[r.doc_type] ?? TYPE_META.doc;
                    return (
                      <tr key={r.id}>
                        {/* Type badge */}
                        <td>
                          <Badge variant={r.doc_type}>{meta.label}</Badge>
                        </td>

                        {/* Topic */}
                        <td>
                          <span className="td-topic" title={r.topic}>
                            {r.topic}
                          </span>
                        </td>

                        {/* Theme */}
                        <td style={{ textTransform: 'capitalize' }}>
                          {THEME_LABELS[r.theme] ?? r.theme}
                        </td>

                        {/* Slide count (only relevant for PPT) */}
                        <td>
                          {r.doc_type === 'ppt' ? r.slide_count : '—'}
                        </td>

                        {/* Date */}
                        <td style={{ color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>
                          {formatDate(r.created_at)}
                        </td>

                        {/* Actions: inline confirm on delete */}
                        <td>
                          {pendingDelete === r.id ? (
                            <div className="action-confirm-row">
                              <span className="action-confirm-text">Delete?</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setPendingDelete(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                loading={deleting === r.id}
                                onClick={() => handleDelete(r.id)}
                              >
                                Confirm
                              </Button>
                            </div>
                          ) : (
                            <div className="td-actions">
                              {/* Re-generate */}
                              <Button
                                variant="ghost"
                                size="sm"
                                icon={<RefreshCw size={13} />}
                                onClick={() => handleRegenerate(r)}
                                title="Re-generate with same settings"
                                aria-label="Re-generate"
                              />
                              {/* Delete */}
                              <Button
                                variant="danger"
                                size="sm"
                                icon={
                                  deleting === r.id
                                    ? <Loader size={13} className="spin" />
                                    : <Trash2 size={13} />
                                }
                                onClick={() => setPendingDelete(r.id)}
                                title="Delete record"
                                aria-label="Delete"
                              />
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Right: Summary / Stats Sidebar ────────────────────────────── */}
        <aside className="history-stats-panel" aria-label="History statistics">
          <div className="history-stat-card">
            <div className="history-stat-header">
              <span className="history-stat-title">
                <BarChart3 size={15} color="var(--accent)" />
                Workspace Summary
              </span>
            </div>

            <div className="history-metric-box">
              <div className="history-metric-num">{stats.total}</div>
              <div className="history-metric-lbl">Total Documents Generated</div>
            </div>

            {/* Breakdown Bars */}
            <div className="history-breakdown-list">
              <p className="history-breakdown-title">Format distribution</p>

              <div className="history-breakdown-item">
                <div className="history-breakdown-label">
                  <span className="history-breakdown-dot" style={{ background: 'var(--ppt-color)' }} />
                  <span>PowerPoint (PPT)</span>
                  <strong className="history-breakdown-val">{stats.ppt}</strong>
                </div>
                <div className="history-progress-track">
                  <div
                    className="history-progress-fill"
                    style={{ width: `${stats.pptPct}%`, background: 'var(--ppt-color)' }}
                  />
                </div>
              </div>

              <div className="history-breakdown-item">
                <div className="history-breakdown-label">
                  <span className="history-breakdown-dot" style={{ background: 'var(--doc-color)' }} />
                  <span>Word Document (DOC)</span>
                  <strong className="history-breakdown-val">{stats.doc}</strong>
                </div>
                <div className="history-progress-track">
                  <div
                    className="history-progress-fill"
                    style={{ width: `${stats.docPct}%`, background: 'var(--doc-color)' }}
                  />
                </div>
              </div>

              <div className="history-breakdown-item">
                <div className="history-breakdown-label">
                  <span className="history-breakdown-dot" style={{ background: 'var(--pdf-color)' }} />
                  <span>PDF Document</span>
                  <strong className="history-breakdown-val">{stats.pdf}</strong>
                </div>
                <div className="history-progress-track">
                  <div
                    className="history-progress-fill"
                    style={{ width: `${stats.pdfPct}%`, background: 'var(--pdf-color)' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action / Tips Card */}
          <div className="history-tip-card">
            <div className="history-tip-header">
              <Sparkles size={14} color="var(--accent)" />
              <span>Fast Re-generation</span>
            </div>
            <p className="history-tip-text">
              Click the <RefreshCw size={11} style={{ verticalAlign: 'middle' }} /> icon on any record to automatically prefill the generator with its topic, format, and theme.
            </p>
          </div>
        </aside>

      </div>
    </AppShell>
  );
}
