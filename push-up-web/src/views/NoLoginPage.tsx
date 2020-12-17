import React from "react";
import { MainComp } from "../components/MainComp";

interface IProps {

}

export const NoLoginPage: React.FC<IProps> = (props:IProps) => {

    return(
        <>
            <MainComp />
        </>
    )
}