import React from "react";
import "../scss/notification.scss";

interface IProps {

}

export const NotificationComp: React.FC<IProps> = (props:IProps) => {
    
    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="notif">
                    {/* this is where the notification text will go */}
                    **Test notification**
                </div>
            </div>
        </div>
    )
}