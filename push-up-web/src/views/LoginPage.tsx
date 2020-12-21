import React, { useState } from "react";
import { Redirect } from "react-router";
import { LoginComp } from "../components/LoginComp";
import "../scss/page-style.scss";

interface IProps{

}

export const LoginPage: React.FC<IProps> = (props:IProps) => {

    const [revealLogin, setRevealLogin] = useState(false);
    const [directedToPage, setDirected] = useState(false);

        return(
        <div className="container">
            {revealLogin ?
            <>
                <LoginComp toggleFunction={()=>setRevealLogin(!revealLogin)}/>
                <div className="row justify-content-center">
                    <button className="no-login-btn-sm" 
                    onClick={()=>setDirected(true)}>Just let me start</button>
                </div>
            </>
            :
            <>
                <div className="row justify-content-center">
                    <button className="login-btn" 
                    onClick={()=>setRevealLogin(!revealLogin)}>Login</button>
                </div>
                <div className="row justify-content-center">
                    <button className="no-login-btn" 
                    onClick={()=>setDirected(true)}>Just let me start</button>
                </div>
            </>
            }
            
            {directedToPage ? <Redirect to="/noLogin" /> : <></>}
        </div>
    )
}