import React, {useContext, useEffect, useState} from "react"
import {UserContext} from "../../Context/appContext";
import {useNavigate} from "react-router-dom";
import {Header} from "../header";


export const Dashboard  = () => {
    const {userData} = useContext(UserContext);

    return (
        <div>
            <div> </div>
            <Header />
            <h1> Welcome !!</h1>
        </div>
    )

}