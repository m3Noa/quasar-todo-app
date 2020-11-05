/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { TodoList } from './state';
import demo from '../../data/todo.json';

const actions: ActionTree<TodoList, StateInterface> = {
  checkListData ({commit, state}) {
    // your code
    if(!state.todo_list.length) {
      const localData = localStorage.getItem('taskList');
      if(localData && localData !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment    
        commit('saveList', JSON.parse(localData));
        console.log('Get data from local storage:');
      }
      else {
        // console.log({localData});
        commit('saveList',demo);
        localStorage.setItem('taskList', JSON.stringify(demo));
        console.log('Get data from demo file and store in local storage');
      } 
    }      
  }, 
  
  saveList({commit}, data) {
    if(data) {
      commit('saveList', data);
      localStorage.setItem('taskList', JSON.stringify(data));
    }
  },

  addToDo({commit}, data) {
    if(data) commit('addNewToDo', data)
  },

  // updateTodo({commit}, data) {
  //   // should do some checkings before updating the content
  // }

};

export default actions;
