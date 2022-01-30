
export const range = (n) => Object.keys(new Array(n))

export const normalize = (x, maxX) => x / maxX

export const posOrNeg = (x) => x / Math.abs(x)

export const getVectProps = (a, b) => (
    {dir: posOrNeg(b - a), size: Math.abs(b - a)}
)

export const reapply = (f, n, x) => n <= 1 ? f(x) : reapply(f, n -1, f(x))
