// import React from 'react';

// import {
//     // RecoilRoot,
//     // atom,
//     // selector,
//     useRecoilState,
//     // useRecoilValue,
//     useSetRecoilState,
//   } from 'recoil';

// import { todoListData } from '../../App';
// import {apiResponseData} from '../../App';


// const Sync = () => {
//     const setTodoList = useSetRecoilState(todoListData);
//     const [apiData] = useRecoilState(apiResponseData);

//     console.log(apiData)

//     function addApiItemToList(item) {
//         setTodoList((oldTodoList) => [
//             ...oldTodoList,
//             {
//                 id: item.id,
//                 title: item.title,
//                 completed: item.completed,
//                 created_at: item.created_at,
//                 updated_at: item.updated_at,
//             }
//         ])
//     };

//     function syncData() {
//         apiData.forEach(item => {
//             addApiItemToList(item);
//         })
//     };
//     return (
//         <div>
//             <button onClick={syncData}>SYNC ME!</button>  
//         </div>
//     )
// };

// export default Sync;