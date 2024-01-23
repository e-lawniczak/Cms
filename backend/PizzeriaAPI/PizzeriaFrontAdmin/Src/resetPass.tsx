import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';

import { PInput, PageWrapper, baseApiUrl } from './common';
import { useForm } from 'react-hook-form';
import axios from 'axios';


export const ResetPassPage = () => {
    const
        [data, setData] = useState([]),
        { register, handleSubmit } = useForm(),
        params = new URLSearchParams(window.location.search),
        token = params.get("token"),
        onSubmit = async (data: any) => {
            if (data.Email != "" && data.Email.indexOf("@") > -1) {
                let res = await axios.post(baseApiUrl + "/ForgotPassword", { email: data.Email })
                console.log(res);
                if (res.status === 200) {
                    alert("Email has been sent to " + data.Email)
                } else {
                    alert("Something went wrong" + res.statusText)
                }
            }
        },
        onSubmitReset = async (data: any) => {
            if (data.password.length > 0 && data.confirmPassword.length > 0) {
                let res = await axios.post(baseApiUrl + "/Resetpassword", {
                    resetToken: token,
                    confirmPassword: data.confirmPassword,
                    password: data.password
                })
                if (res.status == 200) {
                    alert("Password changed")
                    window.location.href = "/Login"
                }
                else {
                    alert("Something went wrong. Contact administrator\n" + res.statusText)

                }
            }
        }




    React.useEffect(() => {

    }, [])
    return <>
        <div className="account-form-logo row">
            <div className="img-container">
                <img src="/img/logo-198x66.png" />
            </div>
        </div>
        <div className="row">
            {!!token && token.length > 0 ?
                <form method="post" onSubmit={handleSubmit(onSubmitReset)} className='account-form login-form'>
                    <div className="form-group">
                        <input {...register("password")} placeholder='password' type="password" />
                    </div>
                    <div className="form-group">
                        <input {...register("confirmPassword")} placeholder='confirmPassword' type="password" />
                    </div>
                    <button type="submit">Zresetuj hasło</button>
                    <p> <a href="/Login">Powrót.</a></p>
                </form>
                :

                <form method="post" onSubmit={handleSubmit(onSubmit)} className='account-form login-form'>
                    <div className="form-group">
                        <input {...register("Email")} type="email" />
                    </div>
                    <button type="submit">Zresetuj hasło</button>
                    <p> <a href="/Login">Powrót.</a></p>
                </form>
            }
        </div >
    </>


}


const root = document.getElementById("react_root");
ReactDOM.render(<ResetPassPage />, root);
