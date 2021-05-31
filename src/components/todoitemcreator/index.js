import React, { useState } from 'react';

import {
    // RecoilRoot,
    // atom,
    // selector,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
  } from 'recoil';

import { apiKeyState, myUserId } from '../../App';


const TodoItemCreator = () => {
    const apiKey = useRecoilState(apiKeyState)
    const userId = useRecoilValue(myUserId);
    const [inputValue, setInputValue] = useState('');

    const postData = {
        // user_id: '10227',
        title: inputValue,
        completed: false,
    };
  
    function handleChange({target: {value}}) {
        setInputValue(value);
    };

    function postToApi(inputData) {
        fetch(`https://gorest.co.in/public-api/users/${userId}/todos`, {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer 8cada2f6a84512ab619e0e8dbfbfadfb466088b82e4b763f5a0cef36268eb609',
              },
              body: JSON.stringify(inputData)
              }).then(response =>  {
              return response.json()
              })
                .then(data => console.log(data))
                  .catch(error => console.log('Error'))
    };

    function addToApiList() {
        postToApi(postData)
    };
    console.log(userId)
    return (
        <div>
            <input 
            type="text" 
            value={inputValue}
            onChange={handleChange} 
            />
            <button onClick={addToApiList}>Add to list</button>
        </div>
    );
};


export default TodoItemCreator;