import { combineReducers } from 'redux';

import pointsReducer from '../modules/points/pointsReducer';
import methodsReducer from '../modules/methods/methodsReducer';
import modeReducer from '../modules/mode/modeReducer';

export default combineReducers({
    isInterpolationModeEnabled: modeReducer,
    method: methodsReducer,
    data: pointsReducer
});