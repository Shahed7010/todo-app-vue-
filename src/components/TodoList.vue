<template>
   <div>
       <input type="text" class="todo-input" placeholder="whats next" v-model="newTodo" @keyup.enter="addTodo">
       <div v-for="(todo, index) in filterTodos" :key="todo.id" class="todo-item">
           <div class="todo-items">
               <input type="checkbox" v-model="todo.completed">
               <div v-if="!todo.editing" class="todo-item-label" v-bind:class="{completed : todo.completed}" @dblclick="editTodo(todo)">{{todo.title}}</div>
               <input v-else v-focus class="todo-item-edit" type="text" v-model="todo.title"  @keyup.enter="doneEdit(todo)">
           </div>
           <button v-if="todo.editing" @click="cancelEdit(todo)">cancel</button>
           <div @click="removeTodo(index)" class="remove-item">&times;</div>
       </div>
       <div class="extra-container">
           <div><label for=""><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos"> check all</label></div>
           <div>
               <button :class="{active : filter=='all'}" @click="filter='all'">all</button>
               <button :class="{active : filter=='active'}" @click="filter='active'">queue</button>
               <button :class="{active : filter=='completed'}" @click="filter='completed'">completed</button>
           </div>
           <div>
               <button v-if="completed" @click="clearCompleted">clear completed</button>
           </div>
           <div>{{remaining}} items to do</div>
       </div>
   </div>
</template>

<script>
    export default {
        name: 'todo-list',
        data() {
            return{
                newTodo: '',
                todoid: 3,
                beforeEdit:'',
                filter: 'all',
                todos:[
                    {
                        id:1,
                        title:'complete the project',
                        completed: false,
                        editing : false,
                    },
                    {
                        id:2,
                        title:'get a job',
                        completed: false,
                        editing : false,
                    }
                ]
            }
       },
        directives: {
          focus: {
              inserted: function (el) {
                  el.focus()
              }
          }
        },
        methods:{
            addTodo(){
                if (this.newTodo.trim().length === 0){
                    return
                }
                this.todos.push({
                    id: this.todoid,
                    title: this.newTodo,
                    completed: false,
                    editing: false,
                })
                this.newTodo = ''
                this.todoid++
            },
            removeTodo(indx){
                this.todos.splice(indx, 1)
            },
            clearCompleted(){
                this.todos = this.todos.filter(todo => !todo.completed)
            },
            editTodo(todo){
                this.beforeEdit = todo.title
                todo.editing=!todo.editing
            },
            doneEdit(todo){
                if (todo.title === ''){
                    todo.title = this.beforeEdit
                }
                todo.editing = false
            },
            cancelEdit(todo){
                todo.title = this.beforeEdit
                todo.editing = false
            },
            checkAllTodos(){
                this.todos.forEach(todo => todo.completed = event.target.checked)
            }
        },
        computed:{
            remaining(){
                return this.todos.filter(todo => !todo.completed).length
            },
            anyRemaining(){
                return this.remaining != 0
            },
            completed(){
              return this.todos.filter(todo => todo.completed).length > 0
            },
            filterTodos(){
                if (this.filter == 'all'){
                    return this.todos
                }else if(this.filter == 'active'){
                    return this.todos.filter(todo => !todo.completed)
                }else if(this.filter == 'completed'){
                    return this.todos.filter(todo => todo.completed)
                }
                return this.todos
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.todo-input{
    width: 100%;
    padding: 10px 16px;
    font-size: 16px;
    margin-bottom: 14px;
    &:focus{
        outline: 0;
    }
}
.todo-item{
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;

}
    .remove-item{
        cursor: pointer;
        /*margin-left: 14px;*/
        font-size: 18px;
        &:hover{
            color: red;
        }
    }
    .todo-items{
        display: flex;
        align-items: center;
    }
    .todo-item-label{
        padding: 10px;
        border: 1px solid aliceblue;
        margin-left: 12px;
    }
    .todo-item-edit{
        width: 100%;
        font-size: 22px;
        margin-left: 12px;
        padding: 10px;
        border: 1px solid blue;
        &focus{
            outline: none;
        }
    }
    .completed{
        color: red;
    }
    .extra-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid #2c3e50;
        padding-top: 12px;
        margin-bottom: 14px;
    }
    button{
        font-size: 14px;
        background-color: white;
        appearance: none;
        &:hover{
            background: aqua;
        }
        &:focus{
            outline: none;
        }
    }
    .active{
        background: lawngreen;
    }
</style>
