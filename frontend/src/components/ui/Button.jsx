import { Loader } from 'lucide-react';

/**
 * Button — reusable button with variant, size, loading, and icon props.
 *
 * Variants: primary (amber fill) | secondary (outlined) | ghost | danger
 * Sizes:    sm | md | lg
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon = null,
  iconRight = null,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader size={14} className="spin" /> : icon}
      {children}
      {!loading && iconRight}
    </button>
  );
}
