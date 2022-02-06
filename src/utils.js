
export const range = (n) => Object.keys(new Array(n))

export const normalize = (x, maxX) => x / maxX

export const posOrNeg = (x) => x / Math.abs(x)

export const getVectProps = (a, b) => (
  {dir: posOrNeg(b - a), size: Math.abs(b - a)}
)

export const reapply = (f, n, x) => n <= 1 ? f(x) : reapply(f, n -1, f(x))

// This is a simple, *insecure* hash that's short, fast, and has no dependencies.
// For algorithmic use, where security isn't needed, it's way simpler than sha1 (and all its deps)
// or similar, and with a short, clean (base 36 alphanumeric) result.
// Loosely based on the Java version; see
// https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
export const simpleHash = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32bit integer
  }
  return new Uint32Array([hash])[0].toString(36);
};
