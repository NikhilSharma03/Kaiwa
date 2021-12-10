import * as actionTypes from "./../actions/action_types"

const initialState = {
    token: null,
    userID: null,
    email: null,
    name: null,
    signup_error: null,
    login_error: null
}


const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.USER_SIGNUP:
            return {
                ...state,
                token: action.data.token,
                name: action.data.name,
                email: action.data.email,
                userID: action.data.id,
                signup_error: null
            }
        case actionTypes.USER_SIGNUP_ERROR:
            return {
                ...state,
                signup_error: action.message
            }
                
        case actionTypes.USER_LOGIN:
            return {
                ...state,
                token: action.data.token,
                name: action.data.name,
                email: action.data.email,
                userID: action.data.id,
                login_error: null
            }
            
        case actionTypes.USER_LOGIN_ERROR:
            return {
                ...state,
                login_error: action.message
            }

        default:
            return state
    }
}

export default reducer