import compose from 'recompose/compose';
import { connect } from 'react-redux';
import withProps from 'recompose/withProps';
import withHandlers from 'recompose/withHandlers';

import MethodSelector from '../MethodSelector';
import { changeMethod } from '../../modules/methods/methodsActionCreators';
import { methodSelector } from '../../modules/methods/methodsSelectors';
import { isInterpolationModeEnabledSelector } from '../../modules/mode/modeSelectors';
import * as availableMethods from '../../common/availableMethods';

const mapStateToProps = (state) => ({
    selectedMethod: methodSelector(state),
    isInterpolationModeEnabled: isInterpolationModeEnabledSelector(state)
});

const mapDispatchToProps = {
    changeMethod
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withProps({
        methods: Object.keys(availableMethods).map(k => availableMethods[k])
    }),
    withHandlers({
        onChange: (props) => (event, key, payload) => {
            props.changeMethod(payload);
        }
    })
)(MethodSelector);