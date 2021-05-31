/** @jsxImportSource theme-ui */
// import React from 'react';
import {Link} from "react-router-dom";

import {
    // RecoilRoot,
    // atom,
    // selector,
    useRecoilState,
    // useRecoilValue,
    // useSetRecoilState,
  } from 'recoil';

import styles from '../../styles';



const TodoItem = ({item}) => {
   

    // function editItemText({target: {value}}) {
    //     const newList = replaceItemAtIndex(todoList, index, {
    //         ...item,
    //         text: value,
    //          updated_at: dateAndTime
    //     });

    //     setTodoList(newList);
    // };

   

    function deleteItem() {
       

        fetch(`https://gorest.co.in//public-api/todos/${item.id}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 8cada2f6a84512ab619e0e8dbfbfadfb466088b82e4b763f5a0cef36268eb609'
            }
            }).then(res =>  {
            return res.json()
            })
            .then(data => console.log(data))
            .catch(error => console.log('Error'))
    };

    return (
        <div
            sx={{
                background: styles.colors.mid,
                border: '1px solid black',
                borderRadius: '4px',
                padding: '1rem',
                marginBottom: '1rem' 
            }}
        >
            <p>{item.title.slice(0,30)}...</p>
            {/* <input type='text' value={item.text} onChange={editItemText} /> */}
            {/* <span>chars: {item.text.length} </span> */}
            <input 
                type="checkbox"
                checked={item.completed}
                // onChange={toggleItemCompletion}
                />
            <button onClick={deleteItem}>delete</button>
            <Link to={`/items/${item.id}`}>
                test
            </Link>
        </div>
    );
};


export default TodoItem;