import React, { useState } from "react";
import { Redirect } from "react-router";
import { LoginComp } from "../components/LoginComp";
import { RegisterComp } from "../components/RegisterComp";
import "../scss/page-style.scss";

interface IProps{

}

export const LoginPage: React.FC<IProps> = (props:IProps) => {

    const [revealLogin, setRevealLogin] = useState(false);
    const [revealRegister, setRevealRegister] = useState(false);
    const [directedToPage, setDirected] = useState(false);

        return(
        <div className="container">
            {revealLogin ?
            
                revealRegister ?

                <RegisterComp toggleFunction={()=>setRevealRegister(!revealRegister)} />

                :

                <>
                    <LoginComp toggleFunction={()=>setRevealLogin(!revealLogin)}
                    toggleRegisterFunction={()=>setRevealRegister(!revealRegister)}/>
                    <div className="row justify-content-center no-log-btn-sm-row">
                        <button className="no-login-btn-sm" 
                        onClick={()=>setDirected(true)}>Just let me start</button>
                    </div>
                </>
            :
            <>
                <div className="row justify-content-center log-btn-row">
                    <button className="login-btn" 
                    onClick={()=>setRevealLogin(!revealLogin)}>Login</button>
                </div>
                <div className="row justify-content-center no-log-btn-row">
                    <button className="no-login-btn" 
                    onClick={()=>setDirected(true)}>Just let me start</button>
                </div>
            </>
            }
            
            {directedToPage ? <Redirect to="/noLogin" /> : <></>}
        </div>
    )
}