<template>
    <div class="parent q-col-gutter-sm full-width row wrap justify-center items-start ">
        <div class="child col-6 " >Child 1</div>
        <div class="child col-6 " >Child 2</div>
        <div class="child col-grow full-width self-center" >Child 3</div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'Grid',
    props: [
        'title'
    ],
    data() {
        return {

        }
    }
})
</script>
<style>
.parent {
    padding: 1rem;
}
.child {
    border: solid 1px #ccc9;
    padding: 10px;
    /* margin: 0.3rem auto; */
}
</style>