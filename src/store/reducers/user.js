import * as actionTypes from "../actionTypes";

const initialState = {
    user: {},
    program: {},
    returned: 0,
    isLoading: true,
};



export default function auth(state = initialState, action) {

    switch (action.type) {
        case actionTypes.INIT_USER_OPERATION:
            return {
                ...state,
                user: action.userData.user,
                program: action.userData.program,
                returned: action.userData.returned,
                isLoading: true,
            }
        case actionTypes.USER_COMPLETE_OPERATION:
            return {
                ...state,
                isLoading: false
            }
        default:
            // console.log('_DEFAULT_USER');
            break;
    }

    return state;
}
