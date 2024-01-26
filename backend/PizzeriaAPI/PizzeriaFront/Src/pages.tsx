import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';

import { PageWrapper } from './commonElements';
import { KeyValueDto, PageDto, baseApiUrl, getPictureUrlFromList } from './common';
import axios from 'axios';

export const PagesPage = () => {
    const
        [data, setData] = useState([]),
        [page, setPage] = useState<PageDto>(),
        getPages = async () => {
            let res = await axios.get(baseApiUrl + "/GetVisiblePageList")
            let p = res.data.filter((p: PageDto) => p.title == location.pathname.split("/")[location.pathname.split("/").length - 1])
            if (p?.length == 0) location.href = "/Error"
            setPage(p[0])
        }





    React.useEffect(() => {
        getPages()
    }, [])
    return <PageWrapper>
        <BannerSection page={page} />
        <div className='page-content-simple' dangerouslySetInnerHTML={{ __html: page?.content }}></div> 
    </PageWrapper>
}

const BannerSection = (props: { page: PageDto }) => {
    const
        { page } = props



    return <section className="bg-gray-7">
        <div className="breadcrumbs-custom box-transform-wrap context-dark">
            <div className="container">
                <h3 className="breadcrumbs-custom-title">{page?.title || ""}</h3>
                <div className="breadcrumbs-custom-decor"></div>
            </div>
            <div className="box-transform" style={{ backgroundImage: `url(${getPictureUrlFromList(page?.pictureIdList)[0]})` }}></div>
        </div>
        <div className="container">
            <ul className="breadcrumbs-custom-path">
                <li><a href="/">Home</a></li>
                <li className="active">{page?.title || ""}</li>
            </ul>
        </div>
    </section>
}

const root = document.getElementById("react_root");
ReactDOM.render(<PagesPage />, root);
