export default function Header({ buildCount }) {
  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">J</span>
        <div className="brand-text">
          <span className="brand-name">JOCKY</span>
          <span className="brand-sub">Compiler Playground</span>
        </div>
      </div>

      <div className="header-meta">
        {buildCount > 0 && (
          <span className="build-count">
            {buildCount} build{buildCount === 1 ? '' : 's'} this session
          </span>
        )}
        <span className="badge">Frontend simulation</span>
      </div>
    </header>
  );
}
