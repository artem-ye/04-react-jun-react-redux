export const ACTION_TYPES = {
    taskUpdated: 'taskUpdated'
}

export function taskReducer(state, action) {
	const {type, payload} =  action;

	switch(type) {		
		case ACTION_TYPES.taskUpdated:
			const newState = [...state];
			const index = newState.findIndex(e => e.id === payload.id);
			if (index >= 0) {				
				newState[index] = {...newState[index], ...payload};				
				return newState;
			} 
			break;		
		default:
			break;
	}

	return state;
}
