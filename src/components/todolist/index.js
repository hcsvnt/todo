import React, { useState } from 'react';

import TodoItemCreator from '../todoitemcreator';
import TodoItem from '../todoitem';

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
  } from 'recoil';

import {todoListData} from '../../App';

// const TodoItemCreator = () => {
//     const [inputValue, setInputValue] = useState('');
//     const setTodoList = useSetRecoilState(todoListData);

//     function addListItem() {
//         setTodoList((oldTodoList) => [
//             ...oldTodoList,
//             {
//                 id: getId(),
//                 text: inputValue,
//                 isComplete: false,
//             },
//         ]);
//         setInputValue('');
//         console.log(todoListData);
//     };
    
//     function handleChange({target: {value}}) {
//         setInputValue(value);
//     };

//     return (
//         <div>
//             <input type="text" value={inputValue} onChange={handleChange} />
//             <button onClick={addListItem}>Add to list</button>
//         </div>
//     );
// }

// let id = 0;
// function getId() {
//     return id++;
// };

const TodoList = () => {
    const todoList = useRecoilValue(todoListData);
    console.log(todoList)
    return (
        <div>
            <TodoItemCreator />

            {todoList.map((todoItem) => (
                <TodoItem key={todoItem.id} item={todoItem} />
            ))}
          
        </div>
    )
};


export default TodoList;