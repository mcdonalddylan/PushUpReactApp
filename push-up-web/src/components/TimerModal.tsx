import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import React, { SyntheticEvent, useEffect, useState } from "react";
import "../scss/page-style.scss";
import { wait } from "@testing-library/react";

interface IProps{
    show: boolean,
    pushUpTime: number,
    removeModalFunction: any,
    stopAlarmFunction: any,
    resettingTimeFunction: any,
    allowCountdownFunction: any,
    totalMinutes: number,
}

export const TimerModal: React.FC<IProps> = (props:IProps) => {

    const [waitTime,setWaitTime] = useState(-1);
    const [progressTime,setProgressTime] = useState(0);
    const [showPushUpCountdown, setShowPushCountdown] = useState(false);
    const [showInProgress, setInProgress] = useState(false);
    const [showRecordInput, setRecordInput] = useState(false);

    let showReady = false;

    //Bunch of if statements which format the minutes given by the user 
    // into a proper hours:minutes:seconds format
    let formattedTime: string = "";
    let minutes: number = 0;
    let hours: number = 0;
    if (Math.trunc(Math.trunc(props.pushUpTime/60)/60) > 0 && props.pushUpTime%60 !== 0)
    {
        hours = Math.trunc(Math.trunc(props.pushUpTime/60)/60);
        minutes = Math.trunc(props.pushUpTime/60)%60;
        formattedTime = hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + 
        (props.pushUpTime%60 < 10 ? "0" : "") + props.pushUpTime%60;
        showReady = false;
    }
    else if (Math.trunc(props.pushUpTime/60) > 0 && props.pushUpTime%60 !== 0)
    {
        minutes = Math.trunc(props.pushUpTime/60);
        formattedTime = (minutes < 10 ? "0" : "") + minutes + ":" + 
        (props.pushUpTime%60 < 10 ? "0" : "") +props.pushUpTime%60;
        showReady = false;
    }
    else if (Math.trunc(props.pushUpTime/60) > 0 && props.pushUpTime%60 === 0)
    {
        minutes = Math.trunc(props.pushUpTime/60);
        formattedTime = minutes + ":" + "00";
        showReady = false;
    }
    else if (Math.trunc(props.pushUpTime/60) === 0 && props.pushUpTime >= 0)
    {
        formattedTime = `${props.pushUpTime}`;
        showReady = false;
    }
    else if (props.pushUpTime < 0)
    {
        formattedTime = "0";
        showReady = true;
    }

    /** initializes the 5 second wait timer and stops playing the alarm */
    const beginPushUp = () => {
        setWaitTime(5);
        setProgressTime(0);
        props.stopAlarmFunction();
        setShowPushCountdown(true);   
    }

    /** allows the user to input how many pushups they did */
    const doneWithSet = (event:SyntheticEvent<HTMLFormElement>) => {
        //submit the data somehow
        const numberOfPushUps = event.currentTarget["input"].value;

        if(sessionStorage.getItem("tempSets") == null)
        {
            sessionStorage.setItem("tempSets","1");
        }
        else
        {
            const currentSetString:any = sessionStorage.getItem("tempSets");
            const currentSetCount:number = parseInt(currentSetString);

            sessionStorage.setItem("tempSets", `${currentSetCount+1}`);
        }
        
        const currentDate = new Date();
        const currentDateString:string = `${currentDate.getMonth()+1} ${currentDate.getDay()}, 
        ${currentDate.getFullYear()} ${currentDate.getHours()%12}:`+
        `${(currentDate.getMinutes() < 10 ? "0" : "") + currentDate.getMinutes()}`;

        sessionStorage.setItem("tempData", JSON.stringify({
            date: currentDateString, 
            lastSetInterval: props.totalMinutes/60,
            lastPushUpTime: progressTime,
            lastPushUpCount: numberOfPushUps,
        }));

        //sessionStorage.setItem("",{date: })
        //trigger a reset of the push-up timer
        console.log(props.totalMinutes);
        props.resettingTimeFunction(props.totalMinutes);
        props.allowCountdownFunction(true);
        setInProgress(false);
        setRecordInput(false);
        setShowPushCountdown(false);
    }

    /** resets the components data before removing the modal */
    const toggleReset = () => {
        showReady = false;
        setWaitTime(5);
        setProgressTime(0);
        setShowPushCountdown(false);
        setInProgress(false);
        setRecordInput(false);
        props.removeModalFunction();
    }

    useEffect(()=>{
        console.log("show push up countdown: " + showPushUpCountdown);
        console.log("show ready button: " + showReady);
        console.log("show in progress: " + showInProgress);
        console.log("show record input: " + showRecordInput);
        
        if(showPushUpCountdown == true && waitTime > 0 && showInProgress == false)
        {
            setTimeout(()=>setWaitTime(waitTime - 1), 1000);
        }
        else if (waitTime == 0 && showInProgress == false)
        {
            //setShowPushCount(false);
            setWaitTime(-1);  

            //start regular time
            setInProgress(true);
            setShowPushCountdown(true);

        }
        else if (showInProgress == true && showRecordInput == false)
        {
            setTimeout(()=>setProgressTime(progressTime +1), 1000);
        }
    })

    return(
        
        <Modal isOpen={props.show} toggle={toggleReset} modalClassName="timer-modal-bg" contentClassName="timer-modal-content">
            <ModalHeader className="timer-modal-head">
                {showPushUpCountdown ? 
                
                    showInProgress ? 
                    <h2>Current Push-up time:</h2>
                    :
                    <h2>Get on the floor!!</h2> 
                :
                <h2>Time left before next PUSH UP:</h2> }   
            </ModalHeader>
            <ModalBody >
                {showPushUpCountdown ? 
                
                    showInProgress ?
                    <p className="timer-prog" >{ progressTime }</p> 
                    :
                    <p className="timer-wait" key={Math.random()}>{ waitTime }</p> 
                :
                <p className="timer" key={Math.random()}>{ formattedTime }</p> }
            </ModalBody>
            <ModalFooter className="timer-modal-foot">
                {showPushUpCountdown ? 
                    
                    showInProgress ? 

                        showRecordInput ?

                            <form onSubmit={doneWithSet}>
                                <div><h4>How many push-ups?</h4></div>
                                <div><input className="push-input" name="input" type="number" placeholder="?" min="1" max="9999"/></div>
                                <div><input className="start-btn" type="submit" value="Submit and reset timer"/></div>
                            </form>
                            :
                            <>
                                <div><button className="done-btn" onClick={()=>
                                    {setRecordInput(!showRecordInput)}}>I'm Donezo</button></div>
                                <div><h4 className="click-any-sm" >Click anywhere else to stop the timer</h4></div>
                            </>

                    :
                    <></>
                :
                
                    showReady ?
                    
                        showInProgress ? 

                        <></>
                        :
                        <>
                            <div><button className="timer-btn" onClick={beginPushUp}>READY FOR PUSH-UPS??</button></div>
                            <div><h4 className="click-any-sm" >Click anywhere else to stop the timer</h4></div>
                        </>
                    :
                    <h4 className="click-any-lg" >Click anywhere to stop the timer</h4>
                }
                    
            </ModalFooter>
        </Modal>
    )
}