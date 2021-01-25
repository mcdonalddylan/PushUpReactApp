import React, { useState } from "react";
import { Redirect } from "react-router";
import "../scss/header.scss";
import { ThemeToggleButton } from "./ThemeToggleButton";
import arrow from "../assets/arrow.svg";
import { connect, useDispatch } from "react-redux";
import { setUserState } from "../actions/userActions";
import { initialUserState } from "../reducers/userReducer";

interface IProps {
    email: string,
    firstName: string,
    lastName: string,
}

/**
 * Contains the logout button, site logo, and theme-toggle button.
 * 
 * @param props N/A
 */
const HeaderComp: React.FC<IProps> = (props:IProps) => {

    const [redirectToLogin, setRedirectToLog] = useState(false);
    const [redirectToSettings, setRedirectToSettings] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();

    /** logs the user out */
    const logout = () => {
        dispatch(setUserState(initialUserState));

        // if(isLoggedIn == true)
        // {
        //     setIsLoggedIn(false);
        // }

        setRedirectToLog(true);
        setTimeout(()=>setRedirectToLog(false),10);
    }

    /** sends you to the settings page */
    const settings = () => {
        if(redirectToSettings != true)
        {
            setRedirectToSettings(true);
            setTimeout(()=>setRedirectToSettings(false),10);
        }
    }

    if(props.email.length > 0)
    {
        if(isLoggedIn == false)
        {
            setIsLoggedIn(true);
        }
    }
    else
    {
        if(isLoggedIn == true)
        {
            setIsLoggedIn(false);
        }
    }

    return(
        <div className="rounded-div header">
        <div className="container">
            <div className="row justify-content-center">
            
            {isLoggedIn ?
            <>
                <div className="col-1">
                    {/* only render this button if the user is logged in */}
                    <button className="logout-btn"
                    onClick={logout}>Logout</button>
                </div>
                <div className="col-1">
                    {/* only render this button if the user is logged in */}
                    <button className="theme-btn"
                    onClick={settings}>Settings</button>
                </div> 
            </>
            :
                <div className="col-2">
                    <></>
                </div> 
            }
                
                <div className="col-8 text-center" >
                    <h1 className="app-name">PUSH UP APP</h1>
                    <img className="logo" src={arrow} alt="logo" />
                </div>

                <ThemeToggleButton />

            </div>
            {isLoggedIn ? 
                <div className="container">
                    <div className="row justify-content-center">
                        <p className="logged-name">Logged in as: {props.firstName} {props.lastName}</p>
                    </div>
                </div>
            :
            <></>
            }

            {redirectToLogin ? <Redirect to="/"/> : <></>}
            {redirectToSettings ? <Redirect to="/userSettings"/> : <></>}
        </div>
        </div>
    )
}

const mapStateToProps = (appState: any) => {
    return{
        email: appState.userState.email,
        firstName: appState.userState.firstName,
        lastName: appState.userState.lastName,
    };
};

export default connect<IProps>(mapStateToProps)(HeaderComp);