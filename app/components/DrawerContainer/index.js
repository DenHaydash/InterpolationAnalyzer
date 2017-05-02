import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import range from 'lodash/range';
import maxBy from 'lodash/maxBy';

import Drawer from '../Drawer';

import { isInterpolationModeEnabledSelector } from '../../modules/mode/modeSelectors';
import { minXSelector,
         maxXSelector,
         scaleSelector,
         pointsSelector,
         orderedPointsSelector,
         highlightedPointIdSelector 
} from '../../modules/points/pointsSelectors';
import { methodSelector } from '../../modules/methods/methodsSelectors';

import { addPoint } from '../../modules/points/pointsActionCreators';

import { width, height } from '../../common/canvasSettings';
import * as pointTypes from '../../common/pointTypes';
import * as availableMethods from '../../common/availableMethods'

import interpolationMethodFactory from '../../algorithms/factory';
import { calculateLength } from '../../algorithms/base/vectorMethods';

import { toRealCoords, toCanvasCoords } from '../../helpers/coordConverter';
import { computeScaleFactor } from '../../helpers/scaleHelper';

const defaultCalculatedPoints = [];
const defaultInfo = '';
const dotsPerPath = 500;

const rangeGenerator = (state) => {
    switch (methodSelector(state)) {
        case availableMethods.paramenticGauss.type:
            return range(0, state.data.points.length - 1,  (state.data.points.length - 1) / dotsPerPath / 2);
        
        case availableMethods.aggregatedGauss.type:
        {
            const points = pointsSelector(state);
            const curveLength = points
                .map((p, i) => ({ ...p, t: i === 0 ? 0 : calculateLength(points[i - 1], p) }))
                .reduce((length, current) => length + current.t, 0);

            return range(0, curveLength, curveLength / dotsPerPath / 2);
        }

        default:
        {
            const minX = minXSelector(state);
            const maxX = maxXSelector(state);
            return range(minX, maxX, (Math.abs(maxX - minX) / dotsPerPath));
        }
    }
};

const pointsGetter = (state) => {
    switch (methodSelector(state)) {
        case availableMethods.paramenticGauss.type:
        case availableMethods.aggregatedGauss.type:
            return pointsSelector(state);
        
        default:
            return orderedPointsSelector(state);        
    }
};


const mapStateToProps = (state) => {
    const interpolationMethod = state.isInterpolationModeEnabled &&
        interpolationMethodFactory(methodSelector(state))(pointsGetter(state));

    const calculatedPoints = state.isInterpolationModeEnabled ?
                rangeGenerator(state)
                    .map(n => ({...interpolationMethod.calculate(n)})) :
                defaultCalculatedPoints;

    const scale = state.isInterpolationModeEnabled ?
        computeScaleFactor(
            Math.abs(maxBy(calculatedPoints, p => Math.abs(p.x)).x),
            Math.abs(maxBy(calculatedPoints, p => Math.abs(p.y)).y)) :
        scaleSelector(state);

    const points = orderedPointsSelector(state)
        .map(p => ({ ...p, type: pointTypes.base }))
        .concat(calculatedPoints
                .map(p => ({ ...p, type: pointTypes.calculated })))
        .map(p => ({ ...p, ...toCanvasCoords(p, scale) }));

    return {
        points,
        highlightedPointId: highlightedPointIdSelector(state),
        info: interpolationMethod.info || defaultInfo,
        isInterpolationModeEnabled: isInterpolationModeEnabledSelector(state),
        scale
    };
};

const mapDispatchToProps = {
    addPoint
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withProps({
        width,
        height
    }),
    withHandlers({
        onClick: (props) => ({evt: event}) => {
            if (props.isInterpolationModeEnabled) {
                return;
            }

            const rect = event.target.getBoundingClientRect();
            props.addPoint(
                toRealCoords({x: event.clientX - rect.left, y: event.clientY - rect.top}, props.scale))
        }
    })
)(Drawer);