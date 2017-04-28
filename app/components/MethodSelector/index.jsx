import React, { PureComponent } from 'react';
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
    selectedMethod: React.PropTypes.string.isRequired,
    isInterpolationModeEnabled: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
    methods: React.PropTypes.arrayOf(React.PropTypes.shape({
        type: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired
    }))
};