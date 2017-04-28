import * as modeActions from './modeActions';
import * as pointsActions from '../points/pointsActions';

const defaultState = false;

export default function modeReducer(state = defaultState, action) {
    switch (action.type) {
        case modeActions.TOGGLE_INTERPOLATION_MODE:
            return !state;

        case pointsActions.REMOVE_ALL_POINTS:
            return false;

        default:
            return state;
    }
}