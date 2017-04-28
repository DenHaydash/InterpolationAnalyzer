import { findRoots } from './base/gaussLinearSystemSolver';
import { calculateAlpha, calculateBasisCoefs, calculateGauss } from './base/interpolation/gauss';

export default function(points) {
    const tPoints = points.map((p, i) => ({...p, t: i}));

    const alpha = calculateAlpha(tPoints.length, 0, points.length - 1);

    const coefsA = calculateBasisCoefs(tPoints, alpha, point => point.t);

    const coefsBX = points.map(p => p.x),
          coefsBY = points.map(p => p.y);

    const rootsX = findRoots(coefsA, coefsBX),
          rootsY = findRoots(coefsA, coefsBY);

    return {
        calculate: (t) => ({
            x: calculateGauss(tPoints, rootsX, alpha, point => point.t)(t),
            y: calculateGauss(tPoints, rootsY, alpha, point => point.t)(t)
        })
    };
}