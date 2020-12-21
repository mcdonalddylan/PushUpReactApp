import { EventEmitter } from "events";
import React, { SyntheticEvent } from "react";
import "../scss/page-style.scss";

interface IProps {
    toggleFunction:Function;
}

export const LoginComp: React.FC<IProps> = (props:IProps) => {

    const loginAttempt = (event:SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        const pass = event.currentTarget["password"].value;
        const email = event.currentTarget["email"].value;
    }

    const closeForm = () => {
        props.toggleFunction();
    }

    return(
        <div>
            <div className="row justify-content-center">
                <div className="log-comp">
                <button className="log-return-btn" onClick={closeForm}>X</button>
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

                        <div className="row justify-content-center" style={{marginTop: 20}}>
                            <input id="log-btn" type="submit" value="login" 
                            className="start-btn"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>  
    )
}