/** @jsxImportSource theme-ui */
import React, { useEffect } from 'react';

import {
  // RecoilRoot,
  atom,
  useRecoilState,
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

const myUserId = atom({
  key: 'myUserId',
  default: 1717
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
  let newId = ''
  async function makeUserIfNone() {
    let exists = await checkUserExists();
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
            newId = data.data.id
            return(newId)
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
          }).then(response =>  {
          return response.json()
          })
            .then(data => {
              console.log(data)
            })
              .catch(error => console.log('Error'))
  
  }
  function checkId() {
    fetch(`https://gorest.co.in/public-api/users?name=Halix321`)
    .then(response => response.json())
    .then(data => setUserId(data.data[0].id))
  }

  deleteUser(1717)



  useEffect(() => {
    makeUserIfNone()
    checkId()

  },[])

  return (
    <div
      sx={{
          fontFamily: 'Poppins',
          background: styles.colors.bg,
          color: styles.colors.main,
          maxWidth: '600px',
          margin: '0 auto'
          
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
        apiKeyState,
        myUserId,
       };
