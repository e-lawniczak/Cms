import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { PageWrapper } from './common';
import axios from 'axios';

export const HomePage = () => {
    const
        [data, setData] = useState([])



    React.useEffect(() => {
    }, [])

    return <PageWrapper>
        
    </PageWrapper>
}

export const PageSettingsSection = () =>{
    return <section className="settings-section">

    </section>
}

const root = document.getElementById("react_root");
ReactDOM.render(<HomePage />, root);
