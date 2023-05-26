import React from "react"
import {useNavigate} from "react-router-dom";


export const Header  = () => {
    const history = useNavigate()
    function signout() {
        localStorage.removeItem("loginData");
        history('/login')
    }

    return (
        <div className={'flex bg-neutral-500 justify-between items-center p-3'}>
            <div>
                <ul className={'flex text-[white] gap-4'}>
                    <li className={'text-2xl'}>
                        Home
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