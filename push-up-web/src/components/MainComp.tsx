import React, { SyntheticEvent, useEffect, useState } from "react"
import { TimerModal } from "./TimerModal";

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
    
    const [showModal, setShowModal] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [allowCountdown, setAllow] = useState(false);

    /** starts the timer */
    const startTimer = (event:SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

            const totalSeconds = event.currentTarget["min-input"].value*60;

            setSeconds(totalSeconds);
            setAllow(true);
    }

    useEffect(()=>{
        console.log(allowCountdown + " " + showModal);
        if(allowCountdown == true && seconds > 0 && showModal == true)
        {
            setTimeout(()=>setSeconds(seconds -1), 1000);
        }
        else if(seconds <= 0)
        {
            setSeconds(0);
            setAllow(false);
        }
        else if(showModal == false)
        {
            setSeconds(0);
            setAllow(false);
        }
    });

    const removeModal = () => {
        if(showModal)
        {
            setShowModal(false);
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
        <TimerModal show={showModal} pushUpTime={seconds} removeModalFunction={()=>setShowModal(!showModal)} />
        </>
    )
}