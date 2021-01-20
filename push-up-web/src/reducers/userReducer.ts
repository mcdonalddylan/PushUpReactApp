import { SET_USER } from "../actions/userActions";
import { IUserState } from "./reduxInterfaces";

export const initialUserState:IUserState = {
    userid: 0,
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    verified: false
}

export const userReducer = (state:any = initialUserState, action:any) => {
    switch(action.type){
        case SET_USER:
            return {...state, ...action.payload};
        default:
            return state;
    }
}