import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import { PageWrapper } from './common';


export const PagesPage = () => {
    const
        [data, setData] = useState([])



    React.useEffect(() => {
    }, [])

    return <PageWrapper></PageWrapper>
}


const root = document.getElementById("react_root");
ReactDOM.render(<PagesPage />, root);
