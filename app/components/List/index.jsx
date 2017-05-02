import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List as UiList, ListItem } from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const IconButtonElement = ({isInterpolationModeEnabled}) => (
  <IconButton
    touch={true}
    disabled={isInterpolationModeEnabled}
  >
    <MoreVertIcon />
  </IconButton>
);

IconButtonElement.propTypes = {
    isInterpolationModeEnabled: PropTypes.bool.isRequired
};

const RightIconMenu = (props, item) => (
  <IconMenu iconButtonElement={IconButtonElement(props)}>
    <MenuItem onClick={props.onRemovePoint(item)}>Delete</MenuItem>
  </IconMenu>
);

RightIconMenu.propTypes = {
    onRemovePoint: PropTypes.func.isRequired
};

export default class List extends PureComponent {
    render() {
        return (
            <UiList>
                {this.props.points.map((p, i) => (
                    <ListItem
                        key={i}
                        onClick={this.props.onPointHighlight(p)}
                        rightIconButton={RightIconMenu(this.props, p)}
                        primaryText={`{ x:${p.x}; y:${p.y} }`} />
                ))}
            </UiList>
        )
    }
}

List.propTypes = {
    points: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    })),
    isInterpolationModeEnabled: PropTypes.bool.isRequired,
    onRemovePoint: PropTypes.func.isRequired,
    onPointHighlight: PropTypes.func.isRequired
};