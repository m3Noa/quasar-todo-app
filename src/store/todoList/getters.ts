import { Todo } from './../../components/models';
import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import state, { TodoList } from './state';

const getters: GetterTree<TodoList, StateInterface> = {
  someAction (/* context */) {
    // your code
  },
  getTodoList():Todo[] {
    return state.todo_list;
  }
};

export default getters;
