import React from 'react';
import { useEffect } from 'react';

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

const apiUrl = 'https://gorest.co.in/public-api/todos';

// async function apiCall() {
//   const response = await fetch(apiUrl);
//   const apiData = await response.json()
//   console.log(apiData)
//   console.log(apiData.data)
//   return apiData.data
// }

// apiCall();

const apiData = atom({
  key: 'apiData',
  default: [],
});

// const apiResponseData = selector({
//   key: 'apiResponseData',
//   get: async ({get}) => {
//     const apiDataArray =  await apiCall();
//     return apiDataArray
//   }
// })

const apiResponseData = selector({
  key: 'apiResponseData',
  get: async ({get}) => {
    const response =  await fetch(apiUrl);
    const result = await response.json()
    const apiData = result.data
    return apiData
  }
})

// function concatArrays(arr1, arr2) {
//   const newArr = arr1.concat(arr2);
//   console.log(newArr);
//   return newArr
// };



function App() {
  // const [apiData, setApiData] = useRecoilState(apiResponseData)
  // console.log(apiData)
  return (

    
      <div>
        <p>
          speed coding challenge yeeeehaw
          add if note is empty dont add
        </p>
        <TodoList />
      </div>

  );
}

export default App;

export { todoListData,
        apiResponseData };
