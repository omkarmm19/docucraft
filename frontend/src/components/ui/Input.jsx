/**
 * Input — labeled input with optional icon, helper text, and error state.
 * Label renders above the field (not as placeholder-only).
 * Focus ring uses the amber accent color via CSS.
 */
export default function Input({
  label,
  id,
  error,
  helper,
  icon,
  type = 'text',
  className = '',
  ...props
}) {
  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      <div className="input-wrap">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          id={id}
          type={type}
          className={`input-field ${icon ? 'has-icon' : ''} ${error ? 'input-err' : ''}`}
          {...props}
        />
      </div>
      {error  && <p className="input-err-msg">{error}</p>}
      {helper && !error && <p className="input-helper">{helper}</p>}
    </div>
  );
}
