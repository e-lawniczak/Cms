import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as ReactDOM from 'react-dom';

import { PInput, axiosBaseConfig, baseApiUrl, Image, getCookie, testFunc, PictureDto, PictureListElement } from './common';
import { PageWrapper } from './common';
import axios from 'axios';


export const PicturesPage = () => {
    const
        { register, handleSubmit } = useForm(),
        [data, setData] = useState([]),
        [showUpload, setUpload] = useState(false),
        getData = async () => {
            let res = await axios.get(baseApiUrl + "/GetAllPictureList", axiosBaseConfig)
            console.log(res);
            setData(res.data)
        },
        onSubmit = async (data: any) => {
            if (data.fileUpload && data.fileUpload.length > 0) {
                let arr = data.fileUpload
                for (let i = 0; i < arr.length; i++) {
                    let form = new FormData()
                    form.append("Name", arr[i].name)
                    form.append("Link", "")
                    form.append("Picture", arr[i])
                    let req = await axios.post(baseApiUrl + "/AddPicture", form, axiosBaseConfig)
                    console.log(req);
                }
            }
        },
        deletePicture = (item: PictureDto) => {

        },
        pictureUpload = <div className="picture-upload">
            <form className='file-upload-form' onSubmit={handleSubmit(onSubmit)}>
                <PInput register={{ ...register("fileUpload") }} inputProps={{ type: 'file', multiple: true }} />
                <button className='btn btn-white btn-sm mb-0 btn-save' type='submit'>Add</button>
            </form>
        </div>


    React.useEffect(() => {
        getData();
    }, [])

    return <PageWrapper>
        <div className="card mb-4">
            <div className="form-top-container">{!showUpload && <div className="btn btn-white btn-sm mb-0 btn-save" onClick={() => setUpload(true)} >Add new</div>}</div>
            {showUpload && pictureUpload}
            <div className="picture-list">
                {data.map((d: PictureDto, idx) => <div className='picture-container' onClick={() => { deletePicture(d) }}><div className='overlay'><div className="">X</div></div> <PictureListElement key={idx} item={d} /><div>{d.name}</div></div>)}
            </div>
        </div>
    </PageWrapper>
}







const root = document.getElementById("react_root");
ReactDOM.render(<PicturesPage />, root);
