import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as ReactDOM from 'react-dom';

import { PInput, axiosBaseConfig, baseApiUrl, Image, getCookie, testFunc } from './common';
import axios from 'axios';


interface PictureDto {
    pictureId: any
    name: any
    link: any
    filePath: any
    resizedFilePath: any
    entityWithPictureIdList: any[]

}

export const PicturesPage = () => {
    const
        { register, handleSubmit } = useForm(),
        [data, setData] = useState([]),
        [showUpload, setUpload] = useState(false),
        getData = async () => {
            let res = await axios.get(baseApiUrl + "/GetAllPictureList")
            console.log(res);
            setData(res.data)
        },
        onSubmit = (data: any) => {
            if (data.fileUpload && data.fileUpload.length > 0)
                data.fileUpload.forEach(async (i:any) => {
                    let form = new FormData()
                    form.append("Name", i.name)
                    form.append("Picture", i)
                    let req = await axios.post(baseApiUrl + "/AddPicture", form)
                    console.log(req);
                })
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

    return <>
        <div className="card mb-4">
            <div className="form-top-container">{!showUpload && <div className="btn btn-white btn-sm mb-0 btn-save" onClick={() => setUpload(true)} >Add new</div>}</div>
            {showUpload && pictureUpload}
            <div className="picture-list">
                {data.map((d: PictureDto, idx) => <PictureListElement key={idx} item={d} />)}
            </div>
        </div>
    </>
}

const PictureListElement = (props: { item: PictureDto, [x: string]: any }) => {
    const { item } = props;
    return <div className='picture-list-element'>
        <Image src={item.link} />
    </div>
}





const root = document.getElementById("react_root");
ReactDOM.render(<PicturesPage />, root);
