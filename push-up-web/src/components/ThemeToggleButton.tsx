import React from "react";
import "../scss/themes.scss";
import eye from "../assets/eye_contrast.svg";

interface IProps {

}

export const ThemeToggleButton: React.FC<IProps> = (props:IProps) => {

    const toggleTheme = () => {

    }

    return(
        <div className="col-2">
            <button className="theme-btn"
            onClick={toggleTheme}><img className="eye-img" src={eye} alt="eye logo" /></button>
        </div>
    )
}