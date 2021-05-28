import React from 'react';

import {
    // RecoilRoot,
    // atom,
    // selector,
    useRecoilState,
    // useRecoilValue,
    useSetRecoilState,
  } from 'recoil';

import { todoListData } from '../../App';
import {apiResponseData} from '../../App';


const Sync = ({id, getId}) => {
    const setTodoList = useSetRecoilState(todoListData);
    const [apiData] = useRecoilState(apiResponseData);

    function addApiItemToList(item) {
        setTodoList((oldTodoList) => [
            ...oldTodoList,
            {
                id: getId(),
                text: item.title,
                isComplete: false,
            }
        ])
    };

    function syncData() {
        apiData.forEach(item => {
            addApiItemToList(item);
        })
    };
    return (
        <div>
            <button onClick={syncData}>SYNC ME!</button>  
        </div>
    )
};

export default Sync;