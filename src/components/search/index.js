// import React from 'react';

// import {
//     // RecoilRoot,
//     atom,
//     selector,
//     useRecoilState,
//     // useRecoilValue,
//     // useSetRecoilState,
// } from 'recoil';

// import { filteredTodoListData } from '../todolistfilters';
// // import styles from '../../styles';

// const todoListSearchQuery = atom({
//     key: 'todoListSearchQuery',
//     default: ''
// });

// const todoListSearchResults = selector({
//     key: 'todoListSearchResults',
//     get: ({get}) => {
//         const todoList = get(filteredTodoListData);
//         const searchQuery = get(todoListSearchQuery);

//         const searchResults = todoList.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
//         return searchResults
//     }
// });

// const Search = () => {
//     const [searchQuery, setSearchQuery] = useRecoilState(todoListSearchQuery);
//     return (
//         <input name='search' value={searchQuery} placeholder="search" onChange={(e) => setSearchQuery(e.target.value)}/>
//     )
// }

// export default Search;

// export {todoListSearchResults};