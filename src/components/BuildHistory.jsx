import { formatBuildNumber } from '../utils/generator.js';

export default function BuildHistory({ builds, selectedNumber, onSelect }) {
  return (
    <section className="panel history-panel" aria-label="Compilation history">
      <h2 className="panel-title">Compilation History</h2>

      {builds.length === 0 ? (
        <p className="history-empty">
          No builds yet. Compile your source to create the first one.
        </p>
      ) : (
        <ul className="history-list">
          {builds.map((build) => (
            <li key={build.number}>
              <button
                type="button"
                className={`history-item ${
                  selectedNumber === build.number ? 'is-selected' : ''
                }`}
                onClick={() => onSelect(build.number)}
                aria-pressed={selectedNumber === build.number}
              >
                <span className="history-number">
                  {formatBuildNumber(build.number)}
                </span>
                <span
                  className={`history-status status-${build.status.toLowerCase()}`}
                >
                  {build.status}
                </span>
                <span className="history-id mono">{build.outputId}</span>
                <span className="history-time mono">{build.timestamp}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
