import * as methodsActions from './methodsActions';

export function changeMethod(methodType) {
    return {
        type: methodsActions.SELECT_METHOD,
        payload: { methodType }
    }
}