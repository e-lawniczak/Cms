import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import { KeyValueDto, PInput, PageSettingsSection, PageWrapper, PictureDto, PictureListElement, Select, SliderDto, axiosBaseConfig, baseApiUrl, Image, mapObjectToSelect } from './common';
import { useForm } from 'react-hook-form';


export const AboutUsPage = () => {
    const
        [data, setData] = useState([])



    React.useEffect(() => {
    }, [])

    return <PageWrapper>
        <LogoSection logo_key={'about_us_banner'} title={'Main banner on About Us page'} />
        <KeyValueSection objKey='title' objVal="title" entry_key={'tabSlider1'} title={'Information block on main page'} dataUrl='/GetVisibleTabSliderList' />
        <KeyValueSection objKey='title' objVal="title" entry_key={'tabSlider2'} title={'OUR HISTORY information block'} dataUrl='/GetVisibleTabSliderList' />
        <KeyValueSection objKey='title' objVal="title" entry_key={'tabSlider3'} title={'Testimonial information block'} dataUrl='/GetVisibleTabSliderList' />
    </PageWrapper>
}
const KeyValueSection = (props: { isPicture?: boolean, objKey?: string, objVal?: string, entry_key: string, title: string, dataUrl?: string, subtext?: string }) => {
    const
        [entry, setEntry] = useState<KeyValueDto>(),
        [data, setData] = useState([]),
        { register, handleSubmit, setValue } = useForm(),
        dataUrl = props.dataUrl ? baseApiUrl + props.dataUrl : ``,
        sKey = props.entry_key,
        fieldName = sKey + "dataValue",
        selectData = mapObjectToSelect(data, props?.objKey || "name", props?.objVal || "id"),
        onSubmit = (data: any) => {
            if (!entry)
                addItem(sKey, data[fieldName])
            else
                editItem(entry.id, entry.key, data[fieldName])
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
                            <div style={{ display: 'flex', gap: "10px" }}>
                                {props.isPicture && entry?.key}
                                {data && data.length > 0 &&
                                    <Select register={register} defaultValue={entry?.value} data={selectData} name={fieldName} />
                                }
                            </div>
                            :
                            <PInput register={{ ...register(fieldName) }} inputProps={{ type: 'text' }} />
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

const LogoSection = (props: { logo_key: string, title: string }) => {
    const
        [pictures, setPictures] = useState<PictureDto[]>(),
        [logoPicture, setLogo] = useState<KeyValueDto>(),
        getPictures = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllPictureList`)
            setPictures(res.data)
        },
        { register, handleSubmit, setValue } = useForm(),
        onSubmit = (data: any) => {
            if (!logoPicture)
                addItem(props.logo_key, data.logoValue)
            else
                editItem(logoPicture.id, logoPicture.key, data.logoValue)
            getKeyValues()

        },
        getKeyValues = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/${props.logo_key}`)
            setLogo(res.data)
            setValue("logoValue", res.data.value)
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
        },
        onPictureClick = (pic: PictureDto) => {
            setValue("logoValue", `/GetPicture/Mini/${pic.pictureId}`)
        }

    React.useEffect(() => {
        getPictures()
        getKeyValues()
    }, [])
    return <PageSettingsSection title={props.title} className={'two-col'} subtext={'Click on the picture from the list. Then click the save button'} >
        <div className="logo-preview">
            <Image src={baseApiUrl + logoPicture?.value || ""} />
        </div>
        <div>
            <form action="" className="section-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-content ">
                    <div className="row">
                        <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                        <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>key</div>
                        <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>value</div>
                    </div>
                    <div className="row">
                        <div className="id">{logoPicture?.id || -1}</div>
                        <div className="key">{logoPicture?.key || props.logo_key}</div>
                        <PInput register={{ ...register("logoValue") }} inputProps={{ type: 'text' }} />
                    </div>
                </div>
                <div className="buttons-container">
                    <button type='submit' className="btn btn-white btn-sm w-100 mb-0 btn-save" >Save</button>
                </div>
            </form>
            <div className="picture-list">
                {pictures?.map((d: PictureDto, idx) => <div className='picture-container'><PictureListElement key={idx} item={d} onClick={() => onPictureClick(d)} /> <div>{d.name}</div>  </div>)}
            </div>
        </div>
    </PageSettingsSection>
}
const root = document.getElementById("react_root");
ReactDOM.render(<AboutUsPage />, root);
