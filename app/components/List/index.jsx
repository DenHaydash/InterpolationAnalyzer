import React, { PureComponent } from 'react';
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
    isInterpolationModeEnabled: React.PropTypes.bool.isRequired
};

const RightIconMenu = (props, item) => (
  <IconMenu iconButtonElement={IconButtonElement(props)}>
    <MenuItem onClick={props.onRemovePoint(item)}>Delete</MenuItem>
  </IconMenu>
);

RightIconMenu.propTypes = {
    onRemovePoint: React.PropTypes.func.isRequired
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
    points: React.PropTypes.arrayOf(React.PropTypes.shape({
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired
    })),
    isInterpolationModeEnabled: React.PropTypes.bool.isRequired,
    onRemovePoint: React.PropTypes.func.isRequired,
    onPointHighlight: React.PropTypes.func.isRequired
};