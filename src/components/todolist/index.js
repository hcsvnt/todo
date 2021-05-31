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

import { apiKeyState } from '../../App';

import Test from '../test';

const currentPage = atom({
    key: 'currentPage',
    default: 1
  })

const query = atom({
    key: 'query',
    default: `https://gorest.co.in//public-api/todos`
})

 // public-api/todos?completed=true
// public-api/todos?completed=false
// public-api/todos?title=MYQUERY\
// title=mleko EXAMPLE
// public-api/users/2687/todos?completed=true

// need to set page=1 when params change

const apiResponseData = selector({
    key: 'apiResponseData',
    get: async ({get}) => {
        let pageNumber = get(currentPage)
        let stdQuery = get(query)
        let filter = get(filterData)
        // const response =  await fetch(`https://gorest.co.in//public-api/users/2687/todos?page=${pageNumber}`);
        // const response =  await fetch(`https://gorest.co.in//public-api/todos?page=${pageNumber}`);
        let response =  await fetch(`https://gorest.co.in//public-api/todos${filter}?page=${pageNumber}`);
        let result = await response.json();
        if (response.error) {
            console.error(response.error);
        }
        let totalPages = result.meta.pagination.pages
        let apiData = result.data
        // console.log(result)
        // console.log(result.meta.pagination)
        // console.log(pageNumber)
        return {
            apiData,
            totalPages
        }
        }
  });


const filters = atom({
    key: 'filter',
    default: 'All',
});

const filterData = selector({
    key: 'filterData',
    get: ({get}) => {
        const filterData = get(filters);
        // const list = get(apiResponseData);

        switch (filterData) {
            case 'Completed':
                return '?completed=true'
            case 'To do':
                return '?completed=false'
            default:
                return '';
        }
    },
});

  const Filters = () => {
    const [filter, setFilter] = useRecoilState(filters);

    function updateFilter({target: {value}}) {
        setFilter(value);
    };
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
        Filter:
        <select value={filter} onChange={updateFilter}>
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="To do">To do</option>
        </select>
    </div>
      )
  }


const TodoListPage = () => {
    const { apiData, totalPages } = useRecoilValue(apiResponseData);
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
                        {/* <TodoListStats />
                        <TodoListFilters /> */}
                        <Filters />
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
    apiResponseData
}