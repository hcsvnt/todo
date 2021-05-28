import React, { useState } from 'react';

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
  } from 'recoil';

import {todoListData} from '../../App';

import {apiResponseData} from '../../App';

let id = 0;
function getId() {
    return id++;
};

const TodoItemCreator = () => {
    const [inputValue, setInputValue] = useState('');
    const setTodoList = useSetRecoilState(todoListData);

    // 

    const [apiData, setApiData] = useRecoilState(apiResponseData);
    console.log(apiData)

    function addApiItemToList(item) {
        setTodoList((oldTodoList) => [
            ...oldTodoList,
            {
                id: getId(),
                text: item.title,
                isComplete: false,
            }
        ])
    }

    function syncData() {
        console.log('s')
        apiData.forEach(item => {
            addApiItemToList(item);
        })
    }

    // 

    function addListItem() {
        setTodoList((oldTodoList) => [
            ...oldTodoList,
            {
                id: getId(),
                text: inputValue,
                isComplete: false,
            },
        ]);
        setInputValue('');
        console.log(todoListData);
    };
    
    function handleChange({target: {value}}) {
        setInputValue(value);
    };

    console.log(apiResponseData)

    return (
        <>
            <div>
            <button onClick={syncData}>SYNC ME!</button>
            </div>
            <div>
                <input type="text" value={inputValue} onChange={handleChange} />
                <button onClick={addListItem}>Add to list</button>
            </div>
        </>
    );
};


export default TodoItemCreator;