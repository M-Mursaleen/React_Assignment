import React, {useEffect, useState, useContext} from "react"
import {UserContext, UserDataContext} from "../../Context/appContext";
import {Messages} from "../../constants";
import {Controller} from "react-hook-form";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


export const Login = () => {
    const history = useNavigate();

    const {userData, setUserData} = useContext(UserContext);
    const [userDetail, setUserDetail] = useState({email: '', password: ''})
    const [userLimitCount, setUserLimitCount] = useState(0)
    console.log('Login page==>', userData.length,  userData)
    const handleSubmit = (event) => {
        let count = 0
        event.preventDefault()
        const {username, password } = event.target.elements
        if (userData.length > 0 && userLimitCount < 3) {
            if (username.value === userData[0].userName && password.value === userData[0].password){
                setUserDetail({username: username.value, password: password.value })
                localStorage.setItem("loginData", JSON.stringify({username: username.value }) )
                history('/home')
            }

            else if(username.value !== userData[0].userName) {
                toast.warning('Please Enter Correct User Name', {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
            else if (password.value !== userData[0].password) {
                toast.warning('Please Enter Correct Password', {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
            setUserLimitCount(userLimitCount + 1)
            if (userLimitCount === 3) {
                setUserData([])
            }
        } else {
            toast.error('Your account is Blocked, Please Sign Up again ', {
                position: toast.POSITION.TOP_CENTER,
            });
        }

    }
      // console.log('EVENT==>', {username: username.value, password: password.value })

    // const setUserEmail = (e) => {
    //     setUserDetail({...userDetail, email: e.target.value})
    // }
    // const setUserPassword = (e) => {
    //     setUserDetail({...userDetail,  password: e.target.value})
    // }

    console.log('USER DET==>', userDetail)
    return(
        <>
            <div className={'mt-[10%]'}>
                <h2 className={"text-center text-current"}> Login Your Account </h2>
                <form onSubmit={handleSubmit} className={"flex flex-column m-[10px] p-[20px] text-center"}>
                    <div>
                        <input name="username" type="text" placeholder="Enter Name" required={true}
                               className={`px-4 py-3 mt-3 my-1 w-[30%] rounded-md border border-slate-300 focus:outline-none `}  />
                    </div>
                    {}
                    <div>
                        <input name="password" type="text" placeholder="Enter Password" required={true}
                               className={`px-4 py-3 mt-3 my-1 w-[30%] rounded-md border border-slate-300 focus:outline-none`} />
                    </div>
                    <div className={'mt-3'}>
                        <input type="submit"   disabled={userLimitCount >= 4 && true } className={`uppercase w-[12%] text-[white] bg-neutral-500 px-3 py-4 rounded-md bg-textPrimary  text-[14px]  font-[500] `} value="Log in"/>
                    </div>
                </form>
            </div>
        </>
    )
};