/** @jsxImportSource theme-ui */
import { useState } from "react";
import {Link} from "react-router-dom";

import {
    useRecoilState, 
    useRecoilValue,
  } from 'recoil';

import styles from '../../styles';

import {apiKeyState} from '../../App'
import { reRender } from '../todolist';





const TodoItem = ({item}) => {
    const [render, setRender] = useRecoilState(reRender)
    const apiKey = useRecoilValue(apiKeyState)

    const [checked, setChecked] = useState(item.completed)
    const [title, setTitle] = useState(item.title)

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
            marginBottom: '1rem',
        }}
        >
            <p
            sx={{
                paddingLeft: '1rem'
            }}
            >{title.slice(0,30)}...</p>
            <input type='text' value={title} onChange={editItemText} />
            <button onClick={submitChange}>sub</button>
            {/* <span>chars: {title.length} </span> */}
            <div
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly'
                }}
                >
                completed:
                <input 
                    type="checkbox"
                    checked={checked}
                    onChange={toggleItemCompletion}
                    />
                <Link to={`/items/${item.id}`}
                sx={{
                    color: 'inherit'
                }}
                >
                    show item
                </Link>
                <button onClick={deleteItem}>delete</button>
            </div>      
        </div>
    );
};


export default TodoItem;