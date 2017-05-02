import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class MethodSelector extends PureComponent {
    render() {
        return (
            <SelectField
                floatingLabelText="Method"
                value={this.props.selectedMethod}
                onChange={this.props.onChange}
                disabled={this.props.isInterpolationModeEnabled}
                autoWidth={true}
                >
                {this.props.methods.map((method, index) => (
                    <MenuItem key={index} value={method.type} primaryText={method.name} />
                ))}
            </SelectField>
        );
    }
}

MethodSelector.propTypes = {
    selectedMethod: PropTypes.string.isRequired,
    isInterpolationModeEnabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    methods: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }))
};