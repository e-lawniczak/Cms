import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { PInput, PageWrapper, PictureDto, Select, SocialMediaDto, TeamMemberDto, axiosBaseConfig, baseApiUrl, mapObjectToSelect } from './common';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export const SocialMediaPage = () => {
    const
        [socialMedia, setSocialMedia] = useState<SocialMediaDto[]>(),
        [pictures, setPictures] = useState<PictureDto[]>(),
        [teamMembers, setTeamMembers] = useState<TeamMemberDto[]>(),
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
        getteammembers = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllPictureList`, axiosBaseConfig)
            setTeamMembers(res.data)
        },
        addNew = <SocialMediaRow item={null} isNew={true} pictures={pictures} teamMembers={teamMembers} />




    React.useEffect(() => {
        getSocials()
        getpictures()
        getteammembers()
    })

    React.useEffect(() => {
    }, [])

    return <PageWrapper>
        <div className="card mb-4">
            <div className="form-top-container">{!showNew && <div className="btn btn-white btn-sm mb-0 btn-save" onClick={() => setNew(true)} >Add new</div>}</div>
            <div className="socials-list">
                <div className="row">
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>name</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>link</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>team member</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>visible</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>picture</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>options</div>
                </div>
                {showNew && addNew}
                {socialMedia && socialMedia.map((item: SocialMediaDto, idx: any) => <SocialMediaRow key={idx} item={item} isNew={false} pictures={pictures} teamMembers={teamMembers} />)}
            </div>
        </div>
    </PageWrapper>
}

const SocialMediaRow = (props: { item: SocialMediaDto, isNew: boolean, pictures: any[], teamMembers: any[] }) => {
    const
        { item, isNew, pictures, teamMembers } = props,
        picData = mapObjectToSelect(pictures, "name", "pictureId"),
        teamMemberData = mapObjectToSelect(teamMembers, "firstName", "id"),
        { register, handleSubmit } = useForm({
            defaultValues: { ...item }
        }),
        addItem = (data: any) => {

        },
        deleteItem = (data: any) => {

        },
        editItem = (data: any) => {

        }

    return <form className='section-form' >
        <div className="form-content ">
            <div className="social-row row">
                <div className="id">{item.id}</div>
                <PInput register={{ ...register("name") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("link") }} inputProps={{ type: 'text' }} />
                {teamMemberData.length > 0 &&
                    <Select register={register} data={teamMemberData} name={"teamMemberId"} />
                }
                <PInput register={{ ...register("isMain") }} inputProps={{ type: 'checkbox' }} />
                <PInput register={{ ...register("isVisible") }} inputProps={{ type: 'checkbox' }} />
                {picData.length > 0 &&
                    <Select register={register} data={picData} name={"selectedPicture"} />
                }
                <div className="buttons-container">
                    {isNew ?
                        <div className="btn btn-white btn-sm w-100 mb-0 btn-save" onClick={(e) => handleSubmit((data: any) => addItem(data))}>Add</div>
                        : <>
                            <div className="btn btn-white btn-sm w-100 mb-0 btn-save" onClick={(e) => handleSubmit((data: any) => editItem(data))}>Edit</div>
                            <div className="btn btn-white btn-sm w-100 mb-0 btn-delete" onClick={(e) => handleSubmit((data: any) => deleteItem(data))}>Delete</div></>}
                </div>
            </div>
        </div>
    </form>
}

const root = document.getElementById("react_root");
ReactDOM.render(<SocialMediaPage />, root);
