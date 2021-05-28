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

import Test from '../test';


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

const testQuery = 'mama';

const todoListSearchQuery = atom({
    key: 'todoListSearchQuery',
    default: ''
})

const todoListSearchResults = selector({
    key: 'todoListSearchResults',
    get: ({get}) => {
        const todoList = get(todoListData);
        const searchQuery = get(todoListSearchQuery);

        const searchResults = todoList.filter(item => item.text.toLowerCase().includes(searchQuery.toLowerCase()))
        return searchResults
    }
})

const TodoList = () => {

    // old working stuff below this line
    const [searchQuery, setSearchQuery] = useRecoilState(todoListSearchQuery);
    // const todoList = useRecoilValue(filteredTodoListData);  this was my list before live search
    const todoList = useRecoilValue(todoListSearchResults);
    console.log(todoList)
    console.log('pause');
    const searchResults = useRecoilValue(todoListSearchResults);
    console.log(searchResults)
    return (
        <div>
            <Switch>
                <Route exact path='/'>
                    <TodoListStats />
                    <TodoListFilters />
                    <TodoItemCreator />

                    <input name='search' value={searchQuery} placeholder="search" onChange={(e) => setSearchQuery(e.target.value)}/>

                    {todoList.map((todoItem) => (
                        <TodoItem key={todoItem.id} item={todoItem} />
                        ))}
                </Route>
                <Route path='/items/:Id'>
                    <Test />
                </Route>
            </Switch>
        </div>
    )
};


export default TodoList;