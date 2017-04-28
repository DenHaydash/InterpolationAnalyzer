// Gauss method
export function findRoots(a, y) {
    const c = [...a.map(i => [...i])],
          b = [...y];

    const x = [];

    const n = b.length;

    for (let i = 0; i < n; i++) {
        let m = i;

        for (let k = i + 1; k < n; k++) {
            if (Math.abs(c[k][i]) > Math.abs(c[m][i])) {
                m = k;
            }
        }

        if (m != i) {
            let tmp = null;

            for (let j = i; j < n; j++) {
                tmp = c[m][j];
                c[m][j] = c[i][j];
                c[i][j] = tmp;
            }

            tmp = b[m];
            b[m] = b[i];
            b[i] = tmp;
        }

        for (let k = i + 1; k < n; k++) {
            const p = c[k][i] / c[i][i];

            for (let j = i ; j < n; j++) {
                c[k][j] -= p*c[i][j];
            }

            b[k] -= p*b[i];
        }
    }

    for (let i = n - 1; i >= 0; i--) {
        let s = 0;

        for (let j = i + 1; j < n; j++) {
            s += c[i][j] * (x[j] || 0);
        }

        x[i] = (b[i] - s) / c[i][i];
    }

    return x;
}