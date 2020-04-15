import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL= "http://127.0.0.1:8000/api"
export const store = new Vuex.Store({
    state:{
        filter: 'all',
        todos:[],
        token: localStorage.getItem('access_token') || null,
    },
    getters:{
        loggedIn(state){
          return   state.token != null
        },
        remaining(state){
            return state.todos.filter(todo => !todo.completed).length
        },
        anyRemaining(state, getters){
            return getters.remaining != 0
        },
        completed(state){
            return state.todos.filter(todo => todo.completed).length > 0
        },
        filterTodos(state){
            if (state.filter == 'all'){
                return state.todos
            }else if(state.filter == 'active'){
                return state.todos.filter(todo => !todo.completed)
            }else if(state.filter == 'completed'){
                return state.todos.filter(todo => todo.completed)
            }
            return state.todos
        }
    },
    mutations:{
        addTodo(state, todo){
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: false,
                editing: false
            })
        },
        doneEdit(state, todo){
            const index = state.todos.findIndex(item => item.id == todo.id)
            state.todos.splice(index, 1, {
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                editing: todo.editing,
            })
        },
        deleteTodo(state, id){
            const index = state.todos.findIndex(item => item.id == id)
            state.todos.splice(index, 1)
        },
        clearCompleted(state){
            state.todos = state.todos.filter(todo => !todo.completed)
        },
        updateFilter(state, filter){
            state.filter = filter
        },
        checkAllTodos(state, checked){
            state.todos.forEach(todo => todo.completed = checked)
        },
        retrieveTodos(state, todos){
            state.todos = todos
        },
        loginToken(state, token){
            state.token = token
        },
        removeToken(state){
            state.token = null
        },
        clearTodos(state){
            state.todos = []
        }
    },
    actions:{
        clearTodos(context){
          context.commit('clearTodos')
        },
        registerUser(context, credentials ){
            return new Promise((resolve, reject) => {
                axios.post("/register",{
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password
                }).then(response => {
                    resolve(response)
                }).catch(error =>{
                    console.log(error)
                    reject(error)
                })
            })

        },
        removeToken(context){
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            if (context.getters.loggedIn){
                return new Promise((resolve, reject) => {
                    axios.post("/logout").then(response => {
                        localStorage.removeItem('access_token')
                        context.commit('removeToken')
                        resolve(response)
                    }).catch(error =>{
                        localStorage.removeItem('access_token')
                        context.commit('removeToken')
                        console.log(error)
                        reject(error)
                    })
                })
            }
        },
        loginToken(context, credentials ){
            return new Promise((resolve, reject) => {
                axios.post("/login",{
                    username: credentials.email,
                    password: credentials.password
                }).then(response => {
                    const token = response.data.access_token
                    localStorage.setItem('access_token', token)
                    context.commit('loginToken', token)
                    resolve(response)
                }).catch(error =>{
                    console.log(error)
                    reject(error)
                })
            })

        },
        retrieveTodo(context){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            axios.get("/todos").then(response => {
                context.commit('retrieveTodos', response.data)
                }).catch(error =>{
                    console.log(error)
            })
        },
        retrieveUser(context){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            return new Promise((resolve, reject) => {
                axios.get("/user").then(response => {
                    resolve(response)
                }).catch(error => {
                    console.log(error)
                    reject(error)
                })
            })
        },
        addTodo(context, todo){
            axios.post("/todos",{
                title: todo.title,
                completed: false,
            }).then(response => {
                context.commit('addTodo', response.data)
            }).catch(error =>{
                console.log(error)
            })
        },
        doneEdit(context, todo){
            axios.patch("/todos/" + todo.id,{
                title: todo.title,
                completed: todo.completed
            }).then(response => {
                context.commit('doneEdit', response.data)
            }).catch(error =>{
                console.log(error)
            })
        },
        deleteTodo(context, id){
            axios.delete("/todos/" + id).then(
                context.commit('deleteTodo', id)
            ).catch(error =>{
                console.log(error)
            })
        },
        clearCompleted(context){
            const completed = store.state.todos.filter(item => item.completed)
                .map(item => item.id)
            axios.delete("/destroyCompleted/" + completed
            ).then(
                context.commit('clearCompleted')
            ).catch(error =>{
                console.log(error)
            })
        },
        updateFilter(context, filter){
            context.commit('updateFilter',filter)
        },
        checkAllTodos(context, checked){
            axios.patch("/markCompleted" , {
                completed: checked
            }).then(
                context.commit('checkAllTodos', checked)
            ).catch(error =>{
                console.log(error)
            })
        }
    }
})