const STAGES = [
  'Source Code',
  'Lexical Analysis',
  'Syntax Analysis',
  'Program Structure',
  'Code Generation',
  'Generated Output',
];

export default function Pipeline({ activeStage, hasCompleted }) {
  return (
    <section className="panel pipeline-panel" aria-label="Compiler pipeline">
      <h2 className="panel-title">Compiler Pipeline</h2>

      <ol className="pipeline">
        {STAGES.map((stage, index) => {
          let state = 'idle';
          if (activeStage >= 0) {
            if (index < activeStage) state = 'done';
            else if (index === activeStage) state = 'active';
          } else if (hasCompleted) {
            state = 'done';
          }

          return (
            <li className={`pipeline-node state-${state}`} key={stage}>
              <span className="node-dot" aria-hidden="true" />
              <span className="node-label">{stage}</span>
              {index < STAGES.length - 1 && (
                <span className="node-connector" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
