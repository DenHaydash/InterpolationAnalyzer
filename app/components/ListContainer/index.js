import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import { connect } from 'react-redux';

import { orderedPointsSelector } from '../../modules/points/pointsSelectors';
import { isInterpolationModeEnabledSelector } from '../../modules/mode/modeSelectors';
import { removePoint, highlightSelectedPoint } from '../../modules/points/pointsActionCreators';

import List from '../List';

const mapStateToProps = (state) => ({
    points: orderedPointsSelector(state),
    isInterpolationModeEnabled: isInterpolationModeEnabledSelector(state)
});

const mapDispatchToProps = {
    removePoint,
    highlightSelectedPoint
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({
        onRemovePoint: (props) => (point) => () => props.removePoint(point),
        onPointHighlight: (props) => (point) => () => {
            if (props.isInterpolationModeEnabled) {
                return;
            }
            
            props.highlightSelectedPoint(point);
        }
    })
)(List);