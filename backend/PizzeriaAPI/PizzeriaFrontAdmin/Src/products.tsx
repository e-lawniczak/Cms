import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { CategoryDto, PInput, PTextarea, PageWrapper, PictureDto, ProductDto, Select, axiosBaseConfig, baseApiUrl, mapObjectToSelect, sortFunc } from './common';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export const ProductsPage = () => {
    const
        [data, setData] = useState([]),
        [showNew, setNew] = useState(false),
        [categories, setCategories] = useState<CategoryDto[]>(),
        [products, setProducts] = useState<ProductDto[]>(),
        [pictures, setPictures] = useState<PictureDto[]>(),
        getCategories = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllCategoryList`, axiosBaseConfig)
            setCategories(res.data.sort((a: any, b: any) => sortFunc(a, b)))
        },
        getProducts = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllProductList`, axiosBaseConfig)
            setProducts(res.data.sort((a: any, b: any) => sortFunc(a, b)))
        },
        getpictures = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllPictureList`, axiosBaseConfig)
            setPictures(res.data)
        },

        addNew = <ProductRow item={null} isNew={true} categories={categories} pictures={pictures} refreshFunc={getCategories} showFunc={setNew} />





    React.useEffect(() => {
        getProducts()
        getCategories()
        getpictures()
    }, [])
    return <div className='card mb-4' >
        <div className="form-top-container">{!showNew && <div className="btn btn-white btn-sm mb-0 btn-save" onClick={() => setNew(true)} >Add new</div>}</div>
        <div className="generic-list">
            <div className="product-row row">
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>name</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>price (PLN) </div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>discounted price (PLN)</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>description</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>score</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>recommend</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>visible</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>category</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>picture</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>options</div>
            </div>
            {showNew && addNew}
            {products && products.map((item: ProductDto, idx: any) => <ProductRow pictures={pictures} key={idx} item={item} isNew={false} categories={categories} refreshFunc={getCategories} />)}
        </div>
    </div>
}
const ProductRow = (props: { item: ProductDto, isNew: boolean, pictures: PictureDto[], categories: CategoryDto[], refreshFunc: any, showFunc?: any }) => {
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
                categoryId: data?.categoryId || null,
                description: data?.description || "",
                discountPrice: data?.discountPrice || 0,
                isRecommended: data?.isRecommended || false,
                isVisible: data?.isVisible || false,
                name: data?.name || "",
                pictureIdList:  data?.pictureIdList ? [data?.pictureIdList / 1] : [],
                price: data?.price || 0,
                score: data?.score || 0,
            } as ProductDto
        },
        addItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/AddProduct";
            await axios.post(url, item, axiosBaseConfig)
            refreshFunc()
            showFunc(false)
            location.reload()
        },
        deleteItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/DeleteProduct/" + item.id;
            await axios.delete(url, axiosBaseConfig)
            refreshFunc()
        },
        editItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/UpdateProduct";
            await axios.patch(url, item, axiosBaseConfig)
            refreshFunc()
        }

    return <form className='' >
        <div className="form-content ">
            <div className="product-row row">
                <div className="id">{item?.id || -1}</div>
                <PInput register={{ ...register("name") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("price") }} inputProps={{ type: 'number', min: 0 }} />
                <PInput register={{ ...register("discountPrice") }} inputProps={{ type: 'number', min: 0 }} />
                <PTextarea register={{ ...register("description") }} inputProps={{ style:{height:'80px'}, type: 'text' }} />
                <PInput register={{ ...register("score") }} inputProps={{ type: 'number', min: 0, max: 5 }} />
                <PInput register={{ ...register("isRecommended") }} inputProps={{ type: 'checkbox' }} />
                <PInput register={{ ...register("isVisible") }} inputProps={{ type: 'checkbox' }} />
                <div>
                    {categoriesData.length > 0 &&
                        <Select register={register} data={categoriesData} defaultValue={item?.categoryId || null} name={"categoryId"} />
                    }
                </div>
                {/* <div>
                    {categoriesData.length > 0 &&
                        categoriesData.filter((i: any) => i.value == item?.categoryId)[0]?.label
                    }
                </div> */}
                <div>
                    {picturesData.length > 0 &&
                        <Select register={register} data={picturesData} defaultValue={item?.pictureIdList[0] || null} name={"pictureIdList"} />
                    }
                </div>
                {/* <div>
                    {picturesData.length > 0 &&
                        picturesData.filter((i: any) => i.value == item?.pictureIdList[0])[0]?.label
                    }
                </div> */}
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
ReactDOM.render(<ProductsPage />, root);
