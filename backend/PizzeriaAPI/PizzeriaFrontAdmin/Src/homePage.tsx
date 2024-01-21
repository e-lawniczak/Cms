import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Image, KeyValueDto, MenuElementDto, PInput, PageSettingsSection, PageWrapper, PictureDto, PictureListElement, Select, SliderDto, SocialMediaDto, axiosBaseConfig, baseApiUrl, mapObjectToSelect } from './common';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export const HomePage = () => {
    const
        [data, setData] = useState([])


    React.useEffect(() => {
    }, [])

    return <PageWrapper>
        <ContactSection />
        <SocialMediaSection />
        <LogoSection logo_key={'main_logo'} title={'Logo'} />
        <LogoSection logo_key={'footer_logo'} title={'Footer logo'} />
        <MenuSection />
        <SliderSection />
    </PageWrapper>
}
const SliderSection = () => {
    const
        [slider, setSlider] = useState<KeyValueDto>(),
        [slidersData, setSliderData] = useState<SliderDto[]>(),
        { register, handleSubmit, setValue } = useForm(),
        sKey = "home_page_slider",
        onSubmit = (data: any) => {
            console.log(data);
            if (!slider)
                addItem(sKey, data.sliderValue)
            else
                editItem(slider.id, slider.key, data.sliderValue)
        },
        getSliders = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllSliderList`)
            setSliderData(res.data)
        },
        getKeyValues = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValue/${sKey}`)
            setSlider(res.data)
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
        getSliders()
    }, [])
    return <PageSettingsSection title={"Slider"} subtext={"Choose a slider to be displayed on the main page"} >
        <div className="banner-preview">
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
                        <div className="id">{slider?.id || -1}</div>
                        <div className="key">{slider?.key || sKey}</div>
                        <div>
                            {slidersData && slidersData.length > 0 &&
                                <Select register={register} defaultValue={slider?.value} data={mapObjectToSelect(slidersData, "name", "sliderId")} name={"sliderValue"} />
                            }
                        </div>
                    </div>
                </div>
                <div className="buttons-container">
                    <button type='submit' className="btn btn-white btn-sm w-100 mb-0 btn-save" >Save</button>
                </div>
            </form>
        </div>
    </PageSettingsSection>
}

