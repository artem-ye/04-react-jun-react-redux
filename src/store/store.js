import {createStore} from 'redux';
import taskReducer  from './task';


function initStore() {		
    return createStore(taskReducer);
}

export default initStore;
