import { createSlice } from '@reduxjs/toolkit';
import todoService from './services/todo.service';
import * as errorReducerActions from './errors';

const INITIAL_STATE = {
    entities: [],
    isLoading: true    
};

const taskSlice = createSlice({
    name: 'task',
    initialState: INITIAL_STATE,
    reducers: {
        fetched(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        taskCreated(state, action) {
            state.entities.unshift(action.payload);
            state.isLoading = false;
        },
        update(state, action) {
            const payload = action.payload;
            const tasks = state.entities;
			const index = tasks.findIndex(e => e.id === payload.id);
			if (index >= 0) {				                
				tasks[index] = {...tasks[index], ...payload};	                				
			}  
        },
        delete(state, action) {            
            state.entities = state.entities.filter(task => task.id !== action.payload.id);
        },
        taskRequested(state, action) {
            state.isLoading = true;
        },
        taskRequestFailed(state, action) {            
            state.isLoading = false;            
        }
    }
});

const {reducer: taskReducer, actions: taskReducerActions} = taskSlice;

// ----------------------------------------------------------------------
// WEB API json placeholder
// ----------------------------------------------------------------------

const loadTasks = () => async (dispatch) => {
    dispatch(taskReducerActions.taskRequested());
    try {
        const data = await todoService.fetch();
        dispatch(taskReducerActions.fetched(data));
    } catch (err) {
        dispatch(taskReducerActions.taskRequestFailed(err.message));
        dispatch(errorReducerActions.setError(err.message));
        console.error('Unable to get tasks from json placeholder. '+err.message);
    }        
}

const createTask = () => async (dispatch) => {    
    dispatch(taskReducerActions.taskRequested());
    try {
        const data = await todoService.create();        
        dispatch(taskReducerActions.taskCreated(data));
    } catch (err) {
        dispatch(taskReducerActions.taskRequestFailed(err.message));
        dispatch(errorReducerActions.setError(err.message));
        console.error('Unable to create new task on json placeholder. '+err.message);
    }        
}

// ----------------------------------------------------------------------
// Local state Actions
// ----------------------------------------------------------------------


const completeTask = (taskId) => (dispatch, getState) => {
    dispatch(taskReducerActions.update({id: taskId, completed: true}));
}

function titleChanged(taskId, title) {    
    return taskReducerActions.update({id: taskId, title: title});
}

function taskDeleted(taskId) {
    return taskReducerActions.delete({id: taskId});
}

const actions = {
    titleChanged, taskDeleted
}

// ----------------------------------------------------------------------
// Selectors initialization
// ----------------------------------------------------------------------

// const getTasks = () => (state) => state.tasks.entities;
const getTasks = (state) => state.tasks.entities;
// const getTasksIsLoading = () => (state) => state.tasks.isLoading;
const getTasksIsLoading = (state) => state.tasks.isLoading;

export {
    taskReducer, actions, completeTask, loadTasks, createTask, getTasks, getTasksIsLoading
};

export default taskReducer;