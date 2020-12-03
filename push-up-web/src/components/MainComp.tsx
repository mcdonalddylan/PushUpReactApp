import React, { SyntheticEvent } from "react"

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
    const startTimer = (event:SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        const minutes = event.currentTarget["min-input"].value;

        console.log(minutes);
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
                    </div>

                    <form onSubmit={startTimer}>
                        <div className="row justify-content-center">
                            <input className="min-input" name="min-input" type="number" placeholder="60" min="1" max="9999"/>
                        </div>

                        <div className="row justify-content-center start-div">
                            <button type="submit" className="start-btn" >Start</button>
                        </div>
                    </form>
                    

                    <div className="row justify-content-center records-div">
                        <button className="records-btn" onClick={getRecords}>Push-Up Records</button>
                    </div>

                </div>
            </div>
        </div>
    )
}