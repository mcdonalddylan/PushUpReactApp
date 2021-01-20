import React from "react";
import { connect, useDispatch } from "react-redux";
import { setNotifState } from "../actions/notifActions";
import { initialNotifState } from "../reducers/notifReducer";
import "../scss/notification.scss";

interface IProps {
    show: boolean,
    text: string,
}

const NotificationComp: React.FC<IProps> = (props:IProps) => {
    
    const dispatch = useDispatch();
    
    const closeNotification = () => {
        dispatch(setNotifState(initialNotifState));
    }

    return(<>
        {props.show ?
            <div className="container">
                <div className="row justify-content-center">
                    <div className="notif">
                        <button className="close-notif-btn" onClick={closeNotification}>x</button>
                        {/* this is where the notification text will go */}
                        {props.text}
                    </div>
                </div>
            </div>
        :
            <></>
        }
        </>
    )
}

const mapStateToProps = (appState: any) => {
    return{
        show: appState.notifState.show,
        text: appState.notifState.msg,
    };
};

export default connect<IProps>(mapStateToProps)(NotificationComp);