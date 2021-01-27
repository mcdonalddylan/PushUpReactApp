import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { LoginComp } from "../components/LoginComp";
import { RegisterComp } from "../components/RegisterComp";
import "../scss/page-style.scss";

interface IProps{
    email: string,
}

const LoginPage: React.FC<IProps> = (props:IProps) => {

    const [revealLogin, setRevealLogin] = useState(false);
    const [revealRegister, setRevealRegister] = useState(false);
    const [directedToPage, setDirected] = useState(false);
    const [directedToLoggedIn, setDirectedLogged] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);

    if(props.email.length != 0)
    {
        if(isLoggedIn == false)
        {
            setLoggedIn(true);
        }
    }
    else
    {
        if(isLoggedIn == true)
        {
            setLoggedIn(false);
        }
    }
        return(
        <div className="container">
            {isLoggedIn ?
                <div className="row justify-content-center log-btn-row">
                <button className="login-btn" 
                onClick={()=>setDirectedLogged(true)}>Back To Timer</button>
            </div>
            :
                revealLogin ?
            
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
            {directedToLoggedIn ? <Redirect to="/loggedIn" /> : <></>}
        </div>
    )
}

const mapStateToProps = (appState: any) => {
    return{
        email: appState.userState.email,
    };
};

export default connect<any>(mapStateToProps)(LoginPage);