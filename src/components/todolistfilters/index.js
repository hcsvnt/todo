import React from 'react';

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
  } from 'recoil';

import {todoListData} from '../../App';


const todoListFilterData = atom({
    key: 'todoFilterListData',
    default: 'All',
});

const filteredTodoListData = selector({
    key: 'filteredTodoListData',
    get: ({get}) => {
        const filter = get(todoListFilterData);
        const list = get(todoListData);

        switch (filter) {
            case 'Completed':
                return list.filter((item) => item.isComplete);
            case 'To do':
                return list.filter((item) => !item.isComplete);
            default:
                return list;
        }
    },
});

const TodoListFilters = () => {
    const [filter, setFilter] = useRecoilState(todoListFilterData);

    function updateFilter({target: {value}}) {
        setFilter(value);
    };

    return (
        <div>
            Filter:
            <select value={filter} onChange={updateFilter}>
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="To do">To do</option>
            </select>
        </div>
    )
};


export default TodoListFilters;

export { filteredTodoListData };