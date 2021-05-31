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

import { todoListData } from '../../components/todolist';

import styles from '../../styles';

const todoListStatsData = selector({
    key: 'todoListStats',
    get: ({get}) => {
        const todoList = get(todoListData);
        const total = todoList.length;
        const totalCompleted = todoList.filter((item) => item.isComplete).length;
        const totalToDo = total - totalCompleted;
        const percentCompleted  = total === 0 ? 0 : Math.floor(totalCompleted / total * 100);

        return {
            total,
            totalCompleted,
            totalToDo,
            percentCompleted,
        };
    }
});

const TodoListStats = () => {
    const {
        total,
        totalCompleted,
        totalToDo,
        percentCompleted
    } = useRecoilValue(todoListStatsData);

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
                    total: {total}
                </li>
                <li>
                    completed: {totalCompleted} / {percentCompleted}%
                </li>
                <li>
                    to do: {totalToDo}
                </li>
            </ul>
        </div>
    )
};

export default TodoListStats;