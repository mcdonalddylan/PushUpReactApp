import React, { SyntheticEvent, useEffect, useState } from "react"
import { TimerModal } from "./TimerModal";
import alarm2 from "../assets/push_up_alarm1.wav";

interface IProps {

}

/**
 * The component which contains the functionality for starting the
 * push up alarm. Also contains button to view the user's personal
 * push-up record data.
 * 
 * @param props N/A
 */
export const MainComp: React.FC<IProps> = (props: IProps) => {
    
    const [hasPlayedAlarm, setPlayedAlarm] = useState(false);
    //let hasPlayedAlarm = false;
    const [showModal, setShowModal] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [allowCountdown, setAllow] = useState(false);

    const [alarmAudio, setAlarm] = useState(new Audio(alarm2));

    /** starts the timer */
    const startTimer = (event:SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        const totalSeconds = event.currentTarget["min-input"].value*60;

        setSeconds(totalSeconds);
        setAllow(true);
        chooseAlarm();
    }

    useEffect(()=>{
        console.log(allowCountdown + " " + showModal);
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

    /** gets your personal record data */
    const getRecords = () => {

    }

    return (
        <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="main-comp">

                    <div className="row">
                        <h4 className="min-label">Minutes before alarm:</h4>
                    </div>

                    <form onSubmit={startTimer}>
                        <div className="row justify-content-center">
                            <input className="min-input" name="min-input" type="number" placeholder="60" min="1" max="9999"/>
                        </div>

                        <div className="row justify-content-center start-div">
                            <button type="submit" className="start-btn" onClick={()=>setShowModal(!showModal)}>Start</button>
                        </div>
                    </form>
                    

                    <div className="row justify-content-center records-div">
                        <button className="records-btn" onClick={getRecords}>Push-Up Records</button>
                    </div>

                </div>
            </div>
        </div>
        <TimerModal show={showModal} pushUpTime={seconds} removeModalFunction={()=>{
            alarmAudio.pause();
            alarmAudio.currentTime = 0;
            setShowModal(!showModal);}} />
        </>
    )
}