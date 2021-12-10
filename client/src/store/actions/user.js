import * as actionTypes from "./action_types"
import { UserRequest } from "./../../kaiwapb/user_pb"
import { UserServiceClient } from "./../../kaiwapb/user_grpc_web_pb"

export const SignUp = ({name, email, password}) => {
    return dispatch => {
        const request = new UserRequest();
        request.setName(name);
        request.setPassword(password);
        request.setEmail(email);

        const client = new UserServiceClient("http://localhost:8080", {}, {});
        client.userSignUp(request, {}, (err, ret) => {
            if(err){
                dispatch({type:actionTypes.USER_SIGNUP_ERROR, message: err.message}) 
            } else {
                dispatch({type: actionTypes.USER_SIGNUP, data: {id: ret.array[0], name: ret.array[1], email: ret.array[2], token: ret.array[4]}})
            }
        });
    }
}

export const LogIn = ({email, password}) => {
    return dispatch => {
        const request = new UserRequest();
        request.setEmail(email);
        request.setPassword(password);

        const client = new UserServiceClient("http://localhost:8080", {}, {});
        client.userLogin(request, {}, (err, ret) => {
            if(err){
                dispatch({type:actionTypes.USER_LOGIN_ERROR, message: err.message}) 
            } else {
                dispatch({type: actionTypes.USER_LOGIN, data: {id: ret.array[0], name: ret.array[1], email: ret.array[2], token: ret.array[4]}})
            }
        });
    }
}

export const ClearLoginError = () => {
    return {
        type: actionTypes.USER_LOGIN_ERROR_CLEAR
    }
}

export const ClearSignUpError = () => {
    return {
        type: actionTypes.USER_SIGNUP_ERROR_CLEAR
    }
}