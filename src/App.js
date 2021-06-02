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

import {apiResponseData} from './components/todolist'


const apiKeyKey = process.env.REACT_APP_API_KEY;
const apiKey = `Bearer ${apiKeyKey}`;

const apiKeyState = atom({
  key: 'apiKeyState',
  default: apiKey
})

const myUserId = atom({
  key: 'myUserId',
  default: 2603
})

const myUser = {
  name: 'Halix321',
  email: 'canbe@blank.com',
  gender: 'Male',
  status: 'Active'
};

const testUser = {
  name: 'Meme4321',
  email: 'canbe@notblank.com',
  gender: 'Male',
  status: 'Active'
};

function mkUsr(userData) {
  fetch(`https://gorest.co.in/public-api/users`, {
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
            console.log(data.data.id)
            // console.log(data.meta.pagination)

          })
            .catch(error => console.log('Error'))
};
// mkUsr(myUser)

const App = () => {
  const [userId, setUserId] = useRecoilState(myUserId);


  async function checkUserExists() {
    let response = await fetch(`https://gorest.co.in/public-api/users/name=Halix321`);
    let data = await response.json()
    if (data.code === 200) {
      setUserId(data.data.id)
      return true
    } else {
      return false
    }
  };

  async function makeUserIfNone() {
    let exists = await checkUserExists();
    console.log(`user exists: ${exists}`)
    console.log(userId)
    if (exists === false) {
      fetch(`https://gorest.co.in/public-api/users`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
        },
        body: JSON.stringify(myUser)
        }).then(response => response.json())
          .then(data => {
            // setNewId(data.data.id)
            // setUserId(newId)
            let myNewId = data.data.id
            console.log(data)
            console.log(userId)
            return(myNewId)
          })
          .then(console.log(userId))
            .catch(error => console.log('Error'))
        }; 
  };

  
  function deleteUser(deleteId) {
    fetch(`https://gorest.co.in/public-api/users/${deleteId}`, {
          method: 'DELETE',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': apiKey,
          },
          // body: JSON.stringify(userData)
          }).then(response =>  {
          return response.json()
          })
            .then(data => {
              console.log(data)
            })
              .catch(error => console.log('Error'))
  
  }

  fetch(`https://gorest.co.in/public-api/users?name=Halix321`)
  .then(response => response.json())
  .then(data => console.log(data))
  // deleteUser(2602)



  useEffect(() => {
    // makeUserIfNone().then(data => setUserId(data))

  },[])

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
        apiKeyState,
        myUserId,
       };
