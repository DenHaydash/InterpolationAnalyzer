import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import styles from './ModeSwitcher.scss';

export default class ModeSwitcher extends PureComponent {
    render() {
        return (
            <div>
                <div className={styles.toggleBlock}>
                    <Toggle
                        label="Interpolate"
                        toggled={this.props.isInterpolationModeEnabled}
                        onToggle={this.props.onChange}
                        disabled={!this.props.isInterpolationPossible}
                    />
                </div>
                <Divider />
                <div className={styles.clearAllBlock}>
                    <RaisedButton label="Clear all" secondary={true} onClick={this.props.onClearAllClick} />
                </div>
            </div>
        );
    }
}

ModeSwitcher.propTypes = {
    isInterpolationModeEnabled: PropTypes.bool.isRequired,
    isInterpolationPossible: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onClearAllClick: PropTypes.func.isRequired
};