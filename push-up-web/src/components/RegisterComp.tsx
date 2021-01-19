import { EventEmitter } from "events";
import React, { SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { setNotifState } from "../actions/notifActions";
import "../scss/page-style.scss";
import axiosConfig from "../util/axiosConfig";

interface IProps {
    toggleFunction:Function;
}

export const RegisterComp: React.FC<IProps> = (props:IProps) => {

    const disptach = useDispatch();

    const registerAttempt = (event:SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        const pass = event.currentTarget["password"].value;
        const pass2 = event.currentTarget["password2"].value;
        const email = event.currentTarget["email"].value;
        const firstName = event.currentTarget["fName"].value;
        const lastName = event.currentTarget["lName"].value;

        if(pass != "" && pass2 != "" && email != "" 
        && firstName != "" && lastName != "")
        {
            if(pass === pass2)
            {
                axiosConfig.post(`/users/create/${email}+${pass}+${firstName}+${lastName}`)
                .then(()=>{
                    //stop spinner and show notification of a successful user addition
                    //alert(`User: ${firstName} ${lastName} successfully added!`);

                    const newNotif = {
                        id: Math.random()*10000,
                        notifType: "info",
                        msg: `User: ${firstName} ${lastName} successfully added!`,
                    }
        
                    disptach(setNotifState(newNotif));

                    props.toggleFunction();
                })
                .catch((error)=>{
                    console.log(error);
                    
                    const newNotif = {
                        id: Math.random()*10000,
                        notifType: "info",
                        msg: `ERROR: User unable to be added.`,
                    }
        
                    disptach(setNotifState(newNotif));

                })
            }
            else
            {
                const newNotif = {
                    id: Math.random()*10000,
                    notifType: "info",
                    msg: `ERROR: Passwords do not match.`,
                }
    
                disptach(setNotifState(newNotif));
            }
        }
        else
        {
            const newNotif = {
                id: Math.random()*10000,
                notifType: "info",
                msg: `ERROR: Not all fields are filled in.`,
            }

            disptach(setNotifState(newNotif));
        }   
    }

    const closeForm = () => {
        props.toggleFunction();
    }

    return(
        <div>
            <div className="row justify-content-center">
                <h2>Register:</h2>
            </div>

            <div className="row justify-content-center">
                <div className="log-comp">
                <button className="log-return-btn" onClick={closeForm}>X</button>
                    <form onSubmit={registerAttempt}>
                        <div className="row justify-content-center">
                            <h4 id="e-label" style={{textAlign: "center", margin: "auto"}}>Enter Your Email:</h4>
                        </div>
                        <div className="row justify-content-center">
                            <input id="email" type="email" name="email" 
                            className="push-input" placeholder="yo@whatup.biz" />
                        </div>

                        <div className="row justify-content-center" style={{marginTop: 20}}>
                            <h4 id="p-label" style={{textAlign: "center", margin: "auto"}}>Enter A Password:</h4>
                        </div>
                        <div className="row justify-content-center">
                            <input id="pass" type="password" name="password" 
                            className="push-input" placeholder="*********" />
                        </div>

                        <div className="row justify-content-center" style={{marginTop: 20}}>
                            <h4 id="p-label" style={{textAlign: "center", margin: "auto"}}>Enter That Password Again:</h4>
                        </div>
                        <div className="row justify-content-center">
                            <input id="pass2" type="password" name="password2" 
                            className="push-input" placeholder="*********" />
                        </div>

                        <div className="row justify-content-center" style={{marginTop: 20}}>
                            <h4 id="p-label" style={{textAlign: "center", margin: "auto"}}>Enter Your First Name:</h4>
                        </div>
                        <div className="row justify-content-center">
                            <input id="fName" type="text" name="fName" 
                            className="push-input" placeholder="Bob" />
                        </div>

                        <div className="row justify-content-center" style={{marginTop: 20}}>
                            <h4 id="p-label" style={{textAlign: "center", margin: "auto"}}>Enter Your Last Name:</h4>
                        </div>
                        <div className="row justify-content-center">
                            <input id="lName" type="text" name="lName" 
                            className="push-input" placeholder="Bobbington" />
                        </div>

                        <div className="row justify-content-center" style={{marginTop: 20}}>
                            <input id="log-btn" type="submit" value="Register" 
                            className="start-btn"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>  
    )
}