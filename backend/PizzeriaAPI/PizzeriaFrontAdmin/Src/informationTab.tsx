import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { CategoryDto, InformationTabDto, PEditor, PInput, PageWrapper, PictureDto, Select, TabSliderDto, axiosBaseConfig, baseApiUrl, mapObjectToSelect, sortFunc } from './common';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export const InformationTabPage = () => {
    const
        [data, setData] = useState([]),
        [showNew, setNew] = useState(false),
        [tabs, setTabs] = useState<InformationTabDto[]>(),
        [tabSliders, setTabSliders] = useState<TabSliderDto[]>(),
        getTabs = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllInformationTabList`, axiosBaseConfig)
            setTabs(res.data.sort((a: any, b: any) => sortFunc(a, b)))
        },
        getTabSliders = async () => {
            let res = await axios.get(baseApiUrl + `/GetVisibleTabSliderList`, axiosBaseConfig)
            setTabSliders(res.data.sort((a: any, b: any) => sortFunc(a, b)))
        },


        addNew = <InformationTabRow tabSliders={tabSliders} item={null} isNew={true} tabs={tabs} refreshFunc={getTabs} showFunc={setNew} />





    React.useEffect(() => {
        getTabs()
        getTabSliders()
    }, [])
    return <div className='card mb-4' >
        <div className="form-top-container">{!showNew && <div className="btn btn-white btn-sm mb-0 btn-save" onClick={() => setNew(true)} >Add new</div>}</div>
        <div className="generic-list">
            <div className="information-tab-row row">
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>title</div>
                {/* <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>text</div> */}
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>button text</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>visible</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>tab silder</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>options</div>
            </div>
            {showNew && addNew}
            {tabs && tabs.map((item: InformationTabDto, idx: any) => <InformationTabRow key={idx} tabSliders={tabSliders} item={item} isNew={false} tabs={tabs} refreshFunc={getTabs} />)}
        </div>
    </div>
}
const InformationTabRow = (props: { item: InformationTabDto, isNew: boolean, tabs: InformationTabDto[], tabSliders: any, refreshFunc: any, showFunc?: any }) => {
    const
        { item, isNew, tabs = [], refreshFunc, tabSliders, showFunc } = props,
        tabSlidersData = mapObjectToSelect(tabSliders, "title", "id"),
        [pickedBanners, setPickedBanners] = useState([]),
        [showEditor, setShow] = useState(false),
        { register, handleSubmit, formState, getValues, setValue } = useForm({
            defaultValues: { ...item }
        }),
        makeItem = (data: any) => {
            return {
                informationTabId: item?.informationTabId >= 0 ? item?.informationTabId : -1,
                buttonText: data?.buttonText || "",
                isVisible: data?.isVisible || false,
                tabSliderId: data?.tabSliderId || item?.tabSliderId || 0,
                text: data?.text || "",
                title: data?.title || "",
            } as InformationTabDto
        },
        addItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/AddInformationTab";
            await axios.post(url, item, axiosBaseConfig)
            refreshFunc()
            showFunc(false)
            location.reload()
        },
        deleteItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/DeleteInformationTab/" + item.informationTabId;
            await axios.delete(url, axiosBaseConfig)
            refreshFunc()
        },
        editItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/UpdateInformationTab";
            await axios.patch(url, item, axiosBaseConfig)
            refreshFunc()
        }

    return <form className='' >
        <div className="form-content ">
            <div className="information-tab-row row">
                <div className="id">{item?.informationTabId >= 0 ? item?.informationTabId : -1}</div>
                <PInput register={{ ...register("title") }} inputProps={{ type: 'text' }} />
                {/* <PInput register={{ ...register("text") }} inputProps={{ type: 'text' }} /> */}
                <PInput register={{ ...register("buttonText") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("isVisible") }} inputProps={{ type: 'checkbox' }} />
                <div>
                    {tabSlidersData.length > 0 &&
                        <Select register={register} data={tabSlidersData} defaultValue={item?.tabSliderId || null} name={"tabSliderId"} />
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
                    <PEditor formEls={{ getValues, setValue }} controlname={"text"} register={{ ...register("text") }} editorProps={{}} />
                </div>}
        </div>
    </form>
}

const root = document.getElementById("react_root");
ReactDOM.render(<InformationTabPage />, root);
