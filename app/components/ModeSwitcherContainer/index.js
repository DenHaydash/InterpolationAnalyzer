import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';

import { toggleInterpolationMode } from '../../modules/mode/modeActionCreators';
import { removeAllPoints } from '../../modules/points/pointsActionCreators';

import { isInterpolationPossibleSelector } from '../../modules/points/pointsSelectors';
import { isInterpolationModeEnabledSelector } from '../../modules/mode/modeSelectors';

import ModeSwitcher from '../ModeSwitcher';

const mapStateToProps = (state) => ({
    isInterpolationModeEnabled: isInterpolationModeEnabledSelector(state),
    isInterpolationPossible: isInterpolationPossibleSelector(state)
});

const mapDispatchToProps = {
    toggleInterpolationMode,
    removeAllPoints
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({
        onChange: (props) => () => props.toggleInterpolationMode(),
        onClearAllClick: (props) => () => props.removeAllPoints()
    })
)(ModeSwitcher);