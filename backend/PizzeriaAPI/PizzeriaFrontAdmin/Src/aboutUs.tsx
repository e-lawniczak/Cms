import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import { KeyValueDto, PInput, PageSettingsSection, PageWrapper, Select, SliderDto, axiosBaseConfig, baseApiUrl, mapObjectToSelect } from './common';
import { useForm } from 'react-hook-form';


export const AboutUsPage = () => {
    const
        [data, setData] = useState([])



    React.useEffect(() => {
    }, [])

    return <PageWrapper>
        <KeyValueSection entry_key={'about_us_banner'} title={'Main banner on About Us page'} dataUrl='/GetAllPictureList' />
        <KeyValueSection entry_key={'tabSlider1'} title={'Information block on main page'} dataUrl='/GetVisibleTabSliderList' />
    </PageWrapper>
}
const KeyValueSection = (props: { entry_key: string, title: string, dataUrl?: string, subtext?: string }) => {
    const
        [entry, setEntry] = useState<KeyValueDto>(),
        [data, setData] = useState([]),
        { register, handleSubmit, setValue } = useForm(),
        dataUrl = props.dataUrl ? baseApiUrl + props.dataUrl : ``,
        sKey = props.entry_key,
        onSubmit = (data: any) => {
            if (!entry)
                addItem(sKey, data.dataValue)
            else
                editItem(entry.id, entry.key, data.dataValue)
            getKeyValues()
        },
        getData = async () => {
            let res = await axios.get(dataUrl)
            setData(res.data)
        },
        getKeyValues = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/${sKey}`)
            setEntry(res.data)
        },
        editItem = async (id: any, key: string, value: any) => {
            const url = baseApiUrl + "/UpdateKeyValueById"
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
        if (dataUrl.length > 0) getData()
    }, [])
    return <PageSettingsSection title={props.title} subtext={props.subtext} >

        <div>
            <form action="" className="section-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-content ">
                    <div className="row">
                        <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                        <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>key</div>
                        <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>value</div>
                    </div>
                    <div className="row">
                        <div className="id">{entry?.id || -1}</div>
                        <div className="key">{entry?.key || sKey}</div>
                        {data.length > 0 ?
                            <div>
                                {data && data.length > 0 &&
                                    <Select register={register} defaultValue={entry?.value} data={mapObjectToSelect(data, "name", "name")} name={"dataValue"} />
                                }
                            </div>
                            :
                            <PInput register={{ ...register("dataValue") }} inputProps={{ type: 'text' }} />
                        }
                    </div>
                </div>
                <div className="buttons-container">
                    <button type='submit' className="btn btn-white btn-sm w-100 mb-0 btn-save" >Save</button>
                </div>
            </form>
        </div>
    </PageSettingsSection>
}


const root = document.getElementById("react_root");
ReactDOM.render(<AboutUsPage />, root);
