import React, { useState } from 'react';
// import TodoItem from '../todoitem';

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
  } from 'recoil';

import {todoListData} from '../../App';

const TodoItemCreator = () => {
    const [inputValue, setInputValue] = useState('');
    const setTodoList = useSetRecoilState(todoListData);

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

    return (
        <div>
            <input type="text" value={inputValue} onChange={handleChange} />
            <button onClick={addListItem}>Add to list</button>
        </div>
    );
}

let id = 0;
function getId() {
    return id++;
};

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
}

function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }
  
  function removeItemAtIndex(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }


const TodoList = () => {
    const todoList = useRecoilValue(todoListData);
    console.log(todoList)
    return (
        <div>
            {/* <TodoItemCreator /> */}
            <h1>to do list</h1>
            {/* <TodoItem />
            <TodoItem />
            {todoList.map((todoItem) => (
                <TodoItem key={todoItem.id} item={todoItem} />
            ))} */}
            
            <TodoItemCreator />

            {todoList.map((todoItem) => (
                <TodoItem key={todoItem.id} item={todoItem} />
            ))}
          
        </div>
    )
};


export default TodoList;