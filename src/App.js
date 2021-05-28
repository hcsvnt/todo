import React from 'react';
import { useEffect } from 'react';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import { Themeprovider } from 'theme-ui';
import styles from './styles';


import Header from './components/header';
import TodoList from './components/todolist';

const todoListData = atom({
  key: 'todoListData',
  default: [],
});

const apiUrl = 'https://gorest.co.in/public-api/todos';

const apiData = atom({
  key: 'apiData',
  default: [],
});

const apiResponseData = selector({
  key: 'apiResponseData',
  get: async ({get}) => {
    const response =  await fetch(apiUrl);
    const result = await response.json()
    const apiData = result.data
    return apiData
  }
});

function App() {
 console.log(styles)
  return (
      <div>
        <Themeprovider theme={styles}>
          <Header />
          <TodoList />
        </Themeprovider>
      </div>

  );
}

export default App;

export { todoListData,
        apiResponseData };
