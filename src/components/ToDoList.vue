<template>
  <div
    class="q-pa-md full-width full-height justify-center items-start content-start full-border"
  >
    <div class="row self-start items-start fixed input-block">
      <div class="col-12 items-start module-title">{{ title }}</div>
      <div class="col-12 content-stretch">
        <q-input
          class="q-mx-md"
          color="orange"
          button-slots
          standout
          v-model="todoText"
          v-on:keyup.enter="addTodo"
          label-slot
          clearable
        >
          <!-- <template v-slot:before>
            <q-icon name="event" />
          </template> -->
          <template v-slot:label>
            <strong>What</strong> need to be
            <strong class="text-deep-orange">DONE</strong>!
          </template>
          <template v-slot:hint>
            Any work or task you need to do...
          </template>
          <template v-slot:append>
            <q-btn
              round
              dense
              flat
              color="primary"
              @click="addTodo"
              icon="add"
            />
          </template>
        </q-input>
      </div>
    </div>
    <div
      id="todos"
      class="q-pa-md top-gap row full-height justify-center items-stretch "
    >
      <div
        class="row full-width items-stretch justify-center todo-ls"
        v-for="todo in todos"
        :key="todo.id"
        @click="increment"
      >
        <q-input
          button-slots
          v-model="todo.content"
          clearable
          label-slot
          :readonly="todo.id !== editId"
          :disable="todo.completed"
          :filled="todo.id === editId"
          v-on:keyup.enter="edit(todo.id)"
        >
          <template v-slot:label>
            Added: {{ new Date(todo.addDate).toLocaleString('vi-VN') }}
          </template>
          <template v-if="!todo.completed && todo.id !== editId" v-slot:after>
            <q-btn
              flat
              round
              color="positive"
              icon="check"
              @click="complete(todo)"
            />
            <q-btn
              flat
              color="negative"
              round
              icon="clear"
              @click="remove(todo)"
            />
          </template>
          <template v-if="!todo.completed" v-slot:before>
            <q-btn
              flat
              color="secondary"
              round
              icon="edit"
              @click="edit(todo.id)"
            />
          </template>
          <template v-else v-slot:before>
            <q-btn
              flat
              color="negative"
              round
              icon="delete"
              @click="remove(todo)"
            />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row items-end">
      <div class="col">Count: {{ todoCount }} / {{ meta.totalCount }}</div>
      <div class="col">Clicks on todos: {{ clickCount }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Todo, Meta } from './models';
import SpeechToText from '@/components/SpeechToText.vue';
// import * as fs from 'fs';
// let file = '../data/todo.json';

@Component
export default class ToDoList extends Vue {
  @Prop({ type: String, required: true }) readonly title!: string;
  @Prop({ type: Array, default: () => [] }) readonly todos!: Todo[];
  @Prop({ type: Object, required: true }) readonly meta!: Meta;
  @Prop(Boolean) readonly active!: boolean;

  clickCount = 0;
  todoText = '';
  editId = -1;

  increment() {
    this.clickCount += 1;
  }

  get todoCount() {
    return this.todos.length;
  }

  addTodo() {
    let newData = {
      id: this.todos.length ? this.todos[this.todos.length - 1].id + 1 : 1,
      content: this.todoText,
      completed: false,
      addDate: Date.now(),
      completeDate: -1
    };
    if (this.todoText.length)
      this.$store
        .dispatch('todoList/addToDo', newData)
        .then(() => {
          console.log('New Todo Added.');
        })
        .catch(err => console.log(err));
    // this.saveToFile();
    this.todos.push(newData);
    this.todoText = '';
    this.saveData();
  }

  edit(id: number) {
    // console.log(this.editId, this.todos[id - 1]);
    if (this.editId !== -1) {
      if (this.todos[this.editId] && this.todos[this.editId].content !== '')
        this.editId = id;
      if (this.editId === id) this.editId = -1;
    } else {
      this.editId = id;
    }
    // this.saveToFile();
    this.saveData();
  }

  complete(todo: Todo) {
    todo.completed = true;
    todo.completeDate = Date.now();
    this.saveData();
  }
  remove(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.saveData();
  }

  saveData() {
    this.$store
      .dispatch('todoList/saveList', this.todos)
      .catch(err => console.log(err));
  }
  // saveToFile() {
  //   let data = JSON.stringify(this.todos, null, 2);
  //   fs.writeFile(file, data, err => {
  //     if (err) throw err;
  //     console.log('File saved.');
  //   });
  // }
}
</script>

<style>
/* .row {
  padding: 16px;
} */
.module-title {
  font-weight: bold;
  padding: 10px;
  border-bottom: 1px inset #cccc;
  margin-bottom: 5px;
}
.full-border {
  border: 1px solid #cccc;
  padding: 5px;
  margin: 5px auto;
  background-color: #ddd6;
}
.todo-ls {
  border: 1px solid #eee;
  padding: 10px !important;
  display: block;
  background-color: #fff !important;
}

.top-gap {
  margin-top: 100px;
}

.input-block {
  background-color: #eee !important;
  padding-bottom: 20px;
  opacity: 1;
  z-index: 999;
  margin-top: -10px;
}

.q-field--standout .q-field__control {
  background-color: #cccd;
}
</style>
