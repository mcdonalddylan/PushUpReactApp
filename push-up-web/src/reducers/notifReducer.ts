import { SET_NOTIF } from "../actions/notifActions"
import { INotifState } from "./reduxInterfaces";

const initialNotifState:INotifState = {
    id: 0,
    notifType: "",
    msg: "Test notif",
}

export const notifReducer = (state:INotifState = initialNotifState, action: any) => {
    switch (action.type) {
        case SET_NOTIF:
            return {...state, ...action.payload};
        default:
            return state;
    }
}