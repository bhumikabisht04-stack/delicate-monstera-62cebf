// -----------------------------------------------------------------------
// compilerService.js
//
// This is a FRONTEND SIMULATION ONLY. It does not parse, execute,
// interpret, or run any user-provided code. It never touches the
// filesystem, network, or operating system, and it never produces an
// executable artifact of any kind.
//
// `compileSource` performs light, cosmetic text scanning of the source
// (looking for `= <number>` assignments and a `print("...")` string) so
// the demo output visually reflects what's in the editor. That's the
// full extent of what it does — it is string templating, not compilation.
//
// This module is intentionally isolated behind a single exported
// function so it can later be swapped for a real, authorized backend
// API without touching any UI component.
// -----------------------------------------------------------------------

import { generateOutputId, generateTimestamp } from '../utils/generator.js';

const SIMULATED_LATENCY_MS = 350;

function buildDemoCCode(value, message) {
  return [
    '#include <stdio.h>',
    '',
    'int main() {',
    `    int generated_value = ${value};`,
    `    printf("${message}\\n");`,
    '    printf("%d\\n", generated_value);',
    '    return 0;',
    '}',
  ].join('\n');
}

/**
 * Cosmetically derives a display value and message from the source text.
 * This is a shallow scan, not a parser — it exists only to make the
 * simulated output feel connected to what the user typed.
 */
function deriveDemoValues(sourceCode) {
  const numberMatches = [...sourceCode.matchAll(/=\s*(-?\d+)/g)].map((m) =>
    Number(m[1])
  );

  let value = 1000;
  if (numberMatches.length === 1) {
    value = numberMatches[0];
  } else if (numberMatches.length > 1) {
    value = numberMatches.reduce((sum, n) => sum + n, 0);
  }

  const stringMatch = sourceCode.match(/print\(\s*"([^"]*)"\s*\)/);
  const message = stringMatch ? stringMatch[1] : 'JOCKY Runtime';

  return { value, message };
}

/**
 * Simulates compiling JOCKY source into C output.
 *
 * @param {string} sourceCode - the text currently in the editor
 * @returns {Promise<{generatedCode: string, timestamp: string, outputId: string}>}
 */
export async function compileSource(sourceCode) {
  const { value, message } = deriveDemoValues(sourceCode);

  // Simulated latency so the pipeline animation has something to run
  // alongside. No real work happens during this delay.
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));

  return {
    generatedCode: buildDemoCCode(value, message),
    timestamp: generateTimestamp(),
    outputId: generateOutputId(),
  };
}
