import { createSelector } from 'reselect';
import orderBy from 'lodash/orderBy';
import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';

import { toCanvasCoords } from '../../helpers/coordConverter';
import { width as canvasWidth, height as canvasHeight } from '../../common/canvasSettings';

export const pointsSelector = (state) => state.data.points;

export const pointsWithIdSelector = createSelector(
    pointsSelector,
    points => points.map((p, i) => ({...p, id: i}))
);

export const orderedPointsSelector = createSelector(
    pointsWithIdSelector,
    points => orderBy(points, 'x')
);

export const highlightedPointIdSelector = state => state.data.highlightedPointId;

export const maxAbsoluteXSelector = createSelector(
    pointsSelector,
    points => {
        const maxXpoint = maxBy(points, p => Math.abs(p.x));
        return maxXpoint ? maxXpoint.x : 10;
    }
);

export const maxAbsoluteYSelector = createSelector(
    pointsSelector,
    points => {
        const maxYpoint = maxBy(points, p => Math.abs(p.y));
        return maxYpoint ? maxYpoint.y : 10;
    }
);

export const scaleSelector = createSelector(
    maxAbsoluteXSelector,
    maxAbsoluteYSelector,    
    (maxX, maxY) => ({
        x: canvasWidth / 2 > maxX ? 1 : canvasWidth / 2 / maxX,
        y: canvasHeight / 2 > maxY ? 1 : canvasHeight / 2 / maxY
    })
)

export const canvasPointsSelector = createSelector(
    orderedPointsSelector,
    scaleSelector,
    (points, scale) => points.map(p => ({...p, ...toCanvasCoords(p, scale)}))
);

export const maxXSelector = createSelector(
    pointsSelector,
    points => maxBy(points, p => p.x).x
);

export const minXSelector = createSelector(
    pointsSelector,
    points => minBy(points, p => p.x).x
);

export const maxYSelector = createSelector(
    pointsSelector,
    points => maxBy(points, p => p.y).y
);

export const minYSelector = createSelector(
    pointsSelector,
    points => minBy(points, p => p.y).y
);

export const isInterpolationPossibleSelector = createSelector(
    pointsSelector,
    points => points.length > 1
)