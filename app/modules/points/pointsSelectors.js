import { createSelector } from 'reselect';
import orderBy from 'lodash/orderBy';
import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';

import { computeScaleFactor } from '../../helpers/scaleHelper';

export const pointsSelector = (state) => state.data.points;

export const pointsWithIdSelector = createSelector(
    pointsSelector,
    points => points.map((p, i) => ({...p, id: i}))
);

export const orderedPointsSelector = createSelector(
    pointsWithIdSelector,
    points => orderBy(points, p => p.x)
);

export const highlightedPointIdSelector = state => state.data.highlightedPointId;

export const maxAbsoluteXSelector = createSelector(
    pointsSelector,
    points => {
        const maxXpoint = maxBy(points, p => Math.abs(p.x));
        return maxXpoint ? Math.abs(maxXpoint.x) : 10;
    }
);

export const maxAbsoluteYSelector = createSelector(
    pointsSelector,
    points => {
        const maxYpoint = maxBy(points, p => Math.abs(p.y));
        return maxYpoint ? Math.abs(maxYpoint.y) : 10;
    }
);

export const scaleSelector = createSelector(
    maxAbsoluteXSelector,
    maxAbsoluteYSelector,    
    computeScaleFactor
);

export const maxXSelector = createSelector(
    pointsSelector,
    points => maxBy(points, p => p.x).x
);

export const minXSelector = createSelector(
    pointsSelector,
    points => minBy(points, p => p.x).x
);

export const isInterpolationPossibleSelector = createSelector(
    pointsSelector,
    points => points.length > 1
);