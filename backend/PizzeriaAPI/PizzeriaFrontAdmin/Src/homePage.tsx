import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { KeyValueDto, PInput, PageSettingsSection, PageWrapper, Select, axiosBaseConfig, baseApiUrl, mapObjectToSelect } from './common';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export const HomePage = () => {
    const
        [data, setData] = useState([])


    React.useEffect(() => {
        console.log("xd");
    }, [])

    return <PageWrapper>
        <ContactSection />

    </PageWrapper>
}

const ContactSection = () => {
    const
        [phone, setPhone] = useState<KeyValueDto>(),
        [address, setAddress] = useState<KeyValueDto>(),
        { register, handleSubmit } = useForm(),
        onSubmit = (data: any) => {
            console.log(data);
            if (!phone)
                addItem("phone", data.phoneValue)
            else
                editItem(phone.id, phone.key, data.phoneValue)
            if (!address)
                addItem("address", data.addressValue)
            else
                editItem(address.id, address.key, data.addressValue)
        },
        getKeyValues = async () => {
            let pres = await axios.get(baseApiUrl + `/GetKeyValue/phone`)
            let ares = await axios.get(baseApiUrl + `/GetKeyValue/address`)
            setPhone(pres.data)
            setPhone(ares.data)
        },
        editItem = async (id: any, key: string, value: any) => {
            const url = baseApiUrl + "/UpdateKeyValue"
            await axios.patch(url, { id: id, key: key, value: value }, axiosBaseConfig)
            getKeyValues()

        },
        addItem = async (key: string, value: any) => {
            const url = baseApiUrl + "/AddKeyValue";
            await axios.post(url, { id: -1, key: key, value: value }, axiosBaseConfig)
            getKeyValues()
        }

    React.useEffect(() => {
        getKeyValues()
    })
    return <PageSettingsSection title={"Contact info"} subtext={"Choose 2 from key-value entries. Value -1 of id means that the value is not yet set"}>
        <form className='section-form' onSubmit={handleSubmit(onSubmit)}>
            <div className="form-content">
                <div className="row">
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>key</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>value</div>
                </div>
                <div className="row">
                    <div className="id">{phone?.id || -1}</div>
                    <div className="key">{phone?.key || "phone"}</div>
                    <PInput register={{ ...register("phoneValue") }} inputProps={{ type: 'text' }} />
                </div>
                <div className="row">
                    <div className="id">{address?.id || -1}</div>
                    <div className="key">{address?.key || "address"}</div>
                    <PInput register={{ ...register("addressValue") }} inputProps={{ type: 'text' }} />
                </div>
            </div>
            <div className="buttons-container">
                <button type='submit' className="btn btn-white btn-sm w-100 mb-0 btn-save" >Save</button>
            </div>
        </form>
    </PageSettingsSection>
}



const root = document.getElementById("react_root");
ReactDOM.render(<HomePage />, root);
