/** @jsxImportSource theme-ui */
import { useEffect } from 'react';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";

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
import TodoListStats from '../stats';

import Test from '../test';

import Filters, { filterData, userFilterData, searchFilter } from '../todolistfilters';

const currentPage = atom({
    key: 'currentPage',
    default: 1
  })

  const reRender = atom({
      key: 'reRender',
      default: false
  })

const apiResponseData = selector({
    key: 'apiResponseData',
    get: async ({get}) => {
        let pageNumber = get(currentPage)
        let render = get(reRender)
        let query = get(userFilterData)
        let filter = get(filterData)
        let search = get(searchFilter)
        let url = `${query}?page=${pageNumber}${search}${filter}`
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
    })
    return (
        <div>
            {apiData.map(item => (
                <>
                    <TodoItem key={item.id} item={item} /> 
                </>
            ) )}

        </div>
    )
}

const TodoList = () => {
    const { apiData, totalPages } = useRecoilValue(apiResponseData);
    const [page, setPage] = useRecoilState(currentPage)

    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <div
                    sx={{
                        direction: "column"
                    }}
                    >
                        <TodoListStats />
                        <Filters />
                    <div>
                        Page: 
                        {page} of
                        {totalPages}
                    <button onClick={() => setPage(1)}>first</button>
                    <button onClick={() => setPage(page - 1)}>-</button>
                    <button onClick={() => setPage(page + 1)}>+</button>
                    <button onClick={() => setPage(totalPages)}>last</button>
                    </div>
                    <TodoItemCreator />
                    </div>
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
                <Route path='/items/:id'>
                    <Test />
                </Route>
            </Switch>
        </Router>
    )
};

export default TodoList;
export {
    apiResponseData,
    currentPage,
    reRender,
}