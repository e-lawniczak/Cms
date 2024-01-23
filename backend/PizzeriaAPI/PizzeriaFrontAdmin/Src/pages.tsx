import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import { ContactInfoDto, PEditor, PInput, PageDto, PageWrapper, PictureDto, Select, axiosBaseConfig, baseApiUrl, mapObjectToSelect, sortFunc } from './common';
import { useForm } from 'react-hook-form';


export const PagesPage = () => {
    const
        [data, setData] = useState([]),
        [showNew, setNew] = useState(false),
        [pages, setPages] = useState<PageDto[]>(),
        [pictures, setPictures] = useState<PictureDto[]>(),
        getPages = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllPageList`, axiosBaseConfig)
            setPages(res.data.sort((a: any, b: any) => sortFunc(a, b)))
        },
        getpictures = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllPictureList`, axiosBaseConfig)
            setPictures(res.data)
        },

        addNew = <ContactRow item={null} isNew={true} pages={pages} pictures={pictures} refreshFunc={getPages} showFunc={setNew} />





    React.useEffect(() => {
        getPages()
        getpictures()
    }, [])
    return <div className='card mb-4' >
        <div className="form-top-container">{!showNew && <div className="btn btn-white btn-sm mb-0 btn-save" onClick={() => setNew(true)} >Add new</div>}</div>
        <div className="generic-list">
            <div className="page-row row">
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>title</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>visible</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>picture</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>options</div>
            </div>
            {showNew && addNew}
            {pages && pages.map((item: PageDto, idx: any) => <ContactRow pictures={pictures} key={idx} item={item} isNew={false} pages={pages} refreshFunc={getPages} />)}
        </div>
    </div>
}
const ContactRow = (props: { item: PageDto, isNew: boolean, pictures: any, pages: any[], refreshFunc: any, showFunc?: any }) => {
    const
        { item, isNew, pages = [], refreshFunc, showFunc, pictures } = props,
        contactsData = mapObjectToSelect(pages, "title", "id"),
        picturesData = mapObjectToSelect(pictures, "name", "pictureId"),
        [pickedBanners, setPickedBanners] = useState([]),
        [showEditor, setShow] = useState(false),
        { register, handleSubmit, formState, getValues, setValue } = useForm({
            defaultValues: { ...item }
        }),
        editorRef = React.useRef(null),
        makeItem = (data: any) => {
            return {
                id: item?.id || -1,
                isVisible: data?.isVisible || false,
                content: data?.content || "",
                pictureIdList: [data?.pictureIdList / 1] || [],
                title: data?.title || "",
            } as PageDto
        },
        addItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/AddPage";
            await axios.post(url, item, axiosBaseConfig)
            refreshFunc()
            showFunc(false)
            location.reload()
        },
        deleteItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/DeletePage/" + item.id;
            await axios.delete(url, axiosBaseConfig)
            refreshFunc()
        },
        editItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/UpdatePage";
            await axios.patch(url, item, axiosBaseConfig)
            refreshFunc()
        }

    return <form className='' >
        <div className="form-content ">
            <div className="page-row row">
                <div className="id">{item?.id || -1}</div>
                <PInput register={{ ...register("title") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("isVisible") }} inputProps={{ type: 'checkbox' }} />
                <div>
                    {picturesData.length > 0 &&
                        <Select register={register} data={picturesData} defaultValue={item?.pictureIdList[0] || null} name={"pictureIdList"} />
                    }
                </div>
                <div className="buttons-container">
                    {isNew ?
                        <div className="btn btn-white btn-sm w-100 mb-0 btn-save" onClick={(e) => addItem(getValues())}>Add</div>
                        : <>
                            <div className="btn btn-white btn-sm w-100 mb-0 btn-save" onClick={(e) => editItem(getValues())}>Edit</div>
                            <div className="btn btn-white btn-sm w-100 mb-0 btn-delete" onClick={(e) => deleteItem(getValues())}>Delete</div></>}
                    <div className="btn btn-white btn-sm w-100 mb-0 btn-save" onClick={(e) => setShow(!showEditor)}>{!showEditor ? "Show editor" : "Hide editor"}</div>

                </div>

            </div>
            {showEditor &&
                <div className="editor">
                    <PEditor formEls={{ handleSubmit, formState, getValues, setValue }} register={{ ...register("content") }} ref={editorRef} editorProps={{}} />
                </div>}
        </div>
    </form >
}



const root = document.getElementById("react_root");
ReactDOM.render(<PagesPage />, root);
