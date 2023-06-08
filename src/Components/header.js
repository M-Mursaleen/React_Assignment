import React, {useContext} from "react"
import {Link, useNavigate} from "react-router-dom";
import LoggedInContext from "../Context/loggedInContext";


export const Header  = () => {
    const history = useNavigate()
    const { setIsLoggedIn } = useContext(LoggedInContext);
    function signout() {
        localStorage.removeItem("loginData");
        setIsLoggedIn(false)
        history('/login')
    }

    return (
        <div className={'flex bg-neutral-500 justify-between items-center p-3'}>
            <div>
                <ul className={'flex text-[white] gap-4'}>
                    <li className={'text-2xl'}>
                        <Link style={{ textDecoration: 'none', color: 'white'}} to={"/crypto-exchange"}> Crypto Wallet </Link>
                    </li>
                    <li className={'text-2xl '}>
                        Contact
                    </li>
                    <li className={'text-2xl '}>
                        About
                    </li>
                </ul>
            </div>
            <div>
                <button className={'uppercase text-[white] text-2xl'} onClick={signout}>Sign Out</button>
            </div>
        </div>

    )

}