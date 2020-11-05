import { Todo } from '@/components/models';
import { MutationTree } from 'vuex';
import { TodoList } from './state';

const mutation: MutationTree<TodoList> = {
  addNewToDo(state: TodoList, todo: Todo) {
    // your code
    state.todo_list.push(todo);
  },
  // updateToDo(state: TodoList, todo: Todo) {
  //   // should do the partialy update here instead of rewrote
  //   // the whole list (abusing saveList() )
  // },
  saveList(state: TodoList, list: Todo[]) {
    state.todo_list = [...list];
  }
};

export default mutation;
