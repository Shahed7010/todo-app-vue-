<template>
   <div>
       <div class="name_container">Welcome {{name}}</div>
       <input type="text" class="todo-input" placeholder="whats next" v-model="newTodo" @keyup.enter="addTodo">
       <todo-item v-for="(todo, index) in filterTodos" :key="todo.id" :todo="todo" :index="index" :checkAll="!anyRemaining">
<!--           <div class="todo-items">-->
<!--               <input type="checkbox" v-model="todo.completed">-->
<!--               <div v-if="!todo.editing" class="todo-item-label" v-bind:class="{completed : todo.completed}" @dblclick="editTodo(todo)">{{todo.title}}</div>-->
<!--               <input v-else v-focus class="todo-item-edit" type="text" v-model="todo.title"  @keyup.enter="doneEdit(todo)">-->
<!--           </div>-->
<!--           <button v-if="todo.editing" @click="cancelEdit(todo)">cancel</button>-->
<!--           <div @click="removeTodo(index)" class="remove-item">&times;</div>-->
       </todo-item>
       <div class="extra-container">
            <check-all></check-all>
           <filter-option ></filter-option>
           <div>
               <button v-if="completed" @click="clearCompleted">clear completed</button>
           </div>
           <div>{{remaining}} items to do</div>
       </div>
   </div>
</template>

<script>
    import TodoItem from "./TodoItem";
    import CheckAll from "./CheckAll";
    import FilterOption from "./FilterOption";

    export default {
        name: 'todo-list',
        components:{
            TodoItem,
            CheckAll,
            FilterOption,
        },
        data() {
            return{
                newTodo: '',
                todoid: 3,
                beforeEdit:'',
                name: '',
            }
       },
        created(){
          // window.eventBus.$on('removedItem', (index)=> this.removeTodo(index))
          // window.eventBus.$on('finishedEdit', (data)=> this.finishedEdit(data))
          // window.eventBus.$on('checkedAll', (data)=> this.checkAllTodos(data))
          // window.eventBus.$on('changeFilter', (data)=> this.$store.state.filter= data)
            this.$store.dispatch('retrieveTodo')
            this.$store.dispatch('retrieveUser').then( response => {
                this.name = response.data.name
                })
        },

        methods:{
            addTodo(){
                if (this.newTodo.trim().length === 0){
                    return
                }
                this.$store.dispatch('addTodo', {
                    id: this.todoid,
                    title: this.newTodo,

                })

                this.newTodo = ''
                this.todoid++
            },
            clearCompleted(){
                this.$store.dispatch('clearCompleted')
            }
        },
        computed:{
            remaining(){
                return this.$store.getters.remaining
            },
            anyRemaining(){
                return this.$store.getters.anyRemaining
            },
            completed(){
                return this.$store.getters.completed
            },
            filterTodos(){
                return this.$store.getters.filterTodos
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");
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
    .name_container{
        display: flex;
        justify-content: center;
        font-weight: bold;
        color: #42b983;
        margin-bottom: 20px;
    }
</style>
