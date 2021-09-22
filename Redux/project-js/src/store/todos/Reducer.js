import { TodoTypes } from './Type';
import { createSelector } from 'reselect';

export const initialTodoState = {
  items: [],
  filter: 'all',
  loading: false,
};

export default function todoReducer(state = initialTodoState, action) {
  switch (action.type) {
    case TodoTypes.RESET: {
      return { ...initialTodoState };
    }
    case TodoTypes.SAVE_TODOS: {
      return { ...state, items: action.payload };
    }
    case TodoTypes.SAVE_FILTER: {
      return { ...state, filter: action.filter };
    }
    case TodoTypes.LOADING_TODOS: {
      return { ...state, loading: action.status };
    }

    default:
      return state;
  }
}

const selectedFilter = (state) => state.todos.filter;
const selectTodos = (state) => state.todos.items;
const selectLoading = (state) => state.todos.loading;

export const selectFilteredTodos = createSelector(selectedFilter, selectTodos, selectLoading, (filter, todos) => {
  if (filter === 'all') {
    return todos;
  }
  return todos.filter((todo) => (filter === 'completed' ? todo.completed === true : todo.completed === false));
});

export const selectedLoadingStat = createSelector(selectLoading, (loading) => loading);
