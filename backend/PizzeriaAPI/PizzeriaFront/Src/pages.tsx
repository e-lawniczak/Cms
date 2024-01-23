import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';

import { PageWrapper } from './commonElements';

export const PagesPage = () => {
    const
        [data, setData] = useState([])




    React.useEffect(() => {

    }, [])
    return <PageWrapper>
        PagesPage
    </PageWrapper>
}


const root = document.getElementById("react_root");
ReactDOM.render(<PagesPage />, root);
