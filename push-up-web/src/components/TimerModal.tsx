import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import React, { useEffect, useState } from "react";
import "../scss/page-style.scss";

interface IProps{
    show: boolean,
    pushUpTime: number,
    removeModalFunction: any,
}

export const TimerModal: React.FC<IProps> = (props:IProps) => {

    const [waitTime,setWaitTime] = useState(0);
    let showReady = false;
    let showPushUpCount = false;
    let formattedTime: string = "";
    let minutes: number = 0;
    let hours: number = 0;

    if (Math.trunc(Math.trunc(props.pushUpTime/60)/60) > 0 && props.pushUpTime%60 !== 0)
    {
        hours = Math.trunc(Math.trunc(props.pushUpTime/60)/60);
        minutes = Math.trunc(props.pushUpTime/60)%60;
        formattedTime = hours + ":" + minutes + ":" + props.pushUpTime%60;
        showReady = false;
    }
    else if (Math.trunc(props.pushUpTime/60) > 0 && props.pushUpTime%60 !== 0)
    {
        minutes = Math.trunc(props.pushUpTime/60);
        formattedTime = minutes + ":" + props.pushUpTime%60;
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

    const beginPushUp = () => {
        setWaitTime(5);
        showPushUpCount = true;
    }

    return(
        
        <Modal isOpen={props.show} toggle={props.removeModalFunction} modalClassName="timer-modal-bg" contentClassName="timer-modal-content">
            <ModalHeader className="timer-modal-head"><h2>Time left before next PUSH UP:</h2></ModalHeader>
            <ModalBody >
                {showPushUpCount ? <p className="timer" key={Math.random()}>{ waitTime }</p> :
                <p className="timer" key={Math.random()}>{ formattedTime }</p> }
            </ModalBody>
            <ModalFooter className="timer-modal-foot">
                    <h4>Click anywhere to stop the timer</h4>
                    {showReady ? <button onClick={beginPushUp}>READY FOR PUSHUPS?</button> : <></>}
                    
            </ModalFooter>
        </Modal>
    )
}