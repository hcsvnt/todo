/** @jsxImportSource theme-ui */
import React, { useEffect } from 'react';

import {
    // RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
    // useSetRecoilState,
} from 'recoil';

import { apiResponseData } from '../todolist';

import styles from '../../styles';

import {reRender} from '../todolist'


const statsState = atom({
    key: 'statsState',
    default: 0
})

const statsCompletedState = atom({
    key: 'statsCompletedState',
    default: 0
})

const statsDataState = selector({
    key: 'statsDataState',
    get: ({get}) => {
        let data = 'xxx'
    }
})

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


const TodoListStats = () => {
    const [statsData, setStatsData] = useRecoilState(statsState);
    const [statsCData, setStatsCData] = useRecoilState(statsCompletedState);

    const [render, setRender] = useRecoilState(reRender)

    useEffect(() => {

        async function getStats() {
            let response = await fetch('https://gorest.co.in//public-api/todos');
            let data = await response.json();
            console.log(data.meta.pagination.total)
            let totalTodos = data.meta.pagination.total
            // setStatsData({...stats, total: totalTodos})
            setStatsData(totalTodos)
            return totalTodos
        };
        getStats()

        async function getStats2() {
            let response = await fetch('https://gorest.co.in//public-api/todos?completed=true');
            let data = await response.json();
            console.log(data.meta.pagination.total)
            let completedTodos = data.meta.pagination.total
            // setStatsData({...stats, total: totalTodos})
            setStatsCData(completedTodos)
            return completedTodos
        };
        getStats2()
      

    },[render])

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
                    t: {statsData} % {Math.floor(statsCData / statsData * 100)}
                </li>
                <li>
                    c: {statsCData}
                </li>
                <li>
                    to do: {statsData - statsCData}
                </li>
            </ul>
        </div>
    )
};

export default TodoListStats;