import React from 'react';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import TodoList from './components/todolist';

const todoListData = atom({
  key: 'todoListData',
  default: [],
});

function App() {
  return (
    <RecoilRoot>
      <div>
        <p>
          speed coding challenge yeeeehaw
        </p>
        <TodoList />
      </div>
   </RecoilRoot>
  );
}

export default App;

export { todoListData };
