import React from "react";
import react, { SyntheticEvent, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { setNotifState } from "../actions/notifActions";
import { PushUpSpinner } from "../components/PushUpSpinner";
import axiosConfig from "../util/axiosConfig";

interface IProps {
    userid: number,
    email: string,
    firstName: string,
    lastName: string,
    verified: boolean,
}

const UserSettingsPage:React.FC<IProps> = (props:IProps) => {

    const [redirectToLogin, setRedirect] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const dispatch = useDispatch();

    //goes back to login page if not logged in
    if(props.email.length == 0)
    {
        window.location.href="/";
    }

    const changePassword = (event:SyntheticEvent<HTMLFormElement>) => {

        event.preventDefault();

        const pass = event.currentTarget["password"].value;
        const pass2 = event.currentTarget["password2"].value;

        if (pass === pass2 && pass != "")
        {
            axiosConfig.post("/users/changePass/"+props.email+"+"+pass)
            .then((response)=>{
                console.log(response);
                console.log(response.data);

                const newNotif = {
                    id: Math.random()*10000,
                    show: true,
                    notifType: "notif-info",
                    msg: "***Password successfully changed to: "+pass,
                }
    
                dispatch(setNotifState(newNotif));
            })
            .catch(()=>{
                const newNotif = {
                    id: Math.random()*10000,
                    show: true,
                    notifType: "notif-error",
                    msg: "ERROR: Unknown error. Password was not altered.",
                }
    
                dispatch(setNotifState(newNotif));
            })
        }
        else if (pass == "")
        {
            setShowSpinner(false);
                const newNotif = {
                    id: Math.random()*10000,
                    show: true,
                    notifType: "notif-error",
                    msg: "ERROR: Nothing entered in either text box.",
                }
    
                dispatch(setNotifState(newNotif));
        }
        else
        {
            setShowSpinner(false);
                const newNotif = {
                    id: Math.random()*10000,
                    show: true,
                    notifType: "notif-error",
                    msg: "ERROR: New passwords do not match.",
                }
    
                dispatch(setNotifState(newNotif));
        }
    }

    const changeFName = (event:SyntheticEvent<HTMLFormElement>) => {

        event.preventDefault();

        const name = event.currentTarget["fName"].value;

        if (name != "")
        {
            axiosConfig.post("/users/changeFN/"+props.email+"+"+name)
            .then((response)=>{
                console.log(response);
                console.log(response.data);

                const newNotif = {
                    id: Math.random()*10000,
                    show: true,
                    notifType: "notif-info",
                    msg: "***First name successfully changed to: "+name,
                }
    
                dispatch(setNotifState(newNotif));
            })
            .catch(()=>{
                const newNotif = {
                    id: Math.random()*10000,
                    show: true,
                    notifType: "notif-error",
                    msg: "ERROR: Unknown error. Name was not altered.",
                }
    
                dispatch(setNotifState(newNotif));
            })
        }
        else if (name == "")
        {
            setShowSpinner(false);
                const newNotif = {
                    id: Math.random()*10000,
                    show: true,
                    notifType: "notif-error",
                    msg: "ERROR: Nothing entered in either text box.",
                }
    
                dispatch(setNotifState(newNotif));
        }
    }

    const changeLName = (event:SyntheticEvent<HTMLFormElement>) => {

        event.preventDefault();

        const name = event.currentTarget["lName"].value;

        if (name != "")
        {
            axiosConfig.post("/users/changeLN/"+props.email+"+"+name)
            .then((response)=>{
                console.log(response);
                console.log(response.data);

                const newNotif = {
                    id: Math.random()*10000,
                    show: true,
                    notifType: "notif-info",
                    msg: "***Last name successfully changed to: "+name,
                }
    
                dispatch(setNotifState(newNotif));
            })
            .catch(()=>{
                const newNotif = {
                    id: Math.random()*10000,
                    show: true,
                    notifType: "notif-error",
                    msg: "ERROR: Unknown error. Name was not altered.",
                }
    
                dispatch(setNotifState(newNotif));
            })
        }
        else if (name == "")
        {
            setShowSpinner(false);
                const newNotif = {
                    id: Math.random()*10000,
                    show: true,
                    notifType: "notif-error",
                    msg: "ERROR: Nothing entered in either text box.",
                }
    
                dispatch(setNotifState(newNotif));
        }
    }

    const closeForm = () => {
        setRedirect(!redirectToLogin);
    }

    return (
        <>
            <div className="row justify-content-center" style={{marginBottom: 10, marginTop: 5}}>
                <h2>User Settings:</h2>
            </div>
            <div className="row justify-content-center">
                <div className="log-comp">
                <button className="log-return-btn" onClick={closeForm}>X</button>
                    {/* change password form */}
                    <form onSubmit={changePassword}>
                        <div className="row justify-content-center" style={{marginTop: 20}}>
                            <h4 id="p-label" style={{textAlign: "center", margin: "auto"}}>Enter A New Password:</h4>
                        </div>
                        <div className="row justify-content-center">
                            <input id="pass" type="password" name="password" 
                            className="push-input" placeholder="*********" />
                        </div>

                        <div className="row justify-content-center" style={{marginTop: 20}}>
                            <h4 id="p-label" style={{textAlign: "center", margin: "auto"}}>Re-enter That New Password:</h4>
                        </div>
                        <div className="row justify-content-center">
                            <input id="pass2" type="password" name="password2" 
                            className="push-input" placeholder="*********" />
                        </div>

                        <div className="row justify-content-center start-btn-row" style={{marginTop: 20}}>
                            <input id="sub-btn" type="submit" value="Submit Changes" 
                            className="start-btn"/>
                        </div>
                    </form>

                    <form onSubmit={changeFName}>
                        <div className="row justify-content-center" style={{marginTop: 20}}>
                            <h4 id="p-label" style={{textAlign: "center", margin: "auto"}}>New First Name:</h4>
                        </div>
                        <div className="row justify-content-center">
                            <input id="fName" type="text" name="fName" 
                            className="push-input" placeholder={props.firstName} />
                        </div>

                        <div className="row justify-content-center start-btn-row" style={{marginTop: 20}}>
                            <input id="sub-btn" type="submit" value="Submit Changes" 
                            className="start-btn"/>
                        </div>
                    </form>

                    <form onSubmit={changeLName}>
                        <div className="row justify-content-center" style={{marginTop: 20}}>
                            <h4 id="p-label" style={{textAlign: "center", margin: "auto"}}>New Last Name:</h4>
                        </div>
                        <div className="row justify-content-center">
                            <input id="lName" type="text" name="lName" 
                            className="push-input" placeholder={props.lastName} />
                        </div>

                        <div className="row justify-content-center start-btn-row" style={{marginTop: 20}}>
                            <input id="sub-btn" type="submit" value="Submit Changes" 
                            className="start-btn"/>
                        </div>
                    </form>
                    
                    {showSpinner ?
                    <div className="row justify-content-center">
                        <PushUpSpinner />
                    </div>
                :
                    <></>
                }
                </div>
            </div>
            {redirectToLogin ? <Redirect to="/LoggedIn"/> : <></>}
        </>
    )
}

const mapStateToProps = (appState: any) => {
    return{
        userid: appState.userState.userid,
        email: appState.userState.email,
        firstName: appState.userState.firstName,
        lastName: appState.userState.lastName,
        verified: appState.userState.verified,
    };
};

export default connect<any>(mapStateToProps)(UserSettingsPage);