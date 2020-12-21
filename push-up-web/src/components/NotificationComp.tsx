import React from "react";
import "../scss/notification.scss";

interface IProps {
    text: string,
    toggleFunction: Function,
}

export const NotificationComp: React.FC<IProps> = (props:IProps) => {
    
    const closeNotification = () => {
        props.toggleFunction();
    }

    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="notif">
                <button className="close-notif-btn" onClick={closeNotification}>x</button>
                    {/* this is where the notification text will go */}
                    {props.text}
                </div>
            </div>
        </div>
    )
}