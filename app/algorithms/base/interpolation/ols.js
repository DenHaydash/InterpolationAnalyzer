import { findRoots } from '../gaussLinearSystemSolver';

export function findGramMatrix(points, basis) {
    const xs = points.map(p => p.x),
          ys = points.map(p => p.y);

    const c = [],
          b = [];

    for (let k = 0; k <= basis; k++) {
        c[k] = [];

        for (let l = 0; l <= basis; l++) {
            c[k][l] = xs.reduce((sum, x) => sum + Math.pow(x, k + l), 0);
        }

        b[k] = xs.reduce((sum, x, index) => sum + Math.pow(x, k) * ys[index], 0);
    }

    return { c, b };
}

export function getPolynomCoefficients(points, basis) {
    const coefs = findGramMatrix(points, basis);
    return findRoots(coefs.c, coefs.b);
}