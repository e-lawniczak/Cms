import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';

import { PInput, PageWrapper } from './common';
import { useForm } from 'react-hook-form';

export const PagesPage = () => {
    const
        [data, setData] = useState([]),
        { register, handleSubmit } = useForm(),
        onSubmit = (data:any) =>{
            if(data.Email !=)
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
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <PInput register={{ ...register("Email") }} inputProps={{ type:"email", className: 'form-control' }} />
                </div>
                <button type="submit">Zresetuj hasło</button>
                <p> <a href="/Login">Powrót.</a></p>
            </form>
        </div >
    </>


}


const root = document.getElementById("react_root");
ReactDOM.render(<PagesPage />, root);
