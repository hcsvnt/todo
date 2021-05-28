/** @jsxImportSource theme-ui */
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

import { Flex } from 'theme-ui';
import styles from '../../styles';


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
                    <Flex>
                        <TodoListStats />
                        <TodoListFilters />
                    </Flex>
                    <TodoItemCreator />

                    <Search />
                    {/* <Flex> */}
                    <div
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        // set this to `minHeight: '100vh'` for full viewport height
                        // minHeight: 256,
                        // border: '5px solid black',
                        // padding: '1rem',
                        fontSize: '16px',
                        fontFamily: 'main'
                    }}>
                        {todoList.map((todoItem) => (
                            <TodoItem key={todoItem.id} item={todoItem} />
                            ))}
                    </div>
                    {/* </Flex> */}
                </Route>
                <Route path='/items/:Id'>
                    <Test />
                </Route>
            </Switch>
        </div>
    )
};


export default TodoList;