import React, { useState } from "react";
import { connect } from "react-redux";
import { MainComp } from "../components/MainComp";

interface IProps {
    firstName: string,
    lastName: string,
    verified: boolean,
}

const LoggedPage: React.FC<IProps> = (props:IProps) => {

    const [ifVerified, setVerified] = useState(false);
    
    if (props.verified == true)
    {
        setVerified(true);
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
            </div>
                
            }
            
        </>
    )
}

const mapStateToProps = (appState: any) => {
    return{
        firstName: appState.userState.firstName,
        lastName: appState.userState.lastName,
        verified: appState.userState.verified,
    };
};

export default connect<any>(mapStateToProps)(LoggedPage);