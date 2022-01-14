import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
// import {  } from 'react-redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { getError } from './store/errors';
import configureStore from './store/store';
import { actions, completeTask, getTasks, getTasksIsLoading, loadTasks } from './store/task';

const store = configureStore();

const App = () => {		
	const state = useSelector(getTasks);
	const isLoading = useSelector(getTasksIsLoading);
	const error = useSelector(getError);
	const dispatch = useDispatch();

	// console.log(state);

	useEffect(() => {
		dispatch(loadTasks());		
	}, []);
	
	const changeTaskTitle = (taskId, title) => {
		dispatch(actions.titleChanged(taskId, title));		
	}

	const deleteTask = (taskId) => {
		dispatch(actions.taskDeleted(taskId));		
	}

	if (isLoading) {
		return <h1>Loading...</h1>
	}

	if (error) {
		return <h2>ERROR: {error}</h2>;
	}
	
	return (
		<>
			<h1>React app</h1>	
			<button onClick={() => console.log('Done')}>Add new task</button>	
			<>
				<ul>
					{state.map(task => 
						<li key={task.id}>
							ID: {task.id}; Task: {task.title}; Completed: {(task.completed && 'YES') || 'NO'}
							<div>
								<button onClick={() => dispatch(completeTask(task.id))}>Done</button>&nbsp;
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
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);


