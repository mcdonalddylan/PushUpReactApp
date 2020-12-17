import React, { useState } from "react";
import { Redirect } from "react-router";
import "../scss/view-data.scss";
interface IProps {

}

let tempData: any;
export const ViewRecordsPage: React.FC<IProps> = (props:IProps) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [doRecordsExist, setDoRecordsExist] =useState(false);
    const [redirectToTimer, setRedirect] = useState(false);

    tempData = JSON.parse(sessionStorage.tempData);

    const backToTimer = () => {
        setRedirect(true);
    }

    return(
        <div className="container">
            {isLoggedIn ?
            <></>
            :
            <div className="row justify-content-center">
                <div className="temp-comp">
                    {sessionStorage.getItem("tempData") != null ?
                    <>
                        <h3>Latest push-up data:</h3>
                        <hr></hr>
                        <div className="row">
                            <div className="col-6" style={{textAlign:"right"}}>Date:</div>
                            <div className="col-6" style={{textAlign:"left"}}>{tempData.date}</div>
                        </div>
                        <div className="row">
                            <div className="col-6" style={{textAlign:"right"}}>Sets:</div>
                            <div className="col-6" style={{textAlign:"left"}}>{sessionStorage.tempSets} set(s)</div>
                        </div>
                        <div className="row">
                            <div className="col-6" style={{textAlign:"right"}}>Last Set Interval:</div>
                            <div className="col-6" style={{textAlign:"left"}}>{tempData.lastSetInterval} minute(s)</div>
                        </div>
                        <div className="row">
                            <div className="col-6" style={{textAlign:"right"}}>Last Push-Up Time:</div>
                            <div className="col-6" style={{textAlign:"left"}}>{tempData.lastPushUpTime} second(s)</div>
                        </div>
                        <div className="row">
                            <div className="col-6" style={{textAlign:"right"}}>Last Push-Up Count:</div>
                            <div className="col-6" style={{textAlign:"left"}}>{tempData.lastPushUpCount} push-up(s)</div>
                        </div>
                    </>
                    :
                    <p style={{textAlign: "center"}}>Sorry no records found.</p>
                    }

                    <div className="row justify-content-center">
                        <button className="back-btn"
                        onClick={backToTimer}>Back to timer</button>
                    </div>
                </div>
            </div>
            }
            {redirectToTimer ? <Redirect to="/noLogin" /> : <></>}
        </div>
    )
}