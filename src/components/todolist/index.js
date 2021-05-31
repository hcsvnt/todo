/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import {Switch, Route} from "react-router-dom";

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from 'recoil';

import { Flex, get } from 'theme-ui';
// import styles from '../../styles';


import TodoItemCreator from '../todoitemcreator';
import TodoItem from '../todoitem';

import { apiKeyState } from '../../App';

import Test from '../test';

const currentPage = atom({
    key: 'currentPage',
    default: 1
  })

const apiResponseData = selector({
    key: 'apiResponseData',
    get: async ({get}) => {
        const pageNumber = get(currentPage)
        // const response =  await fetch(`https://gorest.co.in//public-api/users/2687/todos?page=${pageNumber}`);
        const response =  await fetch(`https://gorest.co.in//public-api/todos?page=${pageNumber}`);
        const result = await response.json();
        if (response.error) {
            console.error(response.error);
        }
        const totalPages = result.meta.pagination.pages
        let apiData = result.data
        console.log(result)
        console.log(result.meta.pagination)
        return {
            apiData,
            totalPages
        }
        }
  });


const TodoListPage = () => {
    const { apiData, totalPages } = useRecoilValue(apiResponseData);
    return (
        <div>
            {apiData.map(item => (
                <TodoItem item={item} />
            ) )}

        </div>
    )
}

const TodoList = () => {
    const { apiData, totalPages } = useRecoilValue(apiResponseData);
    const [page, setPage] = useRecoilState(currentPage)

    return (
        <div>
            <Switch>
                <Route exact path='/'>
                    <Flex>
                        {/* <TodoListStats />
                        <TodoListFilters /> */}
                    </Flex>
                    <TodoItemCreator />
                    {/* <Search /> */}
                    {page} of
                    {totalPages}
                    <button onClick={() => setPage(page - 1)}>-</button>
                    <button onClick={() => setPage(page + 1)}>+</button>
                    <button onClick={() => setPage(totalPages)}>last</button>
                    <div
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        fontSize: '16px',
                        fontFamily: 'main',
                        // background: 'green'
                    }}>
                        {/* total oages. for each ... pass page number up to fetch how to do router use atom current page */}
                   <TodoListPage />
                    </div>
                </Route>
                <Route path='/items/:Id'>
                    <Test />
                </Route>
            </Switch>
        </div>
    )
};


export default TodoList;

// export {
//     currentPage
// }

export {
    // todoListData,
    apiResponseData
}