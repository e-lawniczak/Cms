import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { MenuElementDto, PInput, PageSettingsSection, PageWrapper, Select, axiosBaseConfig, baseApiUrl, mapObjectToSelect } from './common';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export const MenuPage = () => {
    const
        [elements, setElements] = useState<MenuElementDto[]>(),
        [parentElements, setParentElements] = useState<MenuElementDto[]>(),
        [showNew, setNew] = useState(false),
        getMenuElements = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllMenuElementList`)
            setElements(res.data)
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
            refreshFunc()
            setShow(false)
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

const root = document.getElementById("react_root");
ReactDOM.render(<MenuPage />, root);
