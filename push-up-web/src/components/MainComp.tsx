import React from "react"

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
    
    /** starts the timer */
    const startTimer = () => {

    }

    /** gets your personal record data */
    const getRecords = () => {

    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="main-comp">

                    <div className="row">
                        <h4 className="min-label">Minutes before alarm:</h4>
                        <input className="min-input" type="number" placeholder="60" />
                    </div>

                    <div className="row justify-content-center">
                        <button className="start-btn" onClick={startTimer}>Start</button>
                    </div>
                    

                    <div className="row justify-content-center">
                        <button className="start-btn" onClick={getRecords}>Push-Up Records</button>
                    </div>

                </div>
            </div>
        </div>
    )
}