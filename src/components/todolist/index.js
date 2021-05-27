import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {Link, Switch, Route} from "react-router-dom";

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from 'recoil';

import TodoItemCreator from '../todoitemcreator';
import TodoItem from '../todoitem';
import TodoListFilters from '../todolistfilters';

import {todoListData} from '../../App';
import {filteredTodoListData} from '../todolistfilters';


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

const TodoList = () => {
    const todoList = useRecoilValue(filteredTodoListData);
    console.log(todoList)
    return (
        <div>
            <TodoListStats />
            <TodoListFilters />
            <TodoItemCreator />

            {todoList.map((todoItem) => (
                <TodoItem key={todoItem.id} item={todoItem} />
            ))}
        </div>
    )
};


export default TodoList;