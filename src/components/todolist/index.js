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
import styles from '../../styles';


import TodoItemCreator from '../todoitemcreator';
import TodoItem from '../todoitem';
import TodoListStats from '../stats';

import { apiKeyState } from '../../App';

import Test from '../test';

import { myUserId } from '../../App';

import Filters, { filters, filterData, userFilters, userFilterData, searchFilter } from '../todolistfilters';

const currentPage = atom({
    key: 'currentPage',
    default: 1
  })

  const reRender = atom({
      key: 'reRender',
      default: false
  })

// const query = atom({
//     key: 'query',
//     default: `https://gorest.co.in//public-api/todos`
// })

 // public-api/todos?completed=true
// public-api/todos?completed=false
// public-api/todos?title=MYQUERY\
// title=mleko EXAMPLE
// public-api/users/2687/todos?completed=true


const apiResponseData = selector({
    key: 'apiResponseData',
    get: async ({get}) => {
        let pageNumber = get(currentPage)
        let render = get(reRender)
        let query = get(userFilterData)
        let filter = get(filterData)
        let search = get(searchFilter)
        // let response = await fetch(query)
        // let response = await fetch(`${query}${filter}?page=${pageNumber}`);
        // let response = await fetch(`${query}${filter}${search}`);
        
        // let response = await fetch(`${query}${filter}${search}?page=${pageNumber}`);

        //  filters dont work for shit with the fucking pagenumber shite
        // https://gorest.co.in/public-api/users/2639/todos?completed=true
        // https://gorest.co.in/public-api/todos?completed=false
        // let response = await fetch(`${query}${filter}?page=${pageNumber === 1 ? '' : pageNumber}`);
        // let response = await fetch(`${query}${filter}?page=${pageNumber === 1 ? '' : pageNumber}`);
        // let response = await fetch(`https://gorest.co.in/public-api/todos${filter}`); works
        // let url = `${query}${search}${filter}`
        let url = `${query}${filter === '?completed=false'? search+filter : filter+search }`
        let response = await fetch(url);

        let result = await response.json('');
        if (response.error) {
            console.error(response.error);
        }
        let totalPages = result.meta.pagination.pages
        let meta = result.meta
        let apiData = result.data
        console.log(result)
        console.log(url)
        // console.log(result.meta.pagination)
        // console.log(pageNumber)
        return {
            apiData,
            totalPages,
            meta
        }
        }
  });

const TodoListPage = () => {
    const [render, setRender] = useRecoilState(reRender)
    const { apiData, totalPages } = useRecoilValue(apiResponseData);

    useEffect(() => {
        setRender(false)
        console.log(`i need to render is ${render}`)
    })
    return (
        <div>
            {apiData.map(item => (
                <TodoItem key={item.id} item={item} />
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
                        <TodoListStats />
                        <Filters />
                    </Flex>
                    <TodoItemCreator />
                    {/* <Search /> */}
                    {page} of
                    {totalPages}
                    <button onClick={() => setPage(1)}>first</button>
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
                   <TodoListPage />
                    </div>
                </Route>
                <Route path='/items/:Id'>
                    {/* <Test /> */}
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
    apiResponseData,
    currentPage,
    reRender,
    // query
}