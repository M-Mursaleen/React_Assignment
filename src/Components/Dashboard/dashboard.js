import React, {useContext, useEffect, useState} from "react"
import {UserContext} from "../../Context/appContext";
import {useNavigate} from "react-router-dom";
import {Header} from "../header";
import Blog from "../crud";


export const Dashboard  = () => {
    const {userData} = useContext(UserContext);

    return (
        <div>
            <div> </div>
            <Header />
            <Blog />
        </div>
    )

}