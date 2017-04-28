import * as pointsActions from './pointsActions';

const defaultState = {
    points: [],
    highlightedPointId: null
};

export default function pointsReducer(state = defaultState, action) {
    switch (action.type) {
        case pointsActions.ADD_POINT:
            return {
                ...state,
                points: [...state.points, action.payload]
            };

        case pointsActions.REMOVE_POINT:
            state.points.splice(action.payload, 1);
            return {
                ...state,
                points: [...state.points]
            };

        case pointsActions.REMOVE_ALL_POINTS:
            return {
                ...state,
                points: []
            };

        case pointsActions.ADD_HIGHLIGHTING_OF_POINT:
            return {
                ...state,
                highlightedPointId: action.payload
            };

        case pointsActions.REMOVE_HIGHLIGHTING_OF_POINT:
            return {
                ...state,
                highlightedPointId: null
            };

        default:
            return state;
    }
}