import { useState } from 'react';
import { tokenizeCode } from '../utils/highlight.js';
import { formatBuildNumber } from '../utils/generator.js';

const TOKEN_CLASS = {
  keyword: 'tok-keyword',
  string: 'tok-string',
  number: 'tok-number',
  preproc: 'tok-preproc',
  comment: 'tok-comment',
  punct: 'tok-punct',
  plain: '',
};

export default function OutputPanel({ isCompiling, build }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!build) return;
    try {
      await navigator.clipboard.writeText(build.generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard permission can be denied by the browser — fail quietly.
    }
  };

  const tokenizedLines = build ? tokenizeCode(build.generatedCode) : [];

  return (
    <section className="panel" aria-labelledby="output-title">
      <div className="panel-header">
        <h2 id="output-title" className="panel-title">
          Generated Output
        </h2>
        {build && (
          <div className="panel-actions">
            <button type="button" className="ghost-btn" onClick={handleCopy}>
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        )}
      </div>

      {build && (
        <div className="build-meta">
          <span className="meta-chip">{formatBuildNumber(build.number)}</span>
          <span className={`meta-chip status-${build.status.toLowerCase()}`}>
            {build.status}
          </span>
          <span className="meta-chip mono">ID: {build.outputId}</span>
          <span className="meta-chip mono">{build.timestamp}</span>
        </div>
      )}

      <div className="output-body">
        {isCompiling && !build && (
          <div className="output-placeholder">
            <span className="pulse-dot" aria-hidden="true" />
            <p className="placeholder-title">Compiling</p>
            <p className="placeholder-sub">
              Running your source through the pipeline below.
            </p>
          </div>
        )}

        {!isCompiling && !build && (
          <div className="output-placeholder">
            <p className="placeholder-title">Ready for compilation</p>
            <p className="placeholder-sub">
              Run the compiler to generate C output from your JOCKY source.
            </p>
          </div>
        )}

        {build && (
          <pre className="code-block" aria-label="Generated C code">
            <code>
              {tokenizedLines.map((tokens, lineIndex) => (
                <div className="code-line" key={lineIndex}>
                  {tokens.length === 0
                    ? '\u00A0'
                    : tokens.map((token, tokenIndex) => (
                        <span
                          key={tokenIndex}
                          className={TOKEN_CLASS[token.type]}
                        >
                          {token.text}
                        </span>
                      ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </div>
    </section>
  );
}
