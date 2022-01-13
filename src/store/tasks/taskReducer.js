export const ACTION_TYPES = {
    taskUpdated: 'taskUpdated',
    taskDeleted: 'taskDeleted',
}

export function taskReducer(state, action) {
	const {type, payload} =  action; 
    let newState;   

	switch(type) {		
		case ACTION_TYPES.taskUpdated:
			newState = [...state];
			const index = newState.findIndex(e => e.id === payload.id);
			if (index >= 0) {				                
				newState[index] = {...newState[index], ...payload};	                
				return newState;
			}                    
			break;
        case ACTION_TYPES.taskDeleted:            
            return state.filter(task => task.id !== payload.id);
		default:
			break;
	}

    console.log('State are', state);

	return state;
}
