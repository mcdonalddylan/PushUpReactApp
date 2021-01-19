export const SET_NOTIF = "SET_NOTIF";

export const setNotifState = (notifData: any) => ({
    type: SET_NOTIF,
    payload: notifData,
});