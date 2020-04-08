<template>
  <div id="app" class="container">
    <img class="logo" alt="Vue logo" src="./assets/logo.png">
    <todo-list msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
  }
  .container{
    max-width: 600px;
    margin: 0 auto;
  }
  .logo{
    display: block;
    margin: 20px auto;
    height: 50px;
  }
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  !*text-align: center;*!*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
