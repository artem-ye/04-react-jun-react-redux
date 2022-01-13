import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = [
	{id: 1, title: 'Task 1', completed: false},
	{id: 2, title: 'Task 2', completed: false},
];

const taskSlice = createSlice({
    name: 'task',
    initialState: INITIAL_STATE,
    reducers: {
        update(state, action) {
            const payload = action.payload;
			const index = state.findIndex(e => e.id === payload.id);
			if (index >= 0) {				                
				state[index] = {...state[index], ...payload};	                				
			}  
        },
        delete(state, action) {
            return state.filter(task => task.id !== action.payload.id);
        }
    }
});


const {reducer: taskReducer, actions: taskReducerActions} = taskSlice;

// function taskCompleted(taskId) {								 
//     return taskReducerActions.update({id: taskId, completed: true});
// }
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

export {
    taskReducer, actions, completeTask
};

export default taskReducer;