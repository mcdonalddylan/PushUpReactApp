import React, { useState } from "react";
import { connect } from "react-redux";
import { MainComp } from "../components/MainComp";
import nope from "../assets/nope.gif";
import { Spinner } from "react-bootstrap";

interface IProps {
    userid: number,
    firstName: string,
    lastName: string,
    verified: boolean,
}

const LoggedPage: React.FC<IProps> = (props:IProps) => {

    const [ifVerified, setVerified] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    //goes back to login page if not logged in
    if(props.userid == 0)
    {
        window.location.href="/";
    }

    if (props.verified == true)
    {
        setVerified(true);
    }

    const reSendEmail = () => {
        //make sure that multipule clicks won't send multipule new emails
        setShowSpinner(!showSpinner);
    }

    return(
        <>
            {ifVerified ?
            <>
                <div className="container">
                    <div className="row justify-content-center">
                        <h3>Welcome back {props.firstName} {props.lastName}!</h3>
                    </div>
                </div>
                <MainComp />
            </>
            :
            <div className="container">
                <div className="row justify-content-center">
                    <h1>{props.firstName} {props.lastName} has NOT verified their email.</h1>
                </div>

                <div className="row justify-content-center">
                    <img className="nope-img" src={nope} alt="nope.gif" />
                </div>

                <div className="row justify-content-center" style={{marginTop: 15}}>
                    <button className="no-login-btn-sm" 
                    onClick={reSendEmail}>Re-send verification email</button>
                </div>

                {showSpinner ?
                    <div className="row justify-content-center">
                        <Spinner animation="grow" role="warning" />
                    </div>
                :
                    <></>
                }
                
            </div>
                
            }
            
        </>
    )
}

const mapStateToProps = (appState: any) => {
    return{
        userid: appState.userState.userid,
        firstName: appState.userState.firstName,
        lastName: appState.userState.lastName,
        verified: appState.userState.verified,
    };
};

export default connect<any>(mapStateToProps)(LoggedPage);