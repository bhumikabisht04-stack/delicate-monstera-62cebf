import { useRef, useState } from 'react';

export default function CodeEditor({ value, onChange, onReset }) {
  const gutterRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const lines = value.split('\n');

  const handleScroll = (event) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = event.target.scrollTop;
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard permission can be denied by the browser — fail quietly,
      // this is a non-critical convenience action in a demo UI.
    }
  };

  return (
    <section className="panel" aria-labelledby="source-title">
      <div className="panel-header">
        <h2 id="source-title" className="panel-title">
          Source Code
        </h2>
        <div className="panel-actions">
          <button type="button" className="ghost-btn" onClick={handleCopy}>
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button type="button" className="ghost-btn" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>

      <div className="editor-shell">
        <div className="editor-gutter" ref={gutterRef} aria-hidden="true">
          {lines.map((_, index) => (
            <div className="gutter-row" key={index}>
              {index + 1}
            </div>
          ))}
        </div>
        <textarea
          className="editor-textarea"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onScroll={handleScroll}
          spellCheck="false"
          wrap="off"
          aria-label="JOCKY source code editor"
        />
      </div>
    </section>
  );
}
