import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {entities: []};

const errorSlice = createSlice({
    name: 'error',
    initialState: INITIAL_STATE,
    reducers: {
        set(state, action) {
            state.entities.push(action.payload);
            state.isLoading = false;
        },      
    }
});

const {actions, reducer: errorReducer} = errorSlice;

const setError = (message) => (dispatch) => {
    dispatch(actions.set(message));
}

const getError = (state) => state.errors.entities[0];

export {
    setError, getError
};

export default errorReducer;
