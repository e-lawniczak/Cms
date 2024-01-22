import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { GalleryDto, PInput, PageWrapper, PictureDto, PictureListElement, RoleDto, Select, TestimonialDto, axiosBaseConfig, baseApiUrl, mapObjectToSelect, sortFunc } from './common';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export const GalleryPage = () => {
    const
        [data, setData] = useState([]),
        [showNew, setNew] = useState(false),
        [galleries, setGalleries] = useState<GalleryDto[]>(),
        [pictures, setPictures] = useState<PictureDto[]>(),
        getGalleries = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllGalleryList`, axiosBaseConfig)
            setGalleries(res.data.sort((a: any, b: any) => sortFunc(a, b)))
        },
        getpictures = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllPictureList`, axiosBaseConfig)
            setPictures(res.data)
        },

        addNew = <GalleryRow item={null} isNew={true} pictures={pictures} refreshFunc={getGalleries} showFunc={setNew} />





    React.useEffect(() => {
        getGalleries()
        getpictures()
    }, [])
    return <div className='card mb-4' >
        <div className="form-top-container">{!showNew && <div className="btn btn-white btn-sm mb-0 btn-save" onClick={() => setNew(true)} >Add new</div>}</div>
        <div className="generic-list">
            <div className="gallery-row row">
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>name</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>main text</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>sub text</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>visible</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>No. of pictures</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>options</div>
            </div>
            {showNew && addNew}
            {galleries && pictures && galleries.map((item: GalleryDto, idx: any) => <GalleryRow pictures={pictures} key={idx} item={item} isNew={false} refreshFunc={getGalleries} />)}
        </div>
    </div>
}
const GalleryRow = (props: { item: GalleryDto, isNew: boolean, pictures: any, refreshFunc: any, showFunc?: any }) => {
    const
        { item, isNew, refreshFunc, showFunc, pictures } = props,
        picturesData = mapObjectToSelect(pictures, "name", "pictureId"),
        initialPictures = pictures.filter((pic: PictureDto) => item?.pictureIdList.indexOf(pic.pictureId) > -1),
        [selectedPictures, setSelectedPictures] = useState<PictureDto[]>(initialPictures),
        [showPictures, setShowPictures] = useState(false),
        { register, handleSubmit, formState, getValues } = useForm({
            defaultValues: { ...item }
        }),
        makeItem = (data: any) => {
            return {
                id: item?.id || -1,
                isVisible: data?.isVisible,
                mainText: data?.mainText,
                name: data?.name,
                pictureIdList: selectedPictures.map((i: PictureDto) => i.pictureId),
                subText: data?.subText,

            } as GalleryDto
        },
        addItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/AddGallery";
            await axios.post(url, item, axiosBaseConfig)
            refreshFunc()
            showFunc(false)
            setShowPictures(false)
            location.reload()
        },
        deleteItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/DeleteGallery/" + item.id;
            await axios.delete(url, axiosBaseConfig)
            refreshFunc()
            setShowPictures(false)
        },
        editItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/UpdateGallery";
            await axios.patch(url, item, axiosBaseConfig)
            refreshFunc()
            setShowPictures(false)
        },
        onPictureClick = (pic: PictureDto) => {
            let isSelected = selectedPictures.indexOf(pic) > -1
            if (!isSelected) {
                let x = [...selectedPictures]
                x.push(pic)
                setSelectedPictures(x)
            } else {
                let x = [...selectedPictures]
                let index = x.indexOf(pic)
                if (index > -1) {
                    x.splice(index, 1)
                }
                setSelectedPictures(x)
            }
        }

    return <form className='' >
        <div className="form-content ">
            <div className="gallery-row row">
                <div className="id">{item?.id || -1}</div>
                <PInput register={{ ...register("name") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("mainText") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("subText") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("isVisible") }} inputProps={{ type: 'checkbox' }} />
                <div className="number-of-pics">
                    {item?.pictureIdList.length || 0}
                </div>
                <div className="buttons-container">
                    {isNew ?
                        <div className="btn btn-white btn-sm w-100 mb-0 btn-save" onClick={(e) => addItem(getValues())}>Add</div>
                        : <>
                            <div className="btn btn-white btn-sm w-100 mb-0 btn-save" onClick={(e) => editItem(getValues())}>Edit</div>
                            <div className="btn btn-white btn-sm w-100 mb-0 btn-delete" onClick={(e) => deleteItem(getValues())}>Delete</div></>}
                    <div className="btn btn-white btn-sm w-100 mb-0 btn-save" onClick={(e) => setShowPictures(!showPictures)}>{showPictures ? "-" : "+"}</div>

                </div>

            </div>
            {showPictures &&
                <>
                    <i style={{ marginTop: 20 }}>Zdjęcia w galerii:</i>
                    <div className='current-pic-list'>
                        {selectedPictures.map((i: PictureDto) => <div className='pic-name'>{i.name}; </div>)}
                    </div>
                </>}
            {showPictures &&
                <div className="gallery-pic-list picture-list">
                    {pictures?.map((d: PictureDto, idx: any) => <div
                        key={"s" + idx}
                        className={['picture-container', selectedPictures.indexOf(d) > -1 ? "selected" : "not-selected"].join(" ")}>
                        {selectedPictures.indexOf(d) > -1 && <div onClick={() => onPictureClick(d)} className='overlay'><div className="">X</div></div>}
                        <PictureListElement key={idx} item={d} onClick={() => onPictureClick(d)} />
                        <div>{d.name}</div>
                    </div>)}
                </div>}
        </div>
    </form>
}


const root = document.getElementById("react_root");
ReactDOM.render(<GalleryPage />, root);
