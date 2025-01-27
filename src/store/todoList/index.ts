import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { TodoList } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const storeModule: Module<TodoList, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default storeModule;
