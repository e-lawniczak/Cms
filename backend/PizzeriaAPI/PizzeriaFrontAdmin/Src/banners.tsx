import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import { BannerDto, KeyValueDto, PInput, PageWrapper, PictureDto, Select, SliderDto, axiosBaseConfig, baseApiUrl, mapObjectToSelect, sortFunc } from './common';
import { useForm } from 'react-hook-form';


export const BannersPage = () => {
    const
        [data, setData] = useState([])



    React.useEffect(() => {
    }, [])

    return <PageWrapper>
        <BannerSection />
    </PageWrapper>
}
const BannerSection = () => {
    const
        [banner, setBanner] = useState<KeyValueDto>(),
        [bannersData, setBannersData] = useState<BannerDto[]>(),
        [pictures, setPictures] = useState<PictureDto[]>(),
        [showNew, setNew] = useState(false),
        { register, handleSubmit, setValue } = useForm(),
        sKey = "home_page_slider",
        onSubmit = (data: any) => {
        },
        getBanners = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllBannerList`)
            setBannersData(res.data.sort((a:any,b:any) => sortFunc(a,b)))
        },
        getpictures = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllPictureList`, axiosBaseConfig)
            setPictures(res.data)
        },
        getData = async () => {
            await getBanners()
            await getpictures()
        },
        addNew = <BannerRow item={null} isNew={true} pictures={pictures} refreshFunc={getData} setNew={setNew} />


    React.useEffect(() => {
        getBanners()
        getpictures()
    }, [])
    return <div className='card mb-4' >
        <div className="form-top-container">{!showNew && <div className="btn btn-white btn-sm mb-0 btn-save" onClick={() => setNew(true)} >Add new</div>}</div>
        <div className="socials-list">
            <div className="banners-row row">
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>title</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>text</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>subtext</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>link</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>visible</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>picture</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>options</div>
            </div>
            {showNew && addNew}
            {bannersData && bannersData.map((item: BannerDto, idx: any) => <BannerRow key={idx} item={item}  isNew={false} pictures={pictures} refreshFunc={getData} />)}
        </div>
    </div>
}
const BannerRow = (props: { item: BannerDto, isNew: boolean, pictures: any[], refreshFunc: any, setNew?:any }) => {
    const
        { item, isNew, pictures, refreshFunc,setNew } = props,
        picData = mapObjectToSelect(pictures, "name", "pictureId"),
        { register, handleSubmit, formState, getValues } = useForm({
            defaultValues: { ...item }
        }),
        makeItem = (data: any) => {
            return {
                id: item?.id || -1,
                isVisible: data?.isVisible || item?.isVisible || false,
                link: data?.link || item?.link || "",
                pictureIdList: data?.pictureIdList ? [data?.pictureIdList/1] : [],
                sliderId: data?.sliderId || item?.sliderId || null,
                subText: data?.subText || item?.subText || "",
                text: data?.text || item?.text || "",
                title: data?.title || item?.title || ""
            } as BannerDto
        },
        addItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/AddBanner";
            await axios.post(url, item, axiosBaseConfig)
            refreshFunc()
            setNew(false)
        },
        deleteItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/DeleteBanner/" + item.id;
            await axios.delete(url, axiosBaseConfig)
            refreshFunc()
        },
        editItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/UpdateBanner";
            await axios.patch(url, item, axiosBaseConfig)
            refreshFunc()
        }

    return <form className='' >
        <div className="form-content ">
            <div className="banners-row row">
                <div className="id">{item?.id || -1}</div>
                <PInput register={{ ...register("title") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("text") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("subText") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("link") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("isVisible") }} inputProps={{ type: 'checkbox' }} />
                <div>
                    {picData.length > 0 &&
                        <Select register={register} data={picData} defaultValue={item?.pictureIdList[0] || null} name={"pictureIdList"} />
                    }
                </div>
                <div className="buttons-container">
                    {isNew ?
                        <div className="btn btn-white btn-sm w-100 mb-0 btn-save" onClick={(e) => addItem(getValues())}>Add</div>
                        : <>
                            <div className="btn btn-white btn-sm w-100 mb-0 btn-save" onClick={(e) => editItem(getValues())}>Edit</div>
                            <div className="btn btn-white btn-sm w-100 mb-0 btn-delete" onClick={(e) => deleteItem(getValues())}>Delete</div></>}
                </div>
            </div>
        </div>
    </form>
}


const root = document.getElementById("react_root");
ReactDOM.render(<BannersPage />, root);
