import React from "react";
import { connect } from "react-redux";
import "../scss/notification.scss";

interface IProps {
    text: string,
    toggleFunction: Function,
}

const NotificationComp: React.FC<IProps> = (props:IProps) => {
    
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

const mapStateToProps = (appState: any) => {
    return{
        text: appState.notifState.msg,
    };
};

export default connect<any>(mapStateToProps)(NotificationComp);