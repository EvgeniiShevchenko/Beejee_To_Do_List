const taskpost = {
    POST_NEW_TASK: "POST_NEW_TASK",
    REQUEST_TASK_COUNT_FROM_DATABASE: "REQUEST_TASK_COUNT_FROM_DATABASE",
    TASK_DISPLAED_TO_SCREN: "TASK_DISPLAED_TO_SCREN",
    TASK_DELETE_FROM_LIST: "TASK_DELETE_FROM_LIST",
    TASK_UPDATED: "TASK_UPDATED",
    SEARCH_REQUEST_FROM_HEADER: "SEARCH_REQUEST_FROM_HEADER",
    BUTTON_TASK_CREATE_PRES: "BUTTON_TASK_CREATE_PRES",
    CHANGE_SORT_TYPE: "CHANGE_SORT_TYPE",
    CHANGE_STATUS_COMPLETED: "CHANGE_STATUS_COMPLETED",
    BUTTON_TASK_PAGINATION_PRES: "BUTTON_TASK_PAGINATION_PRES",
    PAGINATION_TASK_REQUEST: "PAGINATION_TASK_REQUEST"
};


export const search_request_from_header = (search_request) => {
    return (dispatch) => {
        fetch(`/api/task/search/${search_request}`, {method: "GET"})
        .then(response => response.json())
        .then(task => {
            dispatch({
                type: "SEARCH_REQUEST_FROM_HEADER",
                payload: task
            })
        })
        .catch((error) => console.error(`Error search actions ${error}`))
    }
};
    
export const button_task_create = (state) => {
    return {
        type: "BUTTON_TASK_CREATE_PRES",
        payload: state
    }
};

export const task_displaed_to_scren = () => {
    return (dispatch) => {
        fetch("/api/task", {
            method: "GET"
        })
        .then(response => response.json())
        .then(task => {
            return dispatch({
                type: "TASK_DISPLAED_TO_SCREN",
                payload: task
            })
        })
        .catch(error => console.error('Error:', error));
    }
};

export const post_new_task = (data) => {
    return (dispatch) => {
        fetch("/api/task/add-task", {
        method: "POST",
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    })
        .then(response => response.json())
        .then(task => {
            dispatch({
                type: "POST_NEW_TASK",
                payload: {...data, _id: task.insertedId}
            });
        })
        .catch(error => console.error('Error:', error));
    }
};

export const task_delete_from_list = (idTask) => {
    return dispatch => {
        fetch(`/api/task/delete/${idTask}`, {method: "DELETE", headers: new Headers({
            'Authorization': localStorage.getItem('jwtToken'),
            'Content-Type': 'application/json'
          })
        })
        .then(response => response.json())
        .then(massage => {
            dispatch({
                type: "TASK_DELETE_FROM_LIST",
                payload: idTask
            })
        })
        .catch(error => console.error(`Error: ${error}`))
    }
};

export const change_sort_type = (filter) => {
    return {
        type: "CHANGE_SORT_TYPE",
        payload: filter
    }
};


export const button_task_pagination_pres = (number_page) => {
    return {
        type: "BUTTON_TASK_PAGINATION_PRES",
        payload: number_page
    }
};

export const request_taskcount_from_database = () => {
    return (dispatch) => {
        fetch("/api/task/count", {method: "GET"})
        .then(response => response.json())
        .then(string => parseInt(string))
        .then(number => {
            return dispatch({
                type: "REQUEST_TASK_COUNT_FROM_DATABASE",
                payload: number
            })
        })
        .catch(error => console.error('Error:', error));
    }
};

export const pagination_task_request = (curent_page, page_size, filter) => {
    button_task_pagination_pres(curent_page);
    const data = {
        "limit": page_size,
        "page": curent_page,
        "filter": filter 
    };
    return (dispatch) => {
        fetch("/api/task/pagination", {
            method: "POST",
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(task => {
            dispatch({
                type: "PAGINATION_TASK_REQUEST",
                payload: task
            });
        })
        .catch(error => console.error('Error:', error));
    }
};

export const change_status_completed = (idTask, curent_status) => {
    return (dispatch) => {
        fetch(`/api/task/status/${idTask}/${curent_status}`, {
            method: "PUT", 
            headers: new Headers({
                'Authorization': localStorage.getItem('jwtToken'),
                'Content-Type': 'application/json'
            })
        })
        .then(response => response.json())
        .then(task => {
            dispatch({
                type: "CHANGE_STATUS_COMPLETED",
                payload: {
                    "id": idTask,
                    "status": curent_status
                }
            });
        })
        .catch(error => console.error('Error:', error));
    }
};

export const task_updated = (idTask, task) => {
    return (dispatch) => {
            fetch(`/api/task/update/${idTask}`, {
            method: "PUT",
            body: JSON.stringify(task), 
            headers: new Headers({
                'Authorization': localStorage.getItem('jwtToken'),
                'Content-Type': 'application/json'
            })
        })
        .then(response => response.json())
        .then(massage => {
            dispatch({
                type: "TASK_UPDATED",
                payload: {
                    "id": idTask,
                    "task": task
                }
            });
        })
        .catch(error => console.error('Error:', error));
    }
};


export default taskpost;