import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { BannerDto, KeyValueDto, PInput, PageWrapper, PictureDto, Select, SliderDto, axiosBaseConfig, baseApiUrl, mapObjectToSelect, sortFunc } from './common';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export const SlidersPage = () => {
    const
        [data, setData] = useState([])



    React.useEffect(() => {
    }, [])

    return <PageWrapper>
        <SliderSection />
    </PageWrapper>
}
const SliderSection = () => {
    const
        [banner, setBanner] = useState<KeyValueDto>(),
        [sliders, setSlidersData] = useState<SliderDto[]>(),
        [banners, setBanners] = useState<BannerDto[]>(),
        [pictures, setPictures] = useState<PictureDto[]>(),
        [showNew, setNew] = useState(false),
        { register, handleSubmit, setValue } = useForm(),
        getBanners = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllBannerList`)
            setBanners(res.data.sort((a: any, b: any) => sortFunc(a, b)))
        },
        getSliders = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllSliderList`)
            setSlidersData(res.data.sort((a: any, b: any) => sortFunc(a, b, "sliderId")))
        },

        getpictures = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllPictureList`, axiosBaseConfig)
            setPictures(res.data)
        },
        getData = () => {
            getBanners()
            getSliders()
            getpictures()
        },
        addNew = <SliderRow item={null} isNew={true} banners={banners} refreshFunc={getData} showFunc={setNew} />


    React.useEffect(() => {
        getBanners()
        getSliders()
        getpictures()
    }, [])
    return <div className='card mb-4' >
        <div className="form-top-container">{!showNew && sliders?.length < 1 && <div className="btn btn-white btn-sm mb-0 btn-save" onClick={() => setNew(true)} >Add new</div>}</div>
        <div className="socials-list">
            <div className="sliders-row row">
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>name</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>banners</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>visible</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>options</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>selected banners</div>
            </div>
            {showNew && addNew}
            {sliders && banners && sliders.map((item: SliderDto, idx: any) => <SliderRow key={idx} item={item} isNew={false} banners={banners} refreshFunc={getData} />)}
        </div>
    </div>
}
const SliderRow = (props: { item: SliderDto, isNew: boolean, banners: any[], refreshFunc: any, showFunc?: any }) => {
    const
        { item, isNew, banners = [], refreshFunc, showFunc } = props,
        bannersData = mapObjectToSelect(banners, "title", "id"),
        [pickedBanners, setPickedBanners] = useState([]),
        { register, handleSubmit, formState, getValues } = useForm({
            defaultValues: { ...item }
        }),
        makeItem = (data: any) => {
            return {
                bannerIdList: data?.bannerIdList.map((i:number) => i/1) || [],
                isVisible: data?.isVisible || "",
                name: data?.name || "",
                sliderId: item?.sliderId || -1

            } as SliderDto
        },
        addItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/AddSlider";
            await axios.post(url, item, axiosBaseConfig)
            refreshFunc()
            showFunc(false)
        },
        deleteItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/DeleteSlider/" + item.sliderId;
            await axios.delete(url, axiosBaseConfig)
            refreshFunc()
        },
        editItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/UpdateSlider";
            await axios.patch(url, item, axiosBaseConfig)
            refreshFunc()
        }

    return <form className='' >
        <div className="form-content ">
            <div className="sliders-row row">
                <div className="id">{item?.sliderId || -1}</div>
                <PInput register={{ ...register("name") }} inputProps={{ type: 'text' }} />
                <div>
                    {bannersData.length > 0 &&
                        <Select register={register} selectProps={{ multiple: true }} data={bannersData} defaultValue={item?.bannerIdList || null} name={"bannerIdList"} />
                    }
                </div>
                <PInput register={{ ...register("isVisible") }} inputProps={{ type: 'checkbox' }} />
                <div className="buttons-container">
                    {isNew ?
                        <div className="btn btn-white btn-sm w-100 mb-0 btn-save" onClick={(e) => addItem(getValues())}>Add</div>
                        : <>
                            <div className="btn btn-white btn-sm w-100 mb-0 btn-save" onClick={(e) => editItem(getValues())}>Edit</div>
                            <div className="btn btn-white btn-sm w-100 mb-0 btn-delete" onClick={(e) => deleteItem(getValues())}>Delete</div></>}
                </div>
                <div className="selected-banners custom-scroll">

                    {banners.filter((b: BannerDto, idx: any) => {
                        for (let i = 0; i < item?.bannerIdList.length; i++) {
                            if (item.bannerIdList[i] == b.id) return true;
                        }
                    }).map((b: BannerDto, idx: any) => <div key={idx}>{b.title};</div>)}
                </div>
            </div>
        </div>
    </form>
}


const root = document.getElementById("react_root");
ReactDOM.render(<SlidersPage />, root);
