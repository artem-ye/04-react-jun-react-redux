import { ACTION_TYPES } from './taskReducer';

export function taskCompleted(taskId) {								
    return{
        type: ACTION_TYPES.taskUpdated, 
        payload: {id: taskId, completed: true}
    };
}

export function titleChanged(taskId, title) {
    return{
        type: ACTION_TYPES.taskUpdated, 
        payload: {id: taskId, title: title}
    };
}

export function taskDeleted(taskId) {
    return{
        type: ACTION_TYPES.taskDeleted, 
        payload: {id: taskId}
    };
}