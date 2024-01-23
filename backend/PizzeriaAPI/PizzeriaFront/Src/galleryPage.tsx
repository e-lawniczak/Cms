import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';

import { PageWrapper } from './commonElements';

export const MainPage = () => {
    const
        [data, setData] = useState([])




    React.useEffect(() => {

    }, [])
    return <PageWrapper>
        GalleryPage
    </PageWrapper>
}


const root = document.getElementById("react_root");
ReactDOM.render(<MainPage />, root);
