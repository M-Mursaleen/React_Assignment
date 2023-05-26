import React, {useContext, useEffect, useState} from "react"
import {useForm, Controller} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {Messages} from "../../constants";
import { useNavigate   } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import {UserContext} from "../../Context/appContext";

const schema = yup.object().shape({
    userName: yup.string().required('Please Enter your Name'),
    email:  yup.string().email().required('Please Enter your Email'),
    password: yup.string()
        .required('Please Enter your password')
        .matches(

            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    homeAddress: yup.string().optional(),
    cnic: yup
        .mixed()
        .test('fileFormat', 'CNIC PDF is required', (value) => {
            if (value) {
                const extension = value.split('.').pop();
                return extension === 'pdf';
            }
            return false;
        }).required("CNIC PDF is required"),
});

export const SignUp = () => {
    const history = useNavigate();
    const { control, handleSubmit, watch, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const {userData, setUserData } = useContext(UserContext)
    console.log('===>', userData)
    const [showAlert, setShowAlert] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);


    const onSubmit = (data) => {
        console.log('DATA', data)
        if (data){
            setUserData([...userData, data])
            // setUserData(data)
            setShowAlert(true)
            localStorage.setItem("signUpData", JSON.stringify(data));
            toast.success('User Created Successfully, Please Login', {
                position: toast.POSITION.TOP_CENTER,
            });
            history('/login')
        }
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const redirect = (path) => {
        history(path);
    }

    return (
        <>
           <div className={'mt-[10%]'}>
               {showAlert && <p className={'text-center text-2xl bg-lime-400'}> {Messages.success}</p>}
                <h2 className={"text-center text-current"}> Create Account </h2>
                <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-column m-[10px] p-[20px] text-center"}>
                    <div>
                        <Controller
                            name="userName"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, name, value, ref } }) => (
                                <input
                                    ref={ref}
                                    name={name}
                                    value={value}
                                    onChange={onChange}
                                    placeholder={"Your Name"}

                                    type={"text"}
                                    className={`px-4 py-3 mt-3 my-1 w-[30%] rounded-md border border-slate-300 focus:outline-none
                            `}
                                />
                            )}
                        />
                        {errors.userName && <p className={'text-red-500 text-xs italic'}> {errors.userName.message} </p>}
                    </div>
                    <div>
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, name, value, ref } }) => (
                            <input
                            value={value}
                            name={name}
                            ref={ref}
                            placeholder={"Your Email"}
                            onChange={onChange}
                            className={`px-4 py-3 mt-3 my-1 w-[30%] rounded-md border border-slate-300 focus:outline-none
                            `}
                            />
                        )}
                        />

                        {errors.email && <p className={'text-red-500 text-xs italic'}> {errors.email.message} </p>}
                    </div>
                    <div>
                        <Controller
                            name={'password'}
                            control={control}
                            type="password"
                            rules={{ required: true }}
                            render={({ field: { onChange, name, value, ref } }) => (
                            <input
                            ref={ref}
                            value={value}
                            name={name}
                            placeholder={"Password"}
                            onChange={onChange}
                            className={`px-4 py-3 mt-3 my-1 w-[30%] rounded-md border border-slate-300 focus:outline-none
                            `}
                            />
                        )}
                        />
                        {errors.password && <p className={'text-red-500 text-xs italic'}>{errors.password.message}</p>}
                    </div>
                    <div>
                        <Controller
                            name={'homeAddress'}
                            control={control}
                            type="string"
                            placeholder={"Enter Home Adress"}
                            rules={{ required: true }}
                            render={({ field: { onChange, name, value, ref } }) => (
                                <input
                                    ref={ref}
                                    value={value}
                                    name={name}
                                    placeholder={"Your Home Address"}
                                    onChange={onChange}
                                    className={`px-4 py-3 mt-3 my-1 w-[30%] rounded-md border border-slate-300 focus:outline-none
                            `}
                                />
                            )}
                        />
                        {errors.password && <p className={'text-red-500 text-xs italic'}>{errors.password.homeAddress}</p>}
                    </div>
                    <div>
                        <Controller
                            name="cnic"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <div >
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        className={`px-4 py-3 mt-3 my-1 w-[30%] rounded-md border border-slate-300 focus:outline-none`}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            handleFileChange(e);
                                        }}
                                    />
                                    {
                                        !selectedFile &&
                                        <p className="text-gray-500 text-sm italic">Please Select CNIC in pdf format</p>
                                    }

                                    {errors.cnic && (
                                        <p className="text-red-500 text-xs italic">{errors.cnic.message}</p>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    <div className={'mt-3'}>
                        <button
                            // onClick={setSubmitted}
                            disabled={Object.keys(errors).length !== 0}
                            type="submit"
                            className={`uppercase w-[12%] text-[white] bg-neutral-500 px-3 py-4 rounded-md bg-textPrimary  text-[14px]  font-[500]    `}
                        >
                            Sign Up
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
};

