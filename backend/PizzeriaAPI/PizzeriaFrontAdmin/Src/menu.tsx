import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';


export const MenuPage = () => {
    const
        [data, setData] = useState([])



    React.useEffect(() => {
    }, [])

    return <></>
}


const root = document.getElementById("react_root");
ReactDOM.render(<MenuPage />, root);
