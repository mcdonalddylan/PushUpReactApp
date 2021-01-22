import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { MainComp } from "../components/MainComp";
import nope from "../assets/nope.gif";
import { Spinner } from "react-bootstrap";
import axiosConfig from "../util/axiosConfig";
import { setNotifState } from "../actions/notifActions";
import { PushUpSpinner } from "../components/PushUpSpinner";

interface IProps {
    userid: number,
    email: string,
    firstName: string,
    lastName: string,
    verified: boolean,
}

const LoggedPage: React.FC<IProps> = (props:IProps) => {

    const [ifVerified, setVerified] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const dispatch = useDispatch();
    
    //goes back to login page if not logged in
    if(props.userid == 0)
    {
        window.location.href="/";
    }

    if (props.verified == true && ifVerified != true)
    {
        setVerified(true);
    }

    const reSendEmail = () => {
        //make sure that multipule clicks won't send multipule new emails
        if (showSpinner == false)
        {
            setShowSpinner(true);
            axiosConfig.post("/verify/resend/"+props.email)
            .then((response)=> {
                console.log(response
                    );

                if(response.data == "success")
                {
                    setShowSpinner(false);
                    const newNotif = {
                        id: Math.random()*10000,
                        show: true,
                        notifType: "info",
                        msg: "**Email resent to: " + props.email + "**",
                    }
    
                    dispatch(setNotifState(newNotif));
                }
                else if (response.data == "error")
                {
                    setShowSpinner(false);
                    const newNotif = {
                        id: Math.random()*10000,
                        show: true,
                        notifType: "info",
                        msg: "ERROR: Unknown error. Email not sent.",
                    }
    
                    dispatch(setNotifState(newNotif));
                }
            })
            .catch((error)=>{
                console.log(error);

                setShowSpinner(false);
                const newNotif = {
                    id: Math.random()*10000,
                    show: true,
                    notifType: "info",
                    msg: "ERROR: Unknown error. Email not sent.",
                }
    
                dispatch(setNotifState(newNotif));
            });
        }
    }

    return(
        <>
            {ifVerified ?
            <>
                <div className="container">
                    <div className="row justify-content-center">
                        <h3 style={{marginTop: 5, marginBottom: 20}}>
                            Welcome back {props.firstName} {props.lastName}!</h3>
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

                <div className="row justify-content-center no-log-btn-sm-row" style={{marginTop: 15}}>
                    <button className="no-login-btn-sm" 
                    onClick={reSendEmail}>Re-send verification email</button>
                </div>

                {showSpinner ?
                    <div className="row justify-content-center">
                        {/* <Spinner animation="grow" variant="warning" /> */}
                        <PushUpSpinner />
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
        email: appState.userState.email,
        firstName: appState.userState.firstName,
        lastName: appState.userState.lastName,
        verified: appState.userState.verified,
    };
};

export default connect<any>(mapStateToProps)(LoggedPage);