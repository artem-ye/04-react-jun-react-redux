import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import initStore from './store/store';
import { actions, completeTask } from './store/task';

const store = initStore();

const App = () => {
	const [storeState, setStoreState] = useState(store.getState());	

	useEffect(() => {
		store.subscribe(
			() => setStoreState(store.getState())			
		);
	}, []);

	// const completeTask = (taskId) => {										
	// 	store.dispatch(actions.taskCompleted(taskId));
	// 	store.dispatch((dispatch, getState) => {
	// 		console.log(dispatch);
	// 		console.log(getState);
	// 	});
	// 	// store.dispatch({});
	// };
	
	const changeTaskTitle = (taskId, title) => {
		store.dispatch(actions.titleChanged(taskId, title));		
	}

	const deleteTask = (taskId) => {
		store.dispatch(actions.taskDeleted(taskId));		
	}
	
	return (
		<>
			<h1>React app</h1>		
			<>
				<ul>
					{storeState.map(task => 
						<li key={task.id}>
							ID: {task.id}; Task: {task.title}; Completed: {(task.completed && 'YES') || 'NO'}
							<div>
								<button onClick={() => store.dispatch(completeTask(task.id))}>Done</button>&nbsp;
								<button onClick={() => changeTaskTitle(task.id, task.title + ' updated')}>Update title</button>&nbsp;
								<button onClick={() => deleteTask(task.id)}>Delete</button>
							</div>
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


