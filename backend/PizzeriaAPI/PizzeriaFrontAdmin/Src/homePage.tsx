import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { BannerDto, Image, KeyValueDto, MenuElementDto, PInput, PageSettingsSection, PageWrapper, PictureDto, PictureListElement, Select, SliderDto, SocialMediaDto, axiosBaseConfig, baseApiUrl, mapObjectToSelect, sortFunc } from './common';
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
        <KeyValueSection _key='footer_email' title='Footer email info' />
        <MenuSection />
        <SliderSection />
        <KeyValueSection _key='categoriesTitle' title='Title of categories section' />
        <BannerSection banner_key={'banner_1'} title={"First banner"} />
        <KeyValueSection _key='productsTitle' title='Title of products section' />
        <BannerSection banner_key={'banner_2'} title={"Second banner banner"} />
        <KeyValueSection _key='testimonialTitle' title='Title of testimonial section' />
        {Array.from({ length: 7 }, (_, i) => i + 1).map((i: any, idx: any) => <GallerySection key={idx} gallery_key={`gallery_${i}`} title={`Home page gallery ${i}`} />)}
        <KeyValueSection _key='box1' title='Box 1 title content' />
        <KeyValueSection _key='box1_text' title='Box 1 text content' />
        <KeyValueSection _key='box2' title='Box 2 title content' />
        <KeyValueSection _key='box2_text' title='Box 2 text content' />
        <KeyValueSection _key='box3' title='Box 3 title content' />
        <KeyValueSection _key='box3_text' title='Box 3 text content' />
        <KeyValueSection _key='box4' title='Box 4 title content' />
        <KeyValueSection _key='box4_text' title='Box 4 text content' />
        <KeyValueSection _key='footer_title1' title='Title on first column in footer' />
        <KeyValueSection _key='footer_title2' title='Title on second column in footer' />
        <KeyValueSection _key='footer_rights' title='All rights reserved bottom footer content' />
    </PageWrapper>
}
const KeyValueSection = (props: { _key: string, title: string, subText?: any }) => {
    const
        [item, setitem] = useState<KeyValueDto>(),
        { register, handleSubmit, setValue } = useForm({
            defaultValues: { itemValue: item?.value || "" },
        }),
        sKey = props._key,
        onSubmit = (data: any) => {
            if (!item)
                addItem(sKey, data.itemValue)
            else
                editItem(item.id, item.key, data.itemValue)
            getKeyValues()
        },
        getKeyValues = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/${sKey}`)
            setValue("itemValue", res.data.value)
            setitem(res.data)
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
    }, [])
    return <PageSettingsSection title={props.title} subtext={props.subText} >

        <div>
            <form action="" className="section-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-content ">
                    <div className="row">
                        <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                        <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>key</div>
                        <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>value</div>
                    </div>
                    <div className="row">
                        <div className="id">{item?.id || -1}</div>
                        <div className="key">{item?.key || sKey}</div>
                        <PInput register={{ ...register("itemValue") }} inputProps={{ type: 'text' }} />
                    </div>
                </div>
                <div className="buttons-container">
                    <button type='submit' className="btn btn-white btn-sm w-100 mb-0 btn-save" >Save</button>
                </div>
            </form>
        </div>
    </PageSettingsSection>
}
const GallerySection = (props: { gallery_key: string, title: string }) => {
    const
        [galllery, setSlider] = useState<KeyValueDto>(),
        [galleries, setGalleries] = useState<SliderDto[]>(),
        { register, handleSubmit, setValue } = useForm(),
        sKey = props.gallery_key,
        onSubmit = (data: any) => {
            if (!galllery)
                addItem(sKey, data.bannerValue)
            else
                editItem(galllery.id, galllery.key, data.bannerValue)
            getKeyValues()
        },
        getGalleries = async () => {
            let res = await axios.get(baseApiUrl + `/GetVisibleGalleryList`)
            setGalleries(res.data)
        },
        getKeyValues = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/${sKey}`)
            setSlider(res.data)
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
        getGalleries()
    }, [])
    return <PageSettingsSection title={props.title} subtext={"Choose a gallery to be displayed as one of the 6 on the home page"} >

        <div>
            <form action="" className="section-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-content ">
                    <div className="row">
                        <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                        <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>key</div>
                        <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>value</div>
                    </div>
                    <div className="row">
                        <div className="id">{galllery?.id || -1}</div>
                        <div className="key">{galllery?.key || sKey}</div>
                        <div>
                            {galleries && galleries.length > 0 &&
                                <Select register={register} defaultValue={galllery?.value} data={mapObjectToSelect(galleries, "name", "name")} name={"bannerValue"} />
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
const BannerSection = (props: { banner_key: string, title: string }) => {
    const
        [banner, setSlider] = useState<KeyValueDto>(),
        [bannerData, setSliderData] = useState<BannerDto[]>(),
        { register, handleSubmit, setValue } = useForm(),
        sKey = props.banner_key,
        onSubmit = (data: any) => {
            if (!banner)
                addItem(sKey, data.bannerValue)
            else
                editItem(banner.id, banner.key, data.bannerValue)
            getKeyValues()
        },
        getSliders = async () => {
            let res = await axios.get(baseApiUrl + `/GetVisibleBannerList`)
            setSliderData(res.data)
        },
        getKeyValues = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/${sKey}`)
            setSlider(res.data)
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
        getSliders()
    }, [])
    return <PageSettingsSection title={props.title} subtext={"Choose a banner to be displayed in the section"} >
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
                        <div className="id">{banner?.id || -1}</div>
                        <div className="key">{banner?.key || sKey}</div>
                        <div>
                            {bannerData && bannerData.length > 0 &&
                                <Select register={register} defaultValue={banner?.value} data={mapObjectToSelect(bannerData, "title", "title")} name={"bannerValue"} />
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
const SliderSection = () => {
    const
        [slider, setSlider] = useState<KeyValueDto>(),
        [slidersData, setSliderData] = useState<SliderDto[]>(),
        { register, handleSubmit, setValue } = useForm(),
        sKey = "home_page_slider",
        onSubmit = (data: any) => {
            if (!slider)
                addItem(sKey, data.sliderValue)
            else
                editItem(slider.id, slider.key, data.sliderValue)
            getKeyValues()
        },
        getSliders = async () => {
            let res = await axios.get(baseApiUrl + `/GetVisibleSliderList`)
            setSliderData(res.data)
        },
        getKeyValues = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/${sKey}`)
            setSlider(res.data)
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
                                <Select register={register} defaultValue={slider?.value} data={mapObjectToSelect(slidersData, "name", "name")} name={"sliderValue"} />
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
            setElements(res.data.sort((a: MenuElementDto, b: MenuElementDto) => sortFunc(a, b, "menuElementId")))
            setParentElements(res.data.filter((m: MenuElementDto, idx: any) => m.parentMenuElementId == null))
        },
        newItem = <MenuElementRow elements={elements} parentElements={parentElements} item={null} refreshFunc={getMenuElements} isNew={true} setShow={setNew} />


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
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>select parent</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>current parent</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>options</div>
                </div>
                {showNew && newItem}
                {elements && elements.map((e: MenuElementDto, idx: any) => <MenuElementRow parentElements={parentElements} elements={elements} item={e} key={idx} refreshFunc={getMenuElements} />)}

            </div>
        </form>
    </PageSettingsSection>
}
const MenuElementRow = (props: { parentElements: any[], item: MenuElementDto, elements: any, isNew?: boolean, refreshFunc: any, setShow?: any }) => {
    const
        { item, parentElements, isNew = false, refreshFunc, elements, setShow = () => { } } = props,
        { register, handleSubmit, setValue, getValues } = useForm({ defaultValues: { ...item } }),
        onSubmit = (data: any) => {
        },
        makeItem = (data: any) => {
            return {
                isVisible: data?.isVisible || false,
                link: data?.link || "",
                menuElementId: item?.menuElementId || -1,
                parentMenuElementId: data?.parentMenuElementId / 1 || null,
                text: data?.text || ""
            } as MenuElementDto
        },
        addItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/AddMenuElement";
            await axios.post(url, item, axiosBaseConfig)
            setShow(false)
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
    let parentData = mapObjectToSelect(parentElements, "text", "menuElementId").filter((i: any) => i.value != item?.menuElementId)
    parentData.push({ label: "no parent", value: null })
    return <div className="menu-element-row row">
        <div className="id">{item?.menuElementId || -1}</div>
        <PInput register={{ ...register("text") }} inputProps={{ type: 'text' }} />
        <PInput register={{ ...register("link") }} inputProps={{ type: 'text' }} />
        <PInput register={{ ...register("isVisible") }} inputProps={{ type: 'checkbox' }} />
        <div>
            {parentData && parentData?.length > 0 &&
                <Select register={register} defaultValue={item?.parentMenuElementId} data={parentData} name={"parentMenuElementId"} />}
        </div>
        <div>
            {elements && elements.filter((e: MenuElementDto) => item?.parentMenuElementId != null && e.menuElementId == item.parentMenuElementId)[0]?.text}
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
                        <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'></div>
                    </div>
                    <div className="row">
                        <div className="id">{logoPicture?.id || -1}</div>
                        <div className="key">{logoPicture?.key || props.logo_key}</div>
                        <PInput register={{ ...register("logoValue") }} inputProps={{ style: { display: "none" }, disabled: true, type: 'text' }} />
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
const ContactSection = () => {
    const
        [phone, setPhone] = useState<KeyValueDto>(),
        [address, setAddress] = useState<KeyValueDto>(),
        { register, handleSubmit, setValue } = useForm({
            defaultValues: { phoneValue: phone?.value || "", addressValue: address?.value || "" }
        }),
        onSubmit = (data: any) => {
            if (!phone) {
                addItem("phone", data.phoneValue)
            }
            else {
                editItem(phone.id, phone.key, data.phoneValue)
            }
            if (!address) {
                addItem("address", data.addressValue)
                getKeyValues()

            }
            else {
                editItem(address.id, address.key, data.addressValue)
                getKeyValues()

            }

        },
        getKeyValues = async () => {
            let pres = await axios.get(baseApiUrl + `/GetKeyValueByKey/phone`)
            let ares = await axios.get(baseApiUrl + `/GetKeyValueByKey/address`)
            setPhone(pres.data)
            setValue("phoneValue", pres.data.value)
            setAddress(ares.data)
            setValue("addressValue", ares.data.value)

        },
        editItem = async (id: any, key: string, value: any) => {
            const url = baseApiUrl + "/UpdateKeyValueById"
            await axios.patch(url, { id: id, key: key, value: value }, axiosBaseConfig)

        },
        addItem = async (key: string, value: any) => {
            const url = baseApiUrl + "/AddKeyValue";
            await axios.post(url, { id: -1, key: key, value: value }, axiosBaseConfig)
        }

    React.useEffect(() => {
        getKeyValues()
    }, [])
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
            setSocialMedia(res.data)
        }

    React.useEffect(() => {
        getSocials()
    }, [])
    return <PageSettingsSection title={"Social media"} subtext={`Socials with "Main" checked will be displayed at the main page`}>
        <form className='section-form' >
            <div className="form-content social-media-content custom-scroll">
                <div className="social-home-row  row">
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>name</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>main</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>visible</div>
                </div>
                {socialMedia && socialMedia.length <= 0 && <div>Create <a className='normal-link' href="/SocialMedia">Social media</a> link first</div>}
                {socialMedia && socialMedia.map((item: SocialMediaDto, idx: any) => <SocialMediaRow data={socialMedia} getSocials={getSocials} item={item} />)}
            </div>
            <div className="buttons-container">
                {/* {socialMedia && socialMedia.length > 0 && <button type='submit' className="btn btn-white btn-sm w-100 mb-0 btn-save" >Save</button>} */}
            </div>
        </form>
    </PageSettingsSection>
}
const SocialMediaRow = (props: { item: SocialMediaDto, [x: string]: any }) => {
    const { item, setData, data, getSocials } = props,
        thisItemMain = data?.filter((i: any) => i.name == item.name)[0],
        handleCheckboxChange = (e: any, type: string) => {
            let formItem = item
            if (type == "main") {
                formItem.isMain = e.target.checked
            } else {
                formItem.isVisible = e.target.checked
            }
            editSocials(formItem)
        },
        editSocials = async (formItem: any) => {
            const url = baseApiUrl + "/UpdateSocialMedia"
            await axios.patch(url, { ...formItem }, axiosBaseConfig)
            getSocials()
        }


    return <div className="social-home-row row">
        <div className="name">{item.id}</div>
        <div className="name">{item.name}</div>
        <div>
            {/* <label htmlFor={item.name}>Set as main?</label> */}
            <input type="checkbox" name={item.name} id={item.name} checked={thisItemMain?.isMain || false} onChange={(e) => handleCheckboxChange(e, "main")} />
        </div>
        <div>
            {/* <label htmlFor={item.name}>Visible?</label> */}
            <input type="checkbox" name={item.name} id={item.name} checked={thisItemMain?.isVisible || false} onChange={(e) => handleCheckboxChange(e, "visible")} />
        </div>
    </div>
}


const root = document.getElementById("react_root");
ReactDOM.render(<HomePage />, root);
