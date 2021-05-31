/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react';

import {
  // RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import './styles/fonts.css'

import { ThemeProvider } from 'theme-ui';
import styles from './styles';

import Header from './components/header';
import TodoList from './components/todolist';


const apiKeyKey = process.env.REACT_APP_API_KEY;
const apiKey = `Bearer ${apiKeyKey}`;

const apiKeyState = atom({
  key: 'apiKeyState',
  default: apiKey
})

// fetch('https://gorest.co.in//public-api/todos?pages')
//     .then(res => res.json())
//     .then(data => {
//       console.log(data.meta.pagination)
//     })

// fetch('https://gorest.co.in//public-api/users/2687')
//     .then(res => res.json())
//     .then(data => {
//       console.log(data)
//     })

fetch(`https://gorest.co.in//public-api/users/2687/todos?completed=true`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
        },
        // body: JSON.stringify({
        //   gender: 'Male'
        // })
        }).then(response =>  {
        return response.json()
        })
          .then(data => {
            console.log(data)
            // console.log(data.meta.pagination)

          })
            .catch(error => console.log('Error'))

            // public-api/todos?completed=true
            // public-api/todos?completed=false
            // public-api/todos?title=MYQUERY\
            // title=mleko EXAMPLE
            // public-api/users/2687/todos?completed=true

    


const myUser = {
  name: 'Halix321',
  email: 'canbe@blank.com',
  gender: 'Male',
  status: 'Active'
};

function mkUsr(userData) {
  fetch(`https://gorest.co.in//public-api/users`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
        },
        body: JSON.stringify(userData)
        }).then(response =>  {
        return response.json()
        })
          .then(data => {
            console.log(data)
            // console.log(data.meta.pagination)

          })
            .catch(error => console.log('Error'))
};

function App() {

  // useEffect(() => {
  // },[])

  return (
    <div
      sx={{
          fontFamily: 'Poppins',
          background: styles.colors.bg,
          color: styles.colors.main
          
    }}>
        <ThemeProvider theme={styles}>
          <Header />
          <React.Suspense fallback={<div>Loading...</div>}>
            <TodoList />
          </React.Suspense>          
        </ThemeProvider>
      </div>

  );
}

export default App;

export { 
        // todoListData,
        // apiResponseData,
        // currentPage,
        apiKeyState };
