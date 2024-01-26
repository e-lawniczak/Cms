import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';

import { PageWrapper } from './commonElements';
import axios from 'axios';
import { ProductDto, baseApiUrl, getPictureUrlFromList, PageDto, CategoryDto, PictureListElement, PictureDto, GalleryDto, Image } from './common';

export const MainPage = () => {
    const
        [data, setData] = useState([])


    return <PageWrapper>
        <BannerSection />
        <ProductsList />
    </PageWrapper>
}
const ProductsList = () => {
    const
        [galleryObj, setGallery] = useState<GalleryDto>(),
        [preview, setPreview] = useState(false),
        [previewImg, setPreviewImg] = useState(""),
        gallery = location.pathname.split("/")[location.pathname.split("/").length - 1],
        getProducts = async () => {
            let res = await axios.get(baseApiUrl + `/GetGallery/${gallery}`)
            setGallery(res.data)
        },
        onPictureClick = (path: string) => {
            let fullSrc = path.split("/")
            fullSrc[fullSrc.length - 2] = "Full"
            let src = fullSrc.join("/")
            setPreview(true)
            setPreviewImg(src)
        }
    React.useEffect(() => {
        getProducts()
    }, [])
    return <>
        <div className="gallery-picture-list">
            {getPictureUrlFromList(galleryObj?.pictureIdList, "Mini").map((p: string) => {
                return <div onClick={() => onPictureClick(p)} className="picture-list-element">
                    <Image src={p} />
                </div>
            })}
        </div>
            {
                preview &&
                <div onClick={() => setPreview(false)} className="image-preview">
                    <Image src={previewImg} />
                </div>
            }
    </>
}

const BannerSection = () => {
    const
        [gal, setGallery] = useState<CategoryDto>(),
        gallery = location.pathname.split("/")[location.pathname.split("/").length - 1],
        getGallery = async () => {
            let resCat = await axios.get(baseApiUrl + `/GetGallery/${gallery}`)
            if (resCat.status == 200) {
                setGallery(resCat.data)
            } else {
                location.href = "/Error"
            }
        }


    React.useEffect(() => {
        getGallery()
    }, [])
    return <section className="bg-gray-7">
        <div className="breadcrumbs-custom box-transform-wrap context-dark">
            <div className="container">
                <h3 className="breadcrumbs-custom-title">{gal?.name || ""}</h3>
                <div className="breadcrumbs-custom-decor"></div>
            </div>
            <div className="box-transform" style={{ backgroundImage: `url(${getPictureUrlFromList(gal?.pictureIdList)[0]})` }}></div>
        </div>
        <div className="container">
            <ul className="breadcrumbs-custom-path">
                <li><a href="/">Home</a></li>
                <li className="active">{gal?.name || ""}</li>
            </ul>
        </div>
    </section>
}



const root = document.getElementById("react_root");
ReactDOM.render(<MainPage />, root);
