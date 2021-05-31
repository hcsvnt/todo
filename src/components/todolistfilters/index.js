import React from 'react';

import {
    atom,
    selector,
    useRecoilState,
  } from 'recoil';

import { currentPage } from '../todolist';

import styles from '../../styles';

const filters = atom({
    key: 'filter',
    default: ''
});

const filterData = selector({
    key: 'filterData',
    get: ({get}) => {
        const filterData = get(filters);

        switch (filterData) {
            case 'All':
                return ''
            case 'To do':
                return '?completed=false'
            case 'Completed':
                return '?completed=true'
            default:
                return '';
        }
    },
});

const userFilters = atom({
    key: 'userFilters',
    default: 'https://gorest.co.in/public-api/todos',
});

const userFilterData = selector({
    key: 'userFilterData',
    get: ({get}) => {
        const userFilterData = get(userFilters);

        switch (userFilterData) {
            case 'Me':
                return 'https://gorest.co.in/public-api/users/3593/todos'
            case 'Team':
                return 'https://gorest.co.in/public-api/todos'
            default:
                return 'https://gorest.co.in/public-api/todos';
        }
    },
});


const Filters = () => {
    const [page, setPage] = useRecoilState(currentPage)
    const [filter, setFilter] = useRecoilState(filters);
    const [userFilter, setUserFilter] = useRecoilState(userFilters);

    function updateFilter({target: {value}}) {
        setFilter(value);
        setPage(1)
    };

    function updateUserFilter({target: {value}}) {
        setUserFilter(value);
        setPage(1)
    };

      return (
        <div
        sx={{
            background: styles.colors.mid,
            border: '1px solid black',
            borderRadius: '4px',
            padding: '1rem',
            marginBottom: '1rem' 
        }}
    >
        Filter:
        <select value={filter} onChange={updateFilter}>
            <option value="All">All</option>
            <option value="To do">To do</option>
            <option value="Completed">Completed</option>
        </select>
        <select value={userFilter} onChange={updateUserFilter}>
            <option value="Team">Team</option>
            <option value="Me">Me</option>
        </select>
    </div>
      )
};


export default Filters;

export {    filters,
            filterData,
            userFilters,
            userFilterData
        };