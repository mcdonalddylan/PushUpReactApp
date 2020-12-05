import { Modal, ModalBody, ModalHeader } from "reactstrap";
import React from "react";

interface IProps{
    pushUpTime: number,
}

export const TimerModal: React.FC<IProps> = (props:IProps) => {

    

    return(
        <Modal>
            <ModalHeader>Time left before next PUSH UP:</ModalHeader>
            <ModalBody style={{textAlign: "center"}}>
                { props.pushUpTime }
            </ModalBody>
        </Modal>
    )
}