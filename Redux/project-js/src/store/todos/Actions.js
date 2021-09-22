import { TodoTypes } from './Type';

export function setTodos(payload) {
  return {
    type: TodoTypes.SAVE_TODOS,
    payload,
  };
}

export function reset() {
  return {
    type: TodoTypes.RESET,
  };
}

export function setFilter(filter) {
  return {
    type: TodoTypes.SAVE_FILTER,
    filter,
  };
}

export function setLoading(status) {
  return {
    type: TodoTypes.LOADING_TODOS,
    status,
  };
}

export function loadTodos() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    dispatch(setLoading(false));
    return dispatch(setTodos(data));
  };
}
