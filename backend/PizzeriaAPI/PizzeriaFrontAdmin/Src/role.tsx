import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { PageWrapper } from './common';
import axios from 'axios';

export const RolePage = () => {
    const
        [data, setData] = useState([])



    React.useEffect(() => {
    }, [])

    return <PageWrapper></PageWrapper>
}


const root = document.getElementById("react_root");
ReactDOM.render(<RolePage />, root);