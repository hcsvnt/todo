import React from 'react';
import {Link, Switch, Route, useParams} from "react-router-dom";

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
  } from 'recoil';

import {todoListData} from '../../App';

const Test = () => {
    const [todoList, setTodoList] = useRecoilState(todoListData);
    let {Id} = useParams();
    const item = todoList[Id]
    return (
        <div>
            <span>
                {item.text}
            </span>
            <span>chars: {item.text.length} </span>
            <Link to='/'>
                back
            </Link>
        </div>
    )
};

export default Test; 