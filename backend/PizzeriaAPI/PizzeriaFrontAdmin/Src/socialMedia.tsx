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
            console.log("Xd");
            setSocialMedia(res.data)
        },
        getpictures = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllPictureList`, axiosBaseConfig)
            setPictures(res.data)
        },

        getData = async () => {
            await getSocials()
            await getpictures()
        },
        addNew = <SocialMediaRow item={null} isNew={true} pictures={pictures} refreshFunc={getData} setNew={setNew} />




    React.useEffect(() => {
        getSocials()
        getpictures()
    }, [])

    return <PageWrapper>
        <div className="card mb-4">
            <div className="form-top-container">{!showNew && <div className="btn btn-white btn-sm mb-0 btn-save" onClick={() => setNew(true)} >Add new</div>}</div>
            <div className="socials-list">
                <div className="social-row row">
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>name</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>link</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>main</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>visible</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>picture</div>
                    <div className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>options</div>
                </div>
                {showNew && addNew}
                {socialMedia && socialMedia.map((item: SocialMediaDto, idx: any) => <SocialMediaRow key={idx} item={item} isNew={false} pictures={pictures} refreshFunc={getData} />)}
            </div>
        </div>
    </PageWrapper>
}

const SocialMediaRow = (props: { item: SocialMediaDto, isNew: boolean, setNew?: any, pictures: any[], refreshFunc: any }) => {
    const
        { item, isNew, pictures, refreshFunc, setNew } = props,
        picData = mapObjectToSelect(pictures, "name", "pictureId"),
        { register, handleSubmit, formState, getValues } = useForm({
            defaultValues: { ...item }
        }),
        makeItem = (data: any) => {
            return {
                id: item?.id || -1,
                isMain: data?.isMain || false,
                isVisible: data?.isVisible || false,
                link: data?.link || "",
                name: data?.name || "",
                pictureIdList: data?.pictureIdList ? [data.pictureIdList / 1] : [],
                teamMemberId: item?.teamMemberId || 0,

            } as SocialMediaDto
        },
        addItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/AddSocialMedia";
            await axios.post(url, item, axiosBaseConfig)
            refreshFunc()
            setNew(false)
        },
        deleteItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/DeleteSocialMedia/" + item.id;
            await axios.delete(url, axiosBaseConfig)
            refreshFunc()
        },
        editItem = async (data: any) => {
            let item = makeItem(data)
            const url = baseApiUrl + "/UpdateSocialMedia";
            await axios.patch(url, item, axiosBaseConfig)
            refreshFunc()
        }

    return <form className='section-form' >
        <div className="form-content ">
            <div className="social-row row">
                <div className="id">{item?.id || -1}</div>
                <PInput register={{ ...register("name") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("link") }} inputProps={{ type: 'text' }} />
                <PInput register={{ ...register("isMain") }} inputProps={{ type: 'checkbox' }} />
                <PInput register={{ ...register("isVisible") }} inputProps={{ type: 'checkbox' }} />
                <div>
                    {picData.length > 0 &&
                        <Select register={register} data={picData} defaultValue={item?.pictureIdList[0] || []} name={"pictureIdList"} />
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
ReactDOM.render(<SocialMediaPage />, root);
