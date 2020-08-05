import ActionTypes from "./tehsil-manager-action-constants";

const Actions = {
    _addTehsil: (tehsil) => {
        return {
            type: ActionTypes.ADD_TEHSIL_REQUEST,
            tehsil
        };
    },
    _fetchTehsils: () => {
        return {
            type: ActionTypes.FETCH_TEHSILS_REQUEST
        };
    },
    _openAddTehsilModal:() => {
        return {
            type: ActionTypes.OPEN_ADD_TEHSIL_MODAL
        };
    },
    _closeAddTehsilModal:() => {
        return {
            type: ActionTypes.CLOSE_ADD_TEHSIL_MODAL
        };
    }
};

export default Actions;
