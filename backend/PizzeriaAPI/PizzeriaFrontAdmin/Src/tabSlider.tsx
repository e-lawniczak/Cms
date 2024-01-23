import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { CategoryDto, InformationTabDto, PInput, PageWrapper, PictureDto, Select, TabSliderDto, axiosBaseConfig, baseApiUrl, mapObjectToSelect, sortFunc } from './common';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export const TabSliderPage = () => {
    const
        [data, setData] = useState([]),
        [showNew, setNew] = useState(false),
        [tabs, setTabs] = useState<InformationTabDto[]>(),
        [tabSliders, setTabSliders] = useState<TabSliderDto[]>(),
        [pictures, setPictures] = useState<PictureDto[]>(),
        getTabs = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllInformationTabList`, axiosBaseConfig)
            setTabs(res.data.sort((a: any, b: any) => sortFunc(a, b)))
        },
        getTabSliders = async () => {
            let res = await axios.get(baseApiUrl + `/GetVisibleTabSliderList`, axiosBaseConfig)
            setTabSliders(res.data.sort((a: any, b: any) => sortFunc(a, b)))
        },
        getpictures = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllPictureList`, axiosBaseConfig)
            setPictures(res.data)
        },

        addNew = <TabSliderRow pictures={pictures} tabSliders={tabSliders} item={null} isNew={true} tabs={tabs} refreshFunc={getTabSliders} showFunc={setNew} />





    React.useEffect(() => {
        getTabs()
        getTabSliders()
        getpictures()
    }, [])
    return <div className='card mb-4' >
        <div className="form-top-container">{!showNew && <div className="btn btn-white btn-sm mb-0 btn-save" onClick={() => setNew(true)} >Add new</div>}</div>
        <div className="generic-list">
            <div className="tab-slider-row row">
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>title</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>visible</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>picture</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>information tabs</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>options</div>
            </div>
            {showNew && addNew}
            {tabSliders && tabSliders.map((item: TabSliderDto, idx: any) => <TabSliderRow pictures={pictures} key={idx} tabSliders={tabSliders} item={item} isNew={false} tabs={tabs} refreshFunc={getTabSliders} />)}
        </div>
    </div>
}
const TabSliderRow = (props: { item: TabSliderDto, isNew: boolean, pictures: any, tabs: InformationTabDto[], tabSliders: any, refreshFunc: any, showFunc?: any }) => {
    const
        { item, isNew, tabs = [], refreshFunc, tabSliders, showFunc, pictures } = props,
        tabSlidersData = mapObjectToSelect(tabSliders, "title", "id"),
        picturesData = mapObjectToSelect(pictures, "name", "pictureId"),
        { register, handleSubmit, formState, getValues } = useForm({
            defaultValues: { ...item }
        }),
        makeItem = (data: any) => {
            return {
                id: item?.id || -1,
                informationTabIdList: item?.informationTabIdList || [],
                isVisible: data?.isVisible || false,
                pictureIdList: [data?.pictureIdList/1] || [],
                title: data?.title || "",
            } as TabSliderDto
        },
        addItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/AddTabSlider";
            await axios.post(url, item, axiosBaseConfig)
            refreshFunc()
            showFunc(false)
            location.reload()
        },
        deleteItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/DeleteTabSlider/" + item.id;
            await axios.delete(url, axiosBaseConfig)
            refreshFunc()
        },
        editItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/UpdateTabSlider";
            await axios.patch(url, item, axiosBaseConfig)
            refreshFunc()
        }

    return <form className='' >
        <div className="form-content ">
            <div className="tab-slider-row row">
                <div className="id">{item?.id || -1}</div>
                <PInput register={{ ...register("title") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("isVisible") }} inputProps={{ type: 'checkbox' }} />
                <div>
                    {picturesData.length > 0 &&
                        <Select register={register} data={picturesData} defaultValue={item?.pictureIdList[0] || null} name={"pictureIdList"} />
                    }
                </div>
                <div>
                    {tabs.length > 0 &&
                        tabs?.filter((i: InformationTabDto, idx) => item?.informationTabIdList.indexOf(i.informationTabId)).map((i: InformationTabDto, idx) => <div className='tabname'>{i.title}<br /></div>)
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
ReactDOM.render(<TabSliderPage />, root);