const MenuSection = () => {
    const
        [elements, setElements] = useState<MenuElementDto[]>(),
        [parentElements, setParentElements] = useState<MenuElementDto[]>(),
        [showNew, setNew] = useState(false),
        getMenuElements = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllMenuElementList`)
            console.log(res);
            setElements(res.data)
            setParentElements(res.data.filter((m: MenuElementDto, idx: any) => !(m.parentMenuElementId && m.parentMenuElementId > 0)))
        },
        parentData = mapObjectToSelect(parentElements, "text", "menuElementId"),
        newItem = <MenuElementRow parentData={parentData} item={null} refreshFunc={getMenuElements} isNew={true} />


    React.useEffect(() => {
        getMenuElements()
    }, [])

    return <PageSettingsSection title={'Menu elements'}>
        <div className="form-top-container">{!showNew && <div className="btn btn-white btn-sm mb-0 btn-save" onClick={() => setNew(true)} >Add new</div>}</div>
        <form className='section-form' >
            <div className="form-content ">
                <div className="menu-element-row row">
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>label</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>link</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>visible</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>parent</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>options</div>
                </div>
                {showNew && newItem}
                {elements && elements.map((e: MenuElementDto, idx: any) => <MenuElementRow parentData={parentData} item={e} key={idx} refreshFunc={getMenuElements} />)}

            </div>
        </form>
    </PageSettingsSection>
}
const MenuElementRow = (props: { parentData: any[], item: MenuElementDto, isNew?: boolean, refreshFunc: any }) => {
    const
        { item, parentData, isNew = false, refreshFunc } = props,
        { register, handleSubmit, setValue, getValues } = useForm({ defaultValues: { ...item } }),
        onSubmit = (data: any) => {
            console.log(data);
        },
        makeItem = (data: any) => {
            return {
                isVisible: data?.isVisible || false,
                link: data?.link || "",
                menuElementId: item?.menuElementId || -1,
                parentMenuElementId: data?.parentMenuElementId || null,
                text: data?.text || ""
            } as MenuElementDto
        },
        addItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/AddMenuElement";
            await axios.post(url, item, axiosBaseConfig)
            refreshFunc()

        },
        deleteItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/DeleteMenuElement/" + item.menuElementId;
            await axios.delete(url, axiosBaseConfig)
            refreshFunc()
        },
        editItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/UpdateMenuElement";
            await axios.patch(url, item, axiosBaseConfig)
            refreshFunc()
        }
    return <div className="menu-element-row row">
        <div className="id">{item?.menuElementId || -1}</div>
        <PInput register={{ ...register("text") }} inputProps={{ type: 'text' }} />
        <PInput register={{ ...register("link") }} inputProps={{ type: 'text' }} />
        <PInput register={{ ...register("isVisible") }} inputProps={{ type: 'checkbox' }} />
        <div>
            {parentData && parentData.length > 0 &&
                <Select register={register} defaultValue={item.parentMenuElementId} data={parentData} name={"parentMenuElementId"} />}
        </div>
        <div className="buttons-container">
            {isNew ?
                <div className="btn btn-white btn-sm w-100 mb-0 btn-save" onClick={(e) => addItem(getValues())}>Add</div>
                : <>
                    <div className="btn btn-white btn-sm w-100 mb-0 btn-save" onClick={(e) => editItem(getValues())}>Edit</div>
                    <div className="btn btn-white btn-sm w-100 mb-0 btn-delete" onClick={(e) => deleteItem(getValues())}>Delete</div></>}
        </div>
    </div>
}
const LogoSection = (props: { logo_key: string, title: string }) => {
    const
        [pictures, setPictures] = useState<PictureDto[]>(),
        [logoPicture, setLogo] = useState<KeyValueDto>(),
        getPictures = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllPictureList`)
            console.log(res);
            setPictures(res.data)
        },
        { register, handleSubmit, setValue } = useForm(),
        onSubmit = (data: any) => {
            console.log(data);
            if (!logoPicture)
                addItem(props.logo_key, data.logoValue)
            else
                editItem(logoPicture.id, logoPicture.key, data.logoValue)
        },
        getKeyValues = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValue/${props.logo_key}`)
            setLogo(res.data)
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
        },
        onPictureClick = (pic: PictureDto) => {
            setValue("logoValue", `/GetPicture/Full/${pic.pictureId}`)
        }

    React.useEffect(() => {
        getPictures()
    })
    return <PageSettingsSection title={props.title} className={'two-col'} subtext={'Click on the picture from the list. Then click the save button'} >
        <div className="logo-preview">
            <Image src={logoPicture?.value || ""} />
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
                {pictures?.map((d: PictureDto, idx) => <PictureListElement key={idx} item={d} onClick={() => onPictureClick(d)} />)}
            </div>
        </div>
    </PageSettingsSection>
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
            setAddress(ares.data)
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
            <div className="form-content ">
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

const SocialMediaSection = () => {
    const
        [socialMedia, setSocialMedia] = useState<SocialMediaDto[]>(),
        getSocials = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllSocialMediaList`)
            console.log(res);
            setSocialMedia(res.data)
        }

    React.useEffect(() => {
        getSocials()
    })
    return <PageSettingsSection title={"Social media"} subtext={`Socials with "Main" checked will be displayed at the main page`}>
        <form className='section-form' >
            <div className="form-content ps ps--active-y">
                {socialMedia && socialMedia.length <= 0 && <div>Create <a className='normal-link' href="/SocialMedia">Social media</a> link first</div>}
                {socialMedia && socialMedia.map((item: SocialMediaDto, idx: any) => <SocialMediaRow getSocials={getSocials} item={item} />)}
            </div>
            <div className="buttons-container">
                {/* {socialMedia && socialMedia.length > 0 && <button type='submit' className="btn btn-white btn-sm w-100 mb-0 btn-save" >Save</button>} */}
            </div>
        </form>
    </PageSettingsSection>
}
const SocialMediaRow = (props: { item: SocialMediaDto, [x: string]: any }) => {
    const { item, setData, data, getSocials } = props,
        thisItemMain = data.filter((i: any) => i.originalItem.name == item.name)[0],
        handleCheckboxChange = (e: any, type: string) => {
            let formItem = item
            if (type == "main") {
                formItem.isMain = e.target.value
            } else {
                formItem.isVisible = e.target.value
            }
            editSocials(formItem)
        },
        editSocials = async (formItem: any) => {
            const url = baseApiUrl + "/UpdateSocialMedia"
            await axios.patch(url, { formItem }, axiosBaseConfig)
            getSocials()
        }


    return <div className="row">
        <div className="name">{item.name}</div>
        <label htmlFor={item.name}>Wyświetlić jako główne?</label>
        <input type="checkbox" name={item.name} id={item.name} checked={thisItemMain?.isMain || false} onChange={(e) => handleCheckboxChange(e, "main")} />
        <label htmlFor={item.name}>Czy wyświelać?</label>
        <input type="checkbox" name={item.name} id={item.name} checked={thisItemMain?.isMain || false} onChange={(e) => handleCheckboxChange(e, "visible")} />
    </div>
}


const root = document.getElementById("react_root");
ReactDOM.render(<HomePage />, root);
