export const SET_USER = "SET_USER";

export const setUserState = (userData: any) => ({
    type: SET_USER,
    payload: userData,
});