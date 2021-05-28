import React, { useState } from 'react';

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
  } from 'recoil';

import Sync from '../sync';

import {todoListData} from '../../App';

import {apiResponseData} from '../../App';

let id = 0;
function getId() {
    return id++;
};

const TodoItemCreator = () => {
    const [inputValue, setInputValue] = useState('');
    const setTodoList = useSetRecoilState(todoListData);

    function addListItem() {
        if (inputValue.length > 1) {
            setTodoList((oldTodoList) => [
                ...oldTodoList,
                {
                    id: getId(),
                    text: inputValue,
                    isComplete: false,
                },
            ]);
            setInputValue('');
        }
    };
    
    function handleChange({target: {value}}) {
        setInputValue(value);
    };

    return (
        <>
            <div>
            <React.Suspense fallback={<div>Loading...</div>}>
                <Sync id={id} getId={getId} />
            </React.Suspense>
            </div>
            <div>
                <input type="text" value={inputValue} onChange={handleChange} />
                <button onClick={addListItem}>Add to list</button>
                
            </div>
        </>
    );
};


export default TodoItemCreator;