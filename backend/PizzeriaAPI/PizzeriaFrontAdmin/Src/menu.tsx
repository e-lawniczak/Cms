import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { CategoryDto, GalleryDto, MenuElementDto, PInput, PageDto, PageSettingsSection, PageWrapper, Select, axiosBaseConfig, baseApiUrl, mapObjectToSelect, sortFunc } from './common';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const MenuPage = () => {
    const
        [elements, setElements] = useState<MenuElementDto[]>(),
        [parentElements, setParentElements] = useState<MenuElementDto[]>(),
        [cats, setCategories] = useState<CategoryDto[]>(),
        [pages, setPages] = useState<PageDto[]>(),
        [gals, setGalleries] = useState<GalleryDto[]>(),
        [showNew, setNew] = useState(false),
        getMenuElements = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllMenuElementList`)
            setElements(res.data.sort((a: MenuElementDto, b: MenuElementDto) => sortFunc(a, b, "menuElementId")))
            setParentElements(res.data.filter((m: MenuElementDto, idx: any) => m.parentMenuElementId == null))
        },
        getCategories = async () => {
            let res = await axios.get(baseApiUrl + `/GetVisibleCategoryList`)
            setCategories(res.data)
        },
        getPages = async () => {
            let res = await axios.get(baseApiUrl + `/GetVisiblePageList`)
            setPages(res.data)
        },
        getGalleries = async () => {
            let res = await axios.get(baseApiUrl + `/GetVisibleGalleryList`)
            setGalleries(res.data)
        },
        newItem = <MenuElementRow elements={elements} parentElements={parentElements} item={null} refreshFunc={getMenuElements} isNew={true} setShow={setNew} preparedLinksData={{ cats: cats, pages: pages, gals: gals }} />


    React.useEffect(() => {
        getMenuElements()
        getCategories()
        getPages()
        getGalleries()
    }, [])

    return <PageSettingsSection title={'Menu elements'}>
        <div className="form-top-container">{!showNew && <div className="btn btn-white btn-sm mb-0 btn-save" onClick={() => setNew(true)} >Add new</div>}</div>
        <form className='section-form' >
            <div className="form-content ">
                <div className="menu-element-row row">
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>label</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>link</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>available links</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>visible</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>select parent</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>current parent</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>options</div>
                </div>
                {showNew && newItem}
                {elements && elements.map((e: MenuElementDto, idx: any) => <MenuElementRow parentElements={parentElements} elements={elements} item={e} key={idx} refreshFunc={getMenuElements} preparedLinksData={{ cats: cats, pages: pages, gals: gals }} />)}

            </div>
        </form>
    </PageSettingsSection>
}
const MenuElementRow = (props: { parentElements: any[], item: MenuElementDto, preparedLinksData: { cats: any, gals: any, pages: any }, elements: any, isNew?: boolean, refreshFunc: any, setShow?: any }) => {
    const
        { item, parentElements, isNew = false, refreshFunc, elements, preparedLinksData: { cats, gals, pages }, setShow = () => { } } = props,
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
        },
        setLinkOnSelect = (e: any) => {
            if (e.target.value == "#") {
                setValue("link", "#")
                return
            }
            let type = e.target.value.split("_")[0]
            let v = e.target.value.split("_")[1]
            let linkToSet = ""
            switch (type) {
                case "cat":
                    linkToSet = `/Categories/${v}`
                    break;
                case "gal":
                    linkToSet = `/Gallery/${v}`
                    break;
                default:
                    linkToSet = `/Pages/${v}`
                    break;
            }
            setValue("link", linkToSet)
        }


    let parentData = mapObjectToSelect(parentElements, "text", "menuElementId").filter((i: any) => i.value != item?.menuElementId)
    let linkData = mapObjectToSelect(cats, "name", "name", "cat").concat(mapObjectToSelect(pages, "title", "title", "page")).concat(mapObjectToSelect(gals, "name", "name", "gal"))
    linkData.push({ label: "no link", value: "#" })
    parentData.push({ label: "no parent", value: null })
    return <div className="menu-element-row row">
        <div className="id">{item?.menuElementId || -1}</div>
        <PInput register={{ ...register("text") }} inputProps={{ type: 'text' }} />
        <PInput register={{ ...register("link") }} inputProps={{ type: 'text' }} />
        <div>
            {parentData && parentData?.length > 0 &&
                <Select register={register} defaultValue={null} data={linkData} name={"linkSelect"} selectProps={{ onChange: setLinkOnSelect }} />}
        </div>
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
