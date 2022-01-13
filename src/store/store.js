import {createStore} from 'redux';
import taskReducer  from './task';

const INITIAL_STATE = [
	{id: 1, title: 'Task 1', completed: false},
	{id: 2, title: 'Task 2', completed: false},
];

function initStore() {
    return createStore(taskReducer, INITIAL_STATE);
}

export default initStore;
