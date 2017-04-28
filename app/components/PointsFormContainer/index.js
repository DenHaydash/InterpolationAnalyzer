import compose from 'recompose/compose';
import { connect } from 'react-redux';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';

import PointsForm from '../PointsForm';
import { addPoint } from '../../modules/points/pointsActionCreators';

import { isInterpolationModeEnabledSelector } from '../../modules/mode/modeSelectors';

const mapStateToProps = (state) => ({
    isInterpolationModeEnabled: isInterpolationModeEnabledSelector(state)
});

const mapDispatchToProps = {
    addPoint
};

const numberRegexp = /^(\+|\-)?\d+$/;

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withState('x', 'setX', ''),
    withState('y', 'setY', ''),
    withHandlers({
        onSubmit: (props) => (event) => {
            event.preventDefault();

            if (props.isInterpolationModeEnabled) {
                return;
            }

            if (!numberRegexp.test(props.x) || !numberRegexp.test(props.y)) {
                return;
            }

            props.addPoint({x: Number(props.x), y: Number(props.y)});

            props.setX('');
            props.setY('');
        },
        onChange: (props) => (event, value) => {
            if (event.target.name === 'x') {
                props.setX(value);
            }

            if (event.target.name === 'y') {
                props.setY(value);
            }
        }
    })
)(PointsForm);