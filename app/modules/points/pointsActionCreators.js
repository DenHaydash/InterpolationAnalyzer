import * as pointsActions from './pointsActions';

export function addPoint({x, y}) {
    return {
        type: pointsActions.ADD_POINT,
        payload: { x, y }
    }
}

export function removePoint({id}) {
    return {
        type: pointsActions.REMOVE_POINT,
        payload: id
    }
}

export function removeAllPoints() {
    return {
        type: pointsActions.REMOVE_ALL_POINTS
    }
}

export function highlightPoint({id}) {
    return {
        type: pointsActions.ADD_HIGHLIGHTING_OF_POINT,
        payload: id
    }
}

export function highlightSelectedPoint({id}) {
    return dispatch => {
        dispatch(highlightPoint({id}));

        setTimeout(() => dispatch(unhighlightPoint({id})), 3000);
    }
}

export function unhighlightPoint({id}) {
    return {
        type: pointsActions.REMOVE_HIGHLIGHTING_OF_POINT,
        payload: id
    }
}