import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { createSore } from './store/createStore';
import { ACTION_TYPES, taskReducer } from './store/taskReducer';

const INITIAL_STATE = [
	{id: 1, title: 'Task 1', completed: false},
	{id: 2, title: 'Task 2', completed: false},
];
const store = createSore(taskReducer, INITIAL_STATE);

const App = () => {
	const [storeState, setStoreState] = useState(store.getState());

	useEffect(() => {
		store.subscribe(
			(newState) => setStoreState(newState)			
		);
	}, []);

	const completeTask = (taskId) => {								
		store.dispatch({type: ACTION_TYPES.taskUpdated, payload: {id: taskId, completed: true}});
	};
	
	const changeTask = (taskId, title) => {
		store.dispatch({type: ACTION_TYPES.taskUpdated, payload: {id: taskId, title: title}});
	}
	
	return (
		<>
			<h1>React app</h1>		
			<>
				<ul>
					{storeState.map(task => 
						<li key={task.id}>
							ID: {task.id}; Task: {task.title}; Completed: {(task.completed && 'YES') || 'NO'}&nbsp;
							<button onClick={() => completeTask(task.id)}>Done</button>&nbsp;
							<button onClick={() => changeTask(task.id, task.title + ' updated')}>Update title</button>
							<hr/>
						</li>
					)}
				</ul>
			</>
		</>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);


