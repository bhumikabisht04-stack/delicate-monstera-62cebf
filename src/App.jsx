import { useRef, useState } from 'react';
import Header from './components/Header.jsx';
import CodeEditor from './components/CodeEditor.jsx';
import OutputPanel from './components/OutputPanel.jsx';
import CompileButton from './components/CompileButton.jsx';
import Pipeline from './components/Pipeline.jsx';
import BuildHistory from './components/BuildHistory.jsx';
import { compileSource } from './services/compilerService.js';

const DEFAULT_SOURCE = `let seed = 1000;
let modifier = 337;
let key = seed + modifier;

print("JOCKY Runtime");
print(key);`;

const STAGE_COUNT = 6;
const STAGE_DELAY_MS = 420;
const REDUCED_MOTION_DELAY_MS = 80;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export default function App() {
  const [sourceCode, setSourceCode] = useState(DEFAULT_SOURCE);
  const [builds, setBuilds] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [activeStage, setActiveStage] = useState(-1);
  const nextNumber = useRef(1);

  const selectedBuild = builds.find((b) => b.number === selectedNumber) || null;

  const handleCompile = async () => {
    if (isCompiling) return;

    setIsCompiling(true);
    setSelectedNumber(null);

    const stageDelay = prefersReducedMotion()
      ? REDUCED_MOTION_DELAY_MS
      : STAGE_DELAY_MS;

    for (let stage = 0; stage < STAGE_COUNT; stage++) {
      setActiveStage(stage);
      // eslint-disable-next-line no-await-in-loop
      await wait(stageDelay);
    }

    const result = await compileSource(sourceCode);

    const newBuild = {
      number: nextNumber.current,
      status: 'Success',
      outputId: result.outputId,
      timestamp: result.timestamp,
      generatedCode: result.generatedCode,
    };
    nextNumber.current += 1;

    setBuilds((prev) => [newBuild, ...prev]);
    setSelectedNumber(newBuild.number);
    setIsCompiling(false);
    setActiveStage(-1);
  };

  const handleReset = () => setSourceCode(DEFAULT_SOURCE);

  return (
    <div className="app-shell">
      <Header buildCount={builds.length} />

      <main className="dashboard">
        <div className="editor-grid">
          <CodeEditor
            value={sourceCode}
            onChange={setSourceCode}
            onReset={handleReset}
          />
          <OutputPanel isCompiling={isCompiling} build={selectedBuild} />
        </div>

        <div className="compile-row">
          <CompileButton onClick={handleCompile} isCompiling={isCompiling} />
          <p className="compile-hint">
            Simulated compilation — no code is executed and no files are
            created.
          </p>
        </div>

        <Pipeline activeStage={activeStage} hasCompleted={builds.length > 0} />

        <BuildHistory
          builds={builds}
          selectedNumber={selectedNumber}
          onSelect={setSelectedNumber}
        />
      </main>
    </div>
  );
}
