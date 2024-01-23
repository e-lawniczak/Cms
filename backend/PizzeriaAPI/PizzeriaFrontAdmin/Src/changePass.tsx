import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';

import { PInput, PageWrapper, axiosBaseConfig, baseApiUrl } from './common';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import bcrypt from 'bcryptjs-react'


export const ChangePass = () => {
    const
        [data, setData] = useState([]),
        { register, handleSubmit } = useForm(),
        onSubmit = async (data: any) => {
            if (data.password.length > 0 && data.confirmPassword.length > 0 && data.password == data.confirmPassword) {
                let res = await axios.post(baseApiUrl + "/ChangePassword", {
                    confirmPassword: await bcrypt.hash(data.confirmPassword, "$2a$12$LdSGL/4rQGQYLbXbJH3ks."),
                    password: await bcrypt.hash(data.password, "$2a$12$LdSGL/4rQGQYLbXbJH3ks.")
                }, axiosBaseConfig)
                if (res.status == 200) {
                    alert("Password changed")
                    window.location.href = "/Logout"
                }
                else {
                    alert("Something went wrong. Contact administrator\n" + res.statusText)
                }

            }
        }





    React.useEffect(() => {

    }, [])
    return <>
        <div className="row">

            <form method="post" onSubmit={handleSubmit(onSubmit)} className='account-form login-form'>
                <div className="form-group">
                    <input {...register("password")} placeholder='new password' type="password" />
                </div>
                <div className="form-group">
                    <input {...register("confirmPassword")} placeholder='confirm password' type="password" />
                </div>
                <button type="submit">Change password</button>
            </form>
        </div >
    </>


}


const root = document.getElementById("react_root");
ReactDOM.render(<ChangePass />, root);
