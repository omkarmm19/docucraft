/**
 * Logo — custom SVG document monogram for DocuCraft.
 * Two overlapping document pages (amber outline, consistent 1.5px stroke).
 * No emoji used. Uses CSS custom property var(--accent) for color.
 */
export default function Logo({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Back document — offset, dimmed */}
      <rect
        x="7" y="5"
        width="13" height="16"
        rx="2"
        stroke="var(--accent)"
        strokeWidth="1.5"
        opacity="0.32"
      />
      {/* Front document with top-right corner fold */}
      <path
        d="M4 3h9l4 4v12a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2z"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Corner fold indicator — small filled triangle */}
      <path
        d="M13 3l4 4h-4V3z"
        fill="var(--accent)"
        opacity="0.42"
      />
      {/* Content lines — suggest document text */}
      <line
        x1="5" y1="12" x2="13" y2="12"
        stroke="var(--accent)"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.6"
      />
      <line
        x1="5" y1="15" x2="11" y2="15"
        stroke="var(--accent)"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}
