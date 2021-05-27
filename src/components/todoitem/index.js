import React from 'react';

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
  } from 'recoil';

import {todoListData} from '../../App';

function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }
  
  function removeItemAtIndex(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }

const TodoItem = ({item}) => {
    const [todoList, setTodoList] = useRecoilState(todoListData);
    const index = todoList.findIndex((listItem) => listItem === item);

    function editItemText({target: {value}}) {
        const newList = replaceItemAtIndex(todoList, index, {
            ...item,
            text: value,
        });

        setTodoList(newList);
    };

    function toggleItemCompletion() {
        const newList = replaceItemAtIndex(todoList, index, {
            ...item,
            isComplete: !item.isComplete,
        });
        setTodoList(newList);
    };

    function deleteItem() {
        const newList = removeItemAtIndex(todoList, index);
        
        setTodoList(newList)
    };

    return (
        <div>
            <input type='text' value={item.text} onChange={editItemText} />
            <input 
                type="checkbox"
                checked={item.isComplete}
                onChange={toggleItemCompletion}
            />
            <button onClick={deleteItem}>delete</button>
        </div>
    );
};


export default TodoItem;