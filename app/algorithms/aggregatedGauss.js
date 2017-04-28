import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';

import { findRoots } from './base/gaussLinearSystemSolver';
import { calculateAlpha, calculateBasisCoefs, calculateGauss } from './base/interpolation/gauss';
import { calculateLength } from './base/vectorMethods';

export default function(points) {
    const tPoints = points
        .map((p, i) => ({...p, t: i === 0 ? 0 : calculateLength(points[i - 1], p)}))
        .reduce((total, current, i) => {
            // running total calculation for curve's length
            current.t = i === 0 ? 0 : total[i - 1].t + current.t;
            total.push(current);
            return total;
        }, []);

    const minT = minBy(tPoints, point => point.t).t,
          maxT = maxBy(tPoints, point => point.t).t;

    const alpha = calculateAlpha(tPoints.length, minT, maxT);

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