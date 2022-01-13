import { createSlice } from '@reduxjs/toolkit';

// const ACTION_TYPES = {
//     taskUpdated: 'taskUpdated',
//     taskDeleted: 'taskDeleted',
// };

const INITIAL_STATE = [
	{id: 1, title: 'Task 1', completed: false},
	{id: 2, title: 'Task 2', completed: false},
];

// const deleteAction = createAction(ACTION_TYPES.taskDeleted);
// const updateAction = createAction(ACTION_TYPES.taskUpdated);

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

// const taskReducer = createReducer(INITIAL_STATE, (builder) => {
//     builder
//         .addCase(updateAction, (state, action) => {
//             const payload = action.payload;
// 			const index = state.findIndex(e => e.id === payload.id);
// 			if (index >= 0) {				                
// 				state[index] = {...state[index], ...payload};	                				
// 			}     
//         })
//         .addCase(deleteAction, (state, action) => {
//             // Oops!!! This way doesn't works here
//             // state = state.filter(task => task.id !== action.payload.id);
//             return state.filter(task => task.id !== action.payload.id);
//         });
// });

const {reducer: taskReducer, actions: taskReducerActions} = taskSlice;

function taskCompleted(taskId) {								
    // return updateAction(
    //     {id: taskId, completed: true}
    // );
    return taskReducerActions.update({id: taskId, completed: true});
}

function titleChanged(taskId, title) {
    // return updateAction(
    //     {id: taskId, title: title}
    // );
    return taskReducerActions.update({id: taskId, title: title});
}

function taskDeleted(taskId) {
    // return deleteAction(
    //     {id: taskId}
    // );
    return taskReducerActions.delete({id: taskId});
}

const actions = {
    taskCompleted, titleChanged, taskDeleted
}

export {
    taskReducer, actions
};

// console.log('slice', taskSlice);
// console.log('actions',  taskSlice.actions);
// console.log('reducers',  taskSlice.reducer);

// console.log('slice', taskSlice);
// console.log('t/actions',  taskReducerActions);
// console.log('t/reducers',  taskReducer);

export default taskReducer;