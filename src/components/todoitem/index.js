/** @jsxImportSource theme-ui */
// import React from 'react';
import {Link, Route, Switch} from "react-router-dom";

import {
    // RecoilRoot,
    // atom,
    // selector,
    useRecoilState, useRecoilValue,
    // useRecoilValue,
    // useSetRecoilState,
  } from 'recoil';

import styles from '../../styles';

import {apiKeyState} from '../../App'
import { useEffect, useState } from "react";

import { reRender } from '../todolist';

import Test from '../test';





const TodoItem = ({item}) => {
    const [render, setRender] = useRecoilState(reRender)
    const apiKey = useRecoilValue(apiKeyState)

    const [checked, setChecked] = useState(item.completed)
    const [title, setTitle] = useState(item.title)
    //  WARNING USESTATE PERSISTS, DO NOT USE

    function toggleItemCompletion() {
        setChecked(!checked)
        fetch(`https://gorest.co.in//public-api/todos/${item.id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': apiKey
            },
            body: JSON.stringify(
                {completed: !item.completed}
            ) 
            }).then(res =>  {
            return res.json()
            })
            .then(data => console.log(data))
            .catch(error => console.log('Error'))
        
            setRender(true)
    }
   

    function deleteItem() {
        fetch(`https://gorest.co.in//public-api/todos/${item.id}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': apiKey
            }
            }).then(res =>  {
            return res.json()
            })
            .then(data => console.log(data))
            .catch(error => console.log('Error'))
        
        setRender(true)
    };

    function editItemText({target: {value}}) {
        console.log('editin')
        setTitle(value)
    }

    function submitChange() {
        console.log('submit')
        // setTimeout( () => setRender(true), 3000)
        setRender(true)
        fetch(`https://gorest.co.in//public-api/todos/${item.id}`, {
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
                    <p>{title.slice(0,30)}...</p>
                    <input type='text' value={title} onChange={editItemText} />
                    {/* how to make controlled input here */}
                    <button onClick={submitChange}>sub</button>
                    <span>chars: {title.length} </span>
                    <input 
                        type="checkbox"
                        checked={checked}
                        onChange={toggleItemCompletion}
                        />
                    <button onClick={deleteItem}>delete</button>
                    <Link to={`/items/${item.id}`}>
                        test
                    </Link>
                </div>      
    );
};


export default TodoItem;