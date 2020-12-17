import React, { useState } from "react";
import { Redirect } from "react-router";
import "../scss/header.scss";
import { ThemeToggleButton } from "./ThemeToggleButton";
import arrow from "../assets/arrow.svg";

interface IProps {

}

/**
 * Contains the logout button, site logo, and theme-toggle button.
 * 
 * @param props N/A
 */
export const HeaderComp: React.FC<IProps> = (props:IProps) => {

    const [redirectToLogin, setRedirect] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    /** logs the user out */
    const logout = () => {

        setRedirect(true);
        setRedirect(false);
    }

    const goBack = () => {
        setRedirect(true);
        setTimeout(()=>setRedirect(false),10);
    }

    return(
        <div className="container header">
            <div className="row justify-content-center">
            
            {isLoggedIn ?
                <div className="col-2">
                    {/* only render this button if the user is logged in */}
                    <button className="logout-btn"
                    onClick={logout}>Logout</button>
                </div> 
            :
                <div className="col-2">
                    <button className="go-back-btn" 
                    onClick={goBack}>Back to login</button>
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
                        <p className="logged-name">Logged in as: {}</p>
                    </div>
                </div>
            :
            <></>
            }

            {redirectToLogin ? <Redirect to="/"/> : <></>}
        </div>
    )
}