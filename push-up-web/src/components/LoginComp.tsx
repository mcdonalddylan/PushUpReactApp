import React from "react";

interface IProps {

}

export const LoginComp: React.FC<IProps> = (props:IProps) => {

    return(
        <div>
            <div className="row justify-content-center">
                <div className="log-comp">
                    <h1>Login form goes here</h1>
                </div>
            </div>
        </div>  
    )
}