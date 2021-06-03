import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";

import {
    // RecoilRoot,
    atom,
    // selector,
    useRecoilState, useRecoilValue,
    // useRecoilValue,
    // useSetRecoilState,
  } from 'recoil';

  import {apiKeyState} from '../../App'
  import {reRender} from '../todolist'

const dataState = atom({
    key: 'dataState',
    default: 'no data'
})



const Test = () => {
    let { id: itemId } = useParams()
    // let { path, url } = useRouteMatch();
    const [data, setData] = useRecoilState(dataState)
    const [title, setTitle] = useState(data.title)
    const apiKey = useRecoilValue(apiKeyState)
    const [render, setRender] = useRecoilState(reRender)

    function editItemText({target: {value}}) {
        console.log('editin')
        setTitle(value)
    }

    function submitChange() {
        console.log('submit')
        // setTimeout( () => setRender(true), 3000)
        setRender(true)
        fetch(`https://gorest.co.in//public-api/todos/${data.id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': apiKey
            },
            body: JSON.stringify(
                {title: title}
            ) 
            }).then(res =>  {
            return res.json()
            })
            .then(data => console.log(data))
            .catch(error => console.log('Error'))
            setRender(true)
    }

    console.log(itemId)

    async function getData(id) {
        let response = await fetch(`https://gorest.co.in/public-api/todos/${id}`);
        let data = await response.json();
        console.log(data)
        setData(data.data)
    }
    // getData(id)

    useEffect(() => {
        getData(itemId)
    }, [])

    return (
        <div>
            <p>
                {/* {data} */}
            </p>
            <p>
                {data.title}
            </p>
            <input type='text' value={data.title} onChange={editItemText} />
            <button onClick={submitChange}>sub</button>
            {/* <span>chars: {title.length} </span> */}
            <p>
                created:
                {data.created_at}
                {/* date: {data.created_at.slice(0,10)}
                time: {data.created_at.slice(10,18)} */}
            </p>
            <p>
                by user number:  {data.user_id}            
            </p>
        </div>
    )
};

export default Test; 