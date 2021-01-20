import React, { SyntheticEvent, useEffect, useState } from "react"
import { TimerModal } from "./TimerModal";
import alarm2 from "../assets/push_up_alarm1.wav";
import { Redirect } from "react-router";
import { useDispatch } from "react-redux";
import { setNotifState } from "../actions/notifActions";

interface IProps {

}

let totalSeconds: number = 0; //global variable that you can add to other components

/**
 * The component which contains the functionality for starting the
 * push up alarm. Also contains button to view the user's personal
 * push-up record data.
 * 
 * @param props N/A
 */
export const MainComp: React.FC<IProps> = (props: IProps) => {
    
    const [hasPlayedAlarm, setPlayedAlarm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [allowCountdown, setAllow] = useState(false);
    const [alarmAudio, setAlarm] = useState(new Audio(alarm2));

    const [redirectToRecords, setRedirectToRecords] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    const dispatch = useDispatch();
    
    /** starts the timer */
    const startTimer = (event:SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        totalSeconds = event.currentTarget["min-input"].value*60;
        //totalSeconds = 1

        if(totalSeconds > 0)
        {
            setSeconds(totalSeconds);
            setAllow(true);
            chooseAlarm();
            setShowModal(!showModal);
        }
        else
        {
            const newNotif = {
                id: Math.random()*10000,
                notifType: "info",
                msg: "ERROR: No time amount has been selected.",
            }

            dispatch(setNotifState(newNotif));
        }
        
    }

    useEffect(()=>{
        console.log("allow countdown: " + allowCountdown + " show modal: " + showModal);
        if(allowCountdown == true && seconds > 0 && showModal == true)
        {
            setTimeout(()=>setSeconds(seconds -1), 1000);
        }
        else if(seconds === 0)
        {
            setSeconds(-1);
            setAllow(false);
            setPlayedAlarm(true);
            //hasPlayedAlarm = true;
        }
        else if(showModal == false)
        {
            stopAlarm();
            setSeconds(-1);
            setAllow(false);
        }

        if(hasPlayedAlarm === true)
        {
            setPlayedAlarm(false);
            //hasPlayedAlarm = false;
            console.log("playing looped sound");
            alarmAudio.loop = true;
            alarmAudio.play();

        }
    });

    const chooseAlarm = () => {

        //randomly choosing a looping alarm sound
        const randVal = Math.round(Math.random()*2);
        if (randVal == 0)
        {
            console.log("randVal = 0");
            setAlarm(new Audio(alarm2));
        }
        else if (randVal == 1)
        {
            console.log("randVal = 1");
            setAlarm(new Audio(alarm2));
        }
        else if (randVal == 2)
        {
            console.log("randVal = 2");
            setAlarm(new Audio(alarm2));
        }
    }

    const stopAlarm = () => {
        alarmAudio.pause();
        alarmAudio.currentTime = 0;
    }

    /** gets your personal record data */
    const getRecords = () => {
        setRedirectToRecords(true);
    }

    return (
        <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="main-comp">
                <button className="log-return-btn" onClick={()=>{setRedirectToLogin(!redirectToLogin);}}>X</button>

                    <div className="row">
                        <h4 className="min-label">Minutes before alarm:</h4>
                    </div>

                    <form onSubmit={startTimer}>
                        <div className="row justify-content-center">
                            <input className="min-input" name="min-input" type="number" placeholder="60" min="1" max="9999"/>
                        </div>

                        <div className="row justify-content-center start-div start-btn-row">
                            <button type="submit" className="start-btn" >Start</button>
                        </div>
                    </form>

                    <div className="row justify-content-center records-div records-btn-row">
                        <button className="records-btn" onClick={getRecords}>Push-Up Records</button>
                    </div>

                </div>
            </div>
        </div>
        <TimerModal show={showModal} pushUpTime={seconds} removeModalFunction={()=>{
            stopAlarm();
            setShowModal(!showModal);}} stopAlarmFunction={stopAlarm}
            resettingTimeFunction={setSeconds} totalMinutes={totalSeconds}
            allowCountdownFunction={setAllow}/>
        {redirectToRecords ? <Redirect to="/myData" /> : <></>}
        {redirectToLogin ? <Redirect to="/" /> : <></>}
        </>
    )
}