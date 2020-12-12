import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import React from "react";
import "../scss/page-style.scss";

interface IProps{
    show: boolean,
    pushUpTime: number,
    removeModalFunction: any,
}

export const TimerModal: React.FC<IProps> = (props:IProps) => {

    let formattedTime: string = "";
    let minutes: number = 0;

    if (Math.trunc(props.pushUpTime/60) > 0 && props.pushUpTime%60 !== 0)
    {
        minutes = Math.trunc(props.pushUpTime/60);
        formattedTime = minutes + ":" + props.pushUpTime%60;
    }
    else if (Math.trunc(props.pushUpTime/60) > 0 && props.pushUpTime%60 === 0)
    {
        minutes = Math.trunc(props.pushUpTime/60);
        formattedTime = minutes + ":" + "00";
    }
    else
    {
        formattedTime = `${props.pushUpTime}`;
    }

    

    return(
        
        <Modal isOpen={props.show} toggle={props.removeModalFunction} modalClassName="timer-modal-bg" contentClassName="timer-modal-content">
            <ModalHeader className="timer-modal-head"><h2>Time left before next PUSH UP:</h2></ModalHeader>
            <ModalBody >
                <p className="timer" key={Math.random()}>{ formattedTime }</p>
            </ModalBody>
            <ModalFooter className="timer-modal-foot">
                    <h4>Click anywhere to stop the timer</h4>
            </ModalFooter>
        </Modal>
    )
}