// Purely cosmetic identifier + formatting helpers used by the frontend
// compiler simulation. Nothing here touches the filesystem, network,
// or operating system.

const HEX_CHARS = '0123456789ABCDEF';

/**
 * Generates a random hex string used to label a simulated build output.
 * This is a display identifier only — it has no relationship to real
 * compiler artifacts.
 */
export function generateOutputId(length = 8) {
  let id = '';
  for (let i = 0; i < length; i++) {
    id += HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
  }
  return id;
}

/** Human-readable time label for the build history list. */
export function generateTimestamp() {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/** Formats a sequential build number as e.g. "#001". */
export function formatBuildNumber(number) {
  return `#${String(number).padStart(3, '0')}`;
}
