/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Todo } from '@/components/models';

export interface TodoList {
  prop: boolean;
  todo_list: Array<Todo>;
}

const state: TodoList = {
  prop: false,
  todo_list: []
};

export default state;
