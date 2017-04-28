import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';

import { findRoots } from './base/gaussLinearSystemSolver';
import { calculateAlpha, calculateBasisCoefs, calculateGauss } from './base/interpolation/gauss';

export default function(points) {
    const xmin = minBy(points, p => p.x).x,
          xmax = maxBy(points, p => p.x).x;

    const alpha = calculateAlpha(points.length, xmin, xmax);

    const coefsA = calculateBasisCoefs(points, alpha, point => point.x),
          coefsB = points.map(p => p.y);

    const roots = findRoots(coefsA, coefsB);

    return {
        calculate: (x) => ({
            x,
            y: calculateGauss(points, roots, alpha, point => point.x)(x)
        })
    };
}