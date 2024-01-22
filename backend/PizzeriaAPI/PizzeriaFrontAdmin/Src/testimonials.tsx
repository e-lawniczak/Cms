import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { CategoryDto, PInput, PageWrapper, PictureDto, RoleDto, Select, TestimonialDto, axiosBaseConfig, baseApiUrl, mapObjectToSelect, sortFunc } from './common';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export const TestimonialPage = () => {
    const
        [data, setData] = useState([]),
        [showNew, setNew] = useState(false),
        [testimonials, setTestimonials] = useState<TestimonialDto[]>(),
        [roles, setRoles] = useState<RoleDto[]>(),
        [pictures, setPictures] = useState<PictureDto[]>(),
        getTestimonials = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllTestimonialList`, axiosBaseConfig)
            setTestimonials(res.data.sort((a: any, b: any) => sortFunc(a, b)))
        },
        getpictures = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllPictureList`, axiosBaseConfig)
            setPictures(res.data)
        },

        addNew = <TestimonialRow item={null} isNew={true} roles={roles} pictures={pictures} refreshFunc={getTestimonials} showFunc={setNew} />





    React.useEffect(() => {
        getTestimonials()
        getpictures()
    }, [])
    return <div className='card mb-4' >
        <div className="form-top-container">{!showNew && <div className="btn btn-white btn-sm mb-0 btn-save" onClick={() => setNew(true)} >Add new</div>}</div>
        <div className="generic-list">
            <div className="testimonial-row row">
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>first name</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>last name</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>text</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>visible</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>role</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>picture</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>options</div>
            </div>
            {showNew && addNew}
            {testimonials && testimonials.map((item: TestimonialDto, idx: any) => <TestimonialRow pictures={pictures} key={idx} item={item} isNew={false} roles={roles} refreshFunc={getTestimonials} />)}
        </div>
    </div>
}
const TestimonialRow = (props: { item: TestimonialDto, isNew: boolean, pictures: any, roles: any[], refreshFunc: any, showFunc?: any }) => {
    const
        { item, isNew, roles = [], refreshFunc, showFunc, pictures } = props,
        rolesData = mapObjectToSelect(roles, "name", "id"),
        picturesData = mapObjectToSelect(pictures, "name", "pictureId"),
        { register, handleSubmit, formState, getValues } = useForm({
            defaultValues: { ...item }
        }),
        makeItem = (data: any) => {
            return {
                id: item?.id || -1,
                isVisible: data?.isVisible || false,
                pictureIdList: [data?.pictureIdList / 1] || [],
                firstName: data?.firstName || "",
                lastName: data?.lastName || "",
                roleId: data?.roleId || 0,
                text: data?.text || "",
            } as TestimonialDto
        },
        addItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/AddTestimonial";
            await axios.post(url, item, axiosBaseConfig)
            refreshFunc()
            showFunc(false)
            location.reload()
        },
        deleteItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/DeleteTestimonial/" + item.id;
            await axios.delete(url, axiosBaseConfig)
            refreshFunc()
        },
        editItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/UpdateTestimonial";
            await axios.patch(url, item, axiosBaseConfig)
            refreshFunc()
        }

    return <form className='' >
        <div className="form-content ">
            <div className="testimonial-row row">
                <div className="id">{item?.id || -1}</div>
                <PInput register={{ ...register("firstName") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("lastName") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("text") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("isVisible") }} inputProps={{ type: 'checkbox' }} />
                <div>
                    {rolesData.length > 0 &&
                        <Select register={register} data={rolesData} defaultValue={item?.roleId || null} name={"roleId"} />
                    }
                </div>
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
ReactDOM.render(<TestimonialPage />, root);
