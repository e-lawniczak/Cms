import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { axiosBaseConfig, baseApiUrl, getCookie, testFunc } from './common';
import axios from 'axios';


interface KeyValueDto {
    id: number,
    key: string,
    value: string,

}

export const KeyValuePage = () => {
    const
        [list, setList] = useState([]),
        [addingNew, setAddingNew] = useState(false),
        getData = async () => {
            let res = await axios.get(baseApiUrl + "/GetAllKeyValueList")
            console.log(res);
            setList(res.data)
        },
        newRow = <TableRow item={{ id: -1, key: "", value: "" }} refreshFunc={getData} isNew={true} resetAdd={setAddingNew} />


    React.useEffect(() => {
        getData();
    }, [])

    return <div className="card mb-4">
        <form method="post" className="admin-form keyvalue-form" >
            <div className="form-top-container"><div className="btn btn-white btn-sm w-100 mb-0 btn-save" onClick={() => setAddingNew(true)} >Add new</div></div>
            <div className="card-body px-0 pt-0 pb-2">
                <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th style={{ width: 50 }} className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Id</th>
                                <th style={{ width: 150 }} className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Key</th>
                                <th style={{ width: 'auto' }} className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Value</th>
                                <th style={{ width: 200 }} className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addingNew && newRow}
                            {list.sort((a, b) => { return b.id - a.id }).map((l, idk) => <TableRow key={l.id} item={l} refreshFunc={getData} isNew={false} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </form>
    </div>
}
export const TableRow = (props: { item: KeyValueDto, refreshFunc: any, isNew?: boolean, resetAdd?: any }) => {
    const { item, refreshFunc, isNew = false, resetAdd } = props,
        [key, setKey] = useState(item.key),
        [value, setValue] = useState(item.value),


        editItem = async () => {
            const url = baseApiUrl + "/UpdateKeyValue"
            await axios.patch(url, { id: item.id, key: key, value: value }, axiosBaseConfig)
            refreshFunc()

        },
        addItem = async () => {
            const url = baseApiUrl + "/AddKeyValue";
            await axios.post(url, { id: -1, key: key, value: value }, axiosBaseConfig)
            refreshFunc()
            resetAdd();
        },
        deleteItem = async () => {
            const url = baseApiUrl + `/DeleteKeyValue/${item.id}`
            await axios.delete(url, axiosBaseConfig)
            refreshFunc()
        }

    return <tr>

        <td>
            <div className="d-flex px-2 py-1">
                <div>{item.id}</div>
            </div>
        </td>
        <td>
            <div className="d-flex px-2 py-1">
                <input style={{width:'100%'}} value={key} onInput={(e: any) => setKey(e.target.value)} />
            </div>
        </td>
        <td>
            <div className="d-flex px-2 py-1">
                <input style={{width:'100%'}} value={value} onInput={(e: any) => setValue(e.target.value)} />
            </div>
        </td>
        <td>
            <div className="d-flex px-2 py-1 button-col">
                {isNew ?
                    <div className="btn btn-white btn-sm w-100 mb-0 btn-save" onClick={addItem}>Add</div>
                    : <>
                        <div className="btn btn-white btn-sm w-100 mb-0 btn-save" onClick={editItem}>Edit</div>
                        <div className="btn btn-white btn-sm w-100 mb-0 btn-delete" onClick={deleteItem}>Delete</div></>}
            </div>
        </td>

    </tr>
}




const root = document.getElementById("react_root");
ReactDOM.render(<KeyValuePage />, root);
