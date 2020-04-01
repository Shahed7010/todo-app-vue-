<template>
    <div class="todo-item animated bounce fast">
    <div class="todo-items">
        <input type="checkbox" v-model="completed" @change="doneEdit">
        <div v-if="!editing" class="todo-item-label" v-bind:class="{completed : completed}" @dblclick="editTodo">{{todo.title}}</div>
        <input v-else v-focus class="todo-item-edit" type="text" v-model="title" @blur="doneEdit"  @keyup.enter="doneEdit">
    </div>
    <button v-if="editing" @click="cancelEdit">cancel</button>
    <div @click="removeTodo(index)" class="remove-item">&times;</div>
    </div>
</template>

<script>
    export default {
        name: "TodoItem",
        props: {
            todo:{
                type: Object,
                required: true
            },
            index:{
                type: Number,
                required: true
            },
            checkAll:{
                type: Boolean,
                required: true
            }
        },

        data(){
            return{
                id: this.todo.id,
                title: this.todo.title,
                completed: this.todo.completed,
                editing: this.todo.editing,
                beforeEdit: ''
            }
        },
        watch:{
            checkAll(){
                if (this.checkAll){
                    this.completed = true
                }else {
                    this.completed = this.todo.completed
                }
            }
        },

        methods:{
            removeTodo(index) {
                this.$emit('removedItem', index)
            },
            editTodo(){
                this.beforeEdit = this.title
                this.editing=!this.editing
            },
            doneEdit(){
                if (this.title === ''){
                    this.title = this.beforeEdit
                }
                this.editing = false
                this.$emit('finishedEdit',{
                    todo:{
                        id: this.id,
                        title: this.title,
                        completed: this.completed,
                        editing: this.editing,
                    },
                    index: this.index
                })
            },
            cancelEdit(){
                this.title = this.beforeEdit
                this.editing = false
            },
        },
        directives: {
            focus: {
                inserted: function (el) {
                    el.focus()
                }
            }
        },
    }
</script>

<style scoped>

</style>