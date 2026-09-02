function Toggle({ checked, onChange }) {
  return (
    <button
      className={`toggle ${checked ? "active" : ""}`}
      onClick={() => onChange(!checked)}
      aria-label="Toggle"
    >
      <span className="toggle-circle"></span>
    </button>
  );
}

export default Toggle;