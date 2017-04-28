import * as methodsActions from './methodsActions';

import * as availableMethods from '../../common/availableMethods';

const defaultState = availableMethods.ols1.type;

export default function methodsReducer(state = defaultState, action) {
    switch (action.type) {
        case methodsActions.SELECT_METHOD:
            return action.payload.methodType;

        default:
            return state;
    }
}