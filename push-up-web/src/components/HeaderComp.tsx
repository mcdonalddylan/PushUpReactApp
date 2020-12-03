import React from "react";

interface IProps {

}

/**
 * Contains the logout button, site logo, and theme-toggle button.
 * 
 * @param props N/A
 */
export const HeaderComp: React.FC<IProps> = (props:IProps) => {

    /** logs the user out */
    const logout = () => {

    }

    /** toggles the theme of each page */
    const toggleTheme = () => {

    }

    return(
        <div className="container header">
            <div className="row justify-content-center">
            
                <div className="col-2">
                    {/* only render this button if the user is logged in */}
                    <button onClick={logout}>Logout</button>
                </div>

                <div className="col-8">
                    <img src="" alt="logo" />
                </div>

                <div className="col-2">
                    <button onClick={toggleTheme}><img src="" alt="eye logo" /></button>
                </div>

            </div>
        </div>
    )
}