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
import TodoListStats from '../stats';
import Search, { todoListSearchResults } from '../search';

import {todoListData} from '../../App';
import {filteredTodoListData} from '../todolistfilters';

import Test from '../test';


const TodoList = () => {
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

                    <Search />

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