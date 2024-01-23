import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { ContactInfoDto, PInput, PageWrapper, PictureDto, RoleDto, Select, axiosBaseConfig, baseApiUrl, mapObjectToSelect, sortFunc } from './common';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export const RolePage = () => {
    const
        [data, setData] = useState([]),
        [showNew, setNew] = useState(false),
        [roles, setRoles] = useState<RoleDto[]>(),
        [pictures, setPictures] = useState<PictureDto[]>(),
        getRoles = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllRoleList`, axiosBaseConfig)
            setRoles(res.data.sort((a: any, b: any) => sortFunc(a, b)))
        },
        getpictures = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllPictureList`, axiosBaseConfig)
            setPictures(res.data)
        },

        addNew = <RoleRow item={null} isNew={true} roles={roles} pictures={pictures} refreshFunc={getRoles} showFunc={setNew} />





    React.useEffect(() => {
        getRoles()
        getpictures()
    }, [])
    return <div className='card mb-4' >
        <div className="form-top-container">{!showNew && <div className="btn btn-white btn-sm mb-0 btn-save" onClick={() => setNew(true)} >Add new</div>}</div>
        <div className="generic-list">
            <div className="role-row row">
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>name</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>visible</div>
                <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>options</div>
            </div>
            {showNew && addNew}
            {roles && roles.map((item: RoleDto, idx: any) => <RoleRow pictures={pictures} key={idx} item={item} isNew={false} roles={roles} refreshFunc={getRoles} />)}
        </div>
    </div>
}
const RoleRow = (props: { item: RoleDto, isNew: boolean, pictures: any, roles: any[], refreshFunc: any, showFunc?: any }) => {
    const
        { item, isNew, roles = [], refreshFunc, showFunc, pictures } = props,
        rolesData = mapObjectToSelect(roles, "name", "roleId"),
        picturesData = mapObjectToSelect(pictures, "name", "pictureId"),
        [pickedBanners, setPickedBanners] = useState([]),
        { register, handleSubmit, formState, getValues } = useForm({
            defaultValues: { ...item }
        }),
        makeItem = (data: any) => {
            return {
                roleId: item?.roleId || -1,
                isVisible: data?.isVisible || false,
                name: data?.name || "",
                teamMemberIdList: item?.teamMemberIdList || [],
                testimonialIdList: item?.testimonialIdList || [],
            } as RoleDto
        },
        addItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/AddRole";
            await axios.post(url, item, axiosBaseConfig)
            refreshFunc()
            showFunc(false)
            location.reload()
        },
        deleteItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/DeleteRole/" + item.roleId;
            await axios.delete(url, axiosBaseConfig)
            refreshFunc()
        },
        editItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/UpdateRole";
            await axios.patch(url, item, axiosBaseConfig)
            refreshFunc()
        }

    return <form className='' >
        <div className="form-content ">
            <div className="role-row row">
                <div className="id">{item?.roleId || -1}</div>
                <PInput register={{ ...register("name") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("isVisible") }} inputProps={{ type: 'checkbox' }} />

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
ReactDOM.render(<RolePage />, root);
