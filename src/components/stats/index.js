import React from 'react';

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from 'recoil';

import { todoListData } from '../../App';

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
        <div>
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