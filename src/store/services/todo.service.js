import httpService from './http.service';

const TODO_ENDPOINT = 'todos';


const todoService = {
    fetch: async () => {
        const { data } = await httpService.get(TODO_ENDPOINT, 
            {params: {
                _page: 1,
                _limit: 10
            }}
        );

        return data;
    },
    create: async () => {
        const { data } = await httpService.post(TODO_ENDPOINT, 
            {                
                title: 'New task',
                completed: true
            }           
        );        
        return data;
    }
};

export default todoService;
