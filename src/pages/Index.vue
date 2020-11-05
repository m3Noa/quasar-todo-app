/* eslint-disable @typescript-eslint/no-unsafe-member-access */ /*
eslint-disable @typescript-eslint/no-unsafe-assignment */
<template>
  <q-page class="row items-center justify-evenly">
    <to-do-list
      title="My Personal To Do List "
      active
      :todos="ToDos"
      :meta="meta"
    ></to-do-list>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from '@/components/models';
import ToDoList from 'components/ToDoList.vue';
import { Vue, Component } from 'vue-property-decorator';
// import data from '../data/todo.json';

@Component({
  components: { ToDoList }
})
export default class Index extends Vue {
  meta: Meta = {
    totalCount: 1200
  };
  mounted() {
    this.$store.dispatch('todoList/checkListData').catch(e => console.log(e));
  }
  get ToDos(): Todo[] {
    let oldData = this.$store.getters['todoList/getTodoList'] as Todo[];
    console.log('From getter:', oldData);
    // create an entirely new array without sharing the
    // same pointers as the one loaded  from the Vuex's store
    let todos = JSON.parse(JSON.stringify(oldData)) as Todo[];
    console.log('reCloned', todos);
    return todos;
  }
}
</script>
