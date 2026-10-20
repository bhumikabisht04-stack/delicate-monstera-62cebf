// A tiny, purely cosmetic tokenizer for the simulated C output panel.
// It only ever returns plain text fragments (never HTML), which React
// renders as escaped text nodes — so this is safe even though the
// generated code contains values pulled from user-typed source.

const TOKEN_PATTERN =
  /(#include\s*<[^>]*>)|("(?:[^"\\]|\\.)*")|(\b\d+\b)|(\b(?:int|return|void|main|char|float|double|printf)\b)|([{}()])|(\/\/.*$)/g;

function tokenizeLine(line) {
  const tokens = [];
  let lastIndex = 0;
  let match;

  TOKEN_PATTERN.lastIndex = 0;
  while ((match = TOKEN_PATTERN.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: line.slice(lastIndex, match.index), type: 'plain' });
    }
    if (match[1]) tokens.push({ text: match[1], type: 'preproc' });
    else if (match[2]) tokens.push({ text: match[2], type: 'string' });
    else if (match[3]) tokens.push({ text: match[3], type: 'number' });
    else if (match[4]) tokens.push({ text: match[4], type: 'keyword' });
    else if (match[5]) tokens.push({ text: match[5], type: 'punct' });
    else if (match[6]) tokens.push({ text: match[6], type: 'comment' });
    lastIndex = TOKEN_PATTERN.lastIndex;
  }

  if (lastIndex < line.length) {
    tokens.push({ text: line.slice(lastIndex), type: 'plain' });
  }

  return tokens;
}

/** Splits generated code into per-line arrays of { text, type } tokens. */
export function tokenizeCode(code) {
  return code.split('\n').map(tokenizeLine);
}
