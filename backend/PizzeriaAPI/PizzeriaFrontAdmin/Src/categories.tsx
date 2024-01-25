import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import { CategoryDto, PInput, PageWrapper, PictureDto, Select, SliderDto, axiosBaseConfig, baseApiUrl, mapObjectToSelect, sortFunc } from './common';
import { useForm } from 'react-hook-form';


export const CategoriesPage = () => {
    const
        [data, setData] = useState([]),
        [showNew, setNew] = useState(false),
        [categories, setCategories] = useState<CategoryDto[]>(),
        [pictures, setPictures] = useState<PictureDto[]>(),
        getCategories = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllCategoryList`, axiosBaseConfig)
            setCategories(res.data.sort((a: any, b: any) => sortFunc(a, b)))
        },
        getpictures = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllPictureList`, axiosBaseConfig)
            setPictures(res.data)
        },

        addNew = <CategoryRow item={null} isNew={true} categories={categories} pictures={pictures} refreshFunc={getCategories} showFunc={setNew} />





    React.useEffect(() => {
        getCategories()
        getpictures()
    }, [])
    return <div className='card mb-4' >
        <div className="form-top-container">{!showNew && <div className="btn btn-white btn-sm mb-0 btn-save" onClick={() => setNew(true)} >Add new</div>}</div>
        <div className="generic-list">
            <div className="category-row row">
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>name</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>link</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>visible</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>picture</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>selected picture</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>options</div>
            </div>
            {showNew && addNew}
            {categories && categories.map((item: CategoryDto, idx: any) => <CategoryRow pictures={pictures} key={idx} item={item} isNew={false} categories={categories} refreshFunc={getCategories} />)}
        </div>
    </div>
}
const CategoryRow = (props: { item: CategoryDto, isNew: boolean, pictures: any, categories: any[], refreshFunc: any, showFunc?: any }) => {
    const
        { item, isNew, categories = [], refreshFunc, showFunc, pictures } = props,
        categoriesData = mapObjectToSelect(categories, "name", "id"),
        picturesData = mapObjectToSelect(pictures, "name", "pictureId"),
        [pickedBanners, setPickedBanners] = useState([]),
        { register, handleSubmit, formState, getValues } = useForm({
            defaultValues: { ...item }
        }),
        makeItem = (data: any) => {
            return {
                id: item?.id || -1,
                isVisible: data?.isVisible || false,
                link: data?.link || "",
                name: data?.name || "",
                pictureIdList: data?.pictureIdList ? [data?.pictureIdList / 1] : [],
                productIdList: item?.productIdList || []
            } as CategoryDto
        },
        addItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/AddCategory";
            await axios.post(url, item, axiosBaseConfig)
            refreshFunc()
            showFunc(false)
            location.reload()
        },
        deleteItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/DeleteCategory/" + item.id;
            await axios.delete(url, axiosBaseConfig)
            refreshFunc()
        },
        editItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/UpdateCategory";
            await axios.patch(url, item, axiosBaseConfig)
            refreshFunc()
        }

    return <form className='' >
        <div className="form-content ">
            <div className="category-row row">
                <div className="id">{item?.id || -1}</div>
                <PInput register={{ ...register("name") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("link") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("isVisible") }} inputProps={{ type: 'checkbox' }} />
                <div>
                    {picturesData.length > 0 &&
                        <Select register={register} data={picturesData} defaultValue={item?.pictureIdList[0] || null} name={"pictureIdList"} />
                    }
                </div>
                <div>
                    {picturesData.length > 0 &&
                        picturesData.filter((i: any) => i.value == item?.pictureIdList[0])[0]?.label
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
ReactDOM.render(<CategoriesPage />, root);
