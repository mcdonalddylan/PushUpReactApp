import axios from "axios";
import { EventEmitter } from "events";
import React, { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { Spinner } from "react-bootstrap";
import { setNotifState } from "../actions/notifActions";
import { setUserState } from "../actions/userActions";
import "../scss/page-style.scss";
import axiosconfig from "../util/axiosConfig";
import { initialUserState } from "../reducers/userReducer";
import { PushUpSpinner } from "./PushUpSpinner";

interface IProps {
    toggleFunction:Function,
    toggleRegisterFunction:Function,
}

export const LoginComp: React.FC<IProps> = (props:IProps) => {

    const [redirectToLogin, setRedirect] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [showForgot, setForgot] = useState(false);

    const dispatch = useDispatch();

    const loginAttempt = (event:SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (showSpinner == false)
        {
            const pass = event.currentTarget["password"].value;
            const email = event.currentTarget["email"].value;
    
            setShowSpinner(true);
            axiosconfig.post(`/users/login/${email}+${pass}`).then((response:any)=>{
                
                setShowSpinner(false);
                console.log(response.data);
                if(response.data != null)
                {
                    //alert(`Logged in as: ${response.data.firstName} ` +
                    //`${response.data.lastName} babyyyy`);
                    
                    const userData = {
                        userid: response.data.userid,
                        email: response.data.email,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        verified: response.data.verified,
                    }
    
                    dispatch(setUserState(userData));
    
                    const newNotif = {
                        id: Math.random()*10000,
                        show: true,
                        notifType: "notif-info",
                        msg: "User: " + userData.firstName + " logged in!",
                    }
    
                    dispatch(setNotifState(newNotif));
    
                    setRedirect(!redirectToLogin); //redirects you to new logged in page
                }
                else
                {
                    //alert("ERROR: Invalid credentials");
                    setShowSpinner(false);
    
                    dispatch(setUserState(initialUserState));

                    const newNotif = {
                        id: Math.random()*10000,
                        show: true,
                        notifType: "notif-error",
                        msg: "ERROR: Invalid credentials.",
                    }
    
                    dispatch(setNotifState(newNotif));
                }
            })
            .catch((error) => {
                console.log(error);
                //alert("not logged in :(");
                setShowSpinner(false);
    
                dispatch(setUserState(initialUserState));

                const newNotif = {
                    id: Math.random()*10000,
                    show: true,
                    notifType: "notif-error",
                    msg: "ERROR: Log in error.",
                }
    
                dispatch(setNotifState(newNotif));
            });
        }
    }

    const forgot = (event:SyntheticEvent<HTMLFormElement>) =>{
        event.preventDefault();

        if(showSpinner == false)
        {
            const email = event.currentTarget["email"].value;

            setShowSpinner(true);
            axiosconfig.post("/users/newPass/"+email)
            .then(()=>{
                setShowSpinner(false);

                const newNotif = {
                    id: Math.random()*10000,
                    show: true,
                    notifType: "notif-info",
                    msg: "***New password sent to: " + email,
                }

                dispatch(setNotifState(newNotif));
            })
            .catch((error)=>{
                setShowSpinner(false);

                const newNotif = {
                    id: Math.random()*10000,
                    show: true,
                    notifType: "notif-error",
                    msg: "ERROR: New password not sent.",
                }

                dispatch(setNotifState(newNotif));
            })
        }
    }

    const closeForm = () => {
        props.toggleFunction();
    }

    return(
        <div>
            {showForgot ? 
            <div className="row justify-content-center">
                <h2>Forgot Password:</h2>
            </div>
            :
            <div className="row justify-content-center">
                <h2>Login:</h2>
            </div>
            }
            
            
            <div className="row justify-content-center">
                <div className="log-comp">
                <button className="log-return-btn" onClick={closeForm}>X</button>
                {showForgot ?
                <form onSubmit={forgot}>
                    <div className="row justify-content-center">
                        <h4 id="e-label" style={{textAlign: "center", margin: "auto"}}>Your email:</h4>
                    </div>
                    <div className="row justify-content-center">
                        <input id="email" type="email" name="email" 
                        className="push-input" placeholder="yo@whatup.biz" />
                    </div>

                    <div className="row justify-content-center start-btn-row" style={{marginTop: 20}}>
                        <input id="log-btn" type="submit" value="Send new password" 
                        className="start-btn"/>
                    </div>

                    <div className="row justify-content-center start-btn-row" style={{marginTop: 15}}>
                        <button onClick={()=>setForgot(!showForgot)} className="start-btn">Back to login</button>
                    </div>
                </form>
                :
                <form onSubmit={loginAttempt}>
                        <div className="row justify-content-center">
                            <h4 id="e-label" style={{textAlign: "center", margin: "auto"}}>Email:</h4>
                        </div>
                        <div className="row justify-content-center">
                            <input id="email" type="email" name="email" 
                            className="push-input" placeholder="yo@whatup.biz" />
                        </div>

                        <div className="row justify-content-center" style={{marginTop: 20}}>
                            <h4 id="p-label" style={{textAlign: "center", margin: "auto"}}>Password:</h4>
                        </div>
                        <div className="row justify-content-center">
                            <input id="pass" type="password" name="password" 
                            className="push-input" placeholder="*********" />
                        </div>

                        <div className="row justify-content-center start-btn-row" style={{marginTop: 20}}>
                            <input id="log-btn" type="submit" value="login" 
                            className="start-btn"/>
                        </div>

                        <div className="row justify-content-center start-btn-row" style={{marginTop: 15}}>
                            <button onClick={()=>setForgot(!showForgot)} className="start-btn">Forgot password</button>
                        </div>
                </form>
                }
                    
                        {showSpinner ?
                        <div className="row justify-content-center" style={{marginTop: 5}}>
                            {/* <Spinner animation="grow" variant="info" /> */}
                            <PushUpSpinner />
                        </div>
                        :
                        <></>
                        }
                        
                    
                </div>
                
            </div>

            <div className="row justify-content-center" style={{marginBottom:10}}>
                <a onClick={()=>props.toggleRegisterFunction()}>Don't have an account?</a>
            </div>

            {redirectToLogin ? <Redirect to="/LoggedIn"/> : <></>}
        </div>  
    )
}