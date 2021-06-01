/** @jsxImportSource theme-ui */
import React from 'react';

import {
    // RecoilRoot,
    // atom,
    selector,
    // useRecoilState,
    useRecoilValue,
    // useSetRecoilState,
} from 'recoil';

import { apiResponseData } from '../todolist';

import styles from '../../styles';

// const todoListStatsData = selector({
//     key: 'todoListStats',
//     get: ({get}) => {
//         const todoList = get(todoListData);
//         const total = todoList.length;
//         const totalCompleted = todoList.filter((item) => item.isComplete).length;
//         const totalToDo = total - totalCompleted;
//         const percentCompleted  = total === 0 ? 0 : Math.floor(totalCompleted / total * 100);

//         return {
//             total,
//             totalCompleted,
//             totalToDo,
//             percentCompleted,
//         };
//     }
// });

// fetch(`https://gorest.co.in/public-api/users/2687/todos?completed=true`, {
//         method: 'GET',
//         headers: {
//         'Content-Type': 'application/json',
//         'Authorization': apiKey,
//         },
//         // body: JSON.stringify({
//         //   gender: 'Male'
//         // })
//         }).then(response =>  {
//         return response.json()
//         })
//           .then(data => {
//             console.log(data)
//             // console.log(data.meta.pagination)

const TodoListStats = () => {
    // const {meta} = useRecoilValue(apiResponseData)
    // console.log(meta)
//     const {
//         total,
//         totalCompleted,
//         totalToDo,
//         percentCompleted
//     } = useRecoilValue(todoListStatsData);

    // const total = meta.total

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
            <ul>
                <li>
                    total:
                </li>
                <li>
                    completed: 
                </li>
                <li>
                    to do: 
                </li>
            </ul>
        </div>
    )
};

export default TodoListStats;