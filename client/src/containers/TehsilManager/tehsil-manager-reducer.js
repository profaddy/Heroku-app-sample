import ActionTypes from "./tehsil-manager-action-constants";


const INITIAL_STATE = {
    tehsils:[],
    addTehsilModalShowing:false
};

const Reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
    case ActionTypes.ADD_TEHSIL_SUCCESS:
        return state;
    case ActionTypes.FETCH_TEHSILS_SUCCESS:
        return{
            ...state,
            tehsils:action.data
        };
    case ActionTypes.OPEN_ADD_TEHSIL_MODAL:
        return{
            ...state,
            addTehsilModalShowing:true
        };
    case ActionTypes.CLOSE_ADD_TEHSIL_MODAL:
        return{
            ...state,
            addTehsilModalShowing:false
        };
    default:
        return state;
    }
};

export default Reducer;

