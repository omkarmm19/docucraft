/**
 * Badge — small colored pill for doc-type labeling.
 *
 * variant: 'ppt' (teal) | 'doc' (blue) | 'pdf' (red) | 'neutral' (grey)
 * All three doc-type colors are distinct from the amber accent and from each other.
 */
export default function Badge({ children, variant = 'neutral', className = '' }) {
  const variantClass = {
    ppt:     'badge-ppt',
    doc:     'badge-doc',
    pdf:     'badge-pdf',
    neutral: 'badge-neutral',
  }[variant] ?? 'badge-neutral';

  return (
    <span className={`badge ${variantClass} ${className}`}>
      {children}
    </span>
  );
}
