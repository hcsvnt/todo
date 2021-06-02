import React, { useEffect, useState } from 'react';
import {Link, useParams, useRouteMatch} from "react-router-dom";

import {
    // RecoilRoot,
    // atom,
    // selector,
    useRecoilState, useRecoilValue,
    // useRecoilValue,
    // useSetRecoilState,
  } from 'recoil';

  import {apiResponseData} from '../todolist'

//   import { todoListData } from '../../components/todolist';
const Test = () => {
    const [data, setData] = useState('')
    let { id } = useParams()
    let { path, url } = useRouteMatch();

    console.log(id)

    async function getData(id) {
        let response = await fetch(`https://gorest.co.in/public-api/todos/${id}`);
        let data = await response.json();
        console.log(data)
        setData(data.data)
    }
    // getData(id)

    useEffect(() => {
        getData(id)
    }, [])

    return (
        <div>
            <p>
                {data.title}
                {data.created_at}
                by {data.user_id}            
            </p>
        </div>
    )

};

export default Test; 


// const [todoList] = useRecoilState(todoListData);
//     let {Id} = useParams();
//     const item = todoList[Id]
//     return (
//         <div>
//             <span>
//                 {item.text}
//             </span>
//             <span>chars: {item.text.length} </span>
//             <Link to='/'>
//                 back
//             </Link>
//         </div>
//     )