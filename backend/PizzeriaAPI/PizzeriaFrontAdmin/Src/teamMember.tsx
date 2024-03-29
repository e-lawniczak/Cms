import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { PInput, PageWrapper, PictureDto, RoleDto, Select, SocialMediaDto, TeamMemberDto, axiosBaseConfig, baseApiUrl, mapObjectToSelect } from './common';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export const TeamMemberPage = () => {
    const
        [socialMedia, setSocialMedia] = useState<SocialMediaDto[]>(),
        [pictures, setPictures] = useState<PictureDto[]>(),
        [teamMembers, setTeamMembers] = useState<TeamMemberDto[]>(),
        [roles, setRoles] = useState<RoleDto[]>(),
        [showNew, setNew] = useState(false),
        [data, setData] = useState([]),
        getSocials = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllSocialMediaList`, axiosBaseConfig)
            setSocialMedia(res.data)
        },
        getpictures = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllPictureList`, axiosBaseConfig)
            setPictures(res.data)
        },
        getRoles = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllRoleList`, axiosBaseConfig)
            setRoles(res.data)
        },
        getteammembers = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllTeamMemberList`, axiosBaseConfig)
            setTeamMembers(res.data)
        },
        getData = () => {
            getRoles()
            getSocials()
            getpictures()
            getteammembers()
        },
        addNew = <TeamMemberRowRow roles={roles} item={null} isNew={true} pictures={pictures} socialMedia={socialMedia} refreshFunc={getData} />




    React.useEffect(() => {
        getData();
    }, [])

    return <PageWrapper>
        <div className="card mb-4">
            <div className="form-top-container">{!showNew && <div className="btn btn-white btn-sm mb-0 btn-save" onClick={() => setNew(true)} >Add new</div>}</div>
            <div className="socials-list">
                <div className="generic-row teammember-row row">
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>first name</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>last name</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>social media</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>role</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Visible</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>picture</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>selected socials</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>options</div>
                </div>
                {showNew && addNew}
                {teamMembers && teamMembers.map((item: TeamMemberDto, idx: any) => <TeamMemberRowRow roles={roles} key={idx} item={item} isNew={false} pictures={pictures} socialMedia={socialMedia} refreshFunc={getData} />)}
            </div>
        </div>
    </PageWrapper>
}

const TeamMemberRowRow = (props: { roles: RoleDto[], item: TeamMemberDto, isNew: boolean, pictures: any[], socialMedia: any[], refreshFunc: any }) => {
    const
        { item, isNew, pictures, socialMedia, roles, refreshFunc } = props,
        picData = mapObjectToSelect(pictures, "name", "pictureId"),
        rolesData = mapObjectToSelect(roles, "name", "roleId"),
        socialData = mapObjectToSelect(socialMedia?.filter((s: SocialMediaDto) => !s.teamMemberId), "name", "id"),
        { register, handleSubmit, formState, getValues } = useForm({
            defaultValues: { ...item }
        }),
        makeItem = (data: any) => {
            return {
                firstName: data?.firstName || "",
                id: item?.id || -1,
                isVisible: data?.isVisible || item?.isVisible || false,
                lastName: data?.lastName || "",
                pictureIdList: [data?.pictureIdList / 1] || [],
                roleId: data?.roleId || 0,
                socialMediaIdList: data?.socialMediaIdList || [],
            } as TeamMemberDto
        },
        addItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/AddTeamMember";
            await axios.post(url, item, axiosBaseConfig)
            refreshFunc()
            location.reload()

        },
        deleteItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/DeleteTeamMember/" + item.id;
            await axios.delete(url, axiosBaseConfig)
            refreshFunc()
        },
        editItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/UpdateTeamMember";
            await axios.patch(url, item, axiosBaseConfig)
            refreshFunc()
        }

    return <form className='section-form' >
        <div className="form-content ">
            <div className="generic-row teammember-row row">
                <div className="id">{item?.id || -1}</div>
                <PInput register={{ ...register("firstName") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("lastName") }} inputProps={{ type: 'text' }} />
                <div>
                    {socialData.length > 0 &&
                        <Select register={register} data={socialData} defaultValue={(item?.socialMediaIdList) || []} name={"socialMediaIdList"} selectProps={{ multiple: true }} />
                    }
                </div>
                <div className="role">
                    {rolesData.length > 0 &&
                        <Select register={register} data={rolesData} defaultValue={item?.roleId || null} name={"roleId"} />
                    }
                </div>
                <PInput register={{ ...register("isVisible") }} inputProps={{ type: 'checkbox' }} />
                <div>
                    {picData.length > 0 ?
                        <Select register={register} data={picData} defaultValue={item?.pictureIdList[0] || []} name={"pictureIdList"} />:
                        "No unassigned socials"
                    }
                </div>
                <div className='selected-socials'>
                    {socialMedia?.filter((s:SocialMediaDto) => item?.socialMediaIdList.indexOf(s.id) > -1).map((s:SocialMediaDto) => <>{s.name}; </>)}
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
ReactDOM.render(<TeamMemberPage />, root);
