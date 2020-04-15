<template>
    <div id="app">
    <ul class="nav">
        <li><router-link :to="{name: 'home'}" >Home</router-link></li>
        <li><router-link :to="{name: 'app'}" >App</router-link></li>
        <li><router-link :to="{name:'about'}">About</router-link></li>
        <li v-if="!loggedIn"><router-link :to="{name: 'login'}">Login</router-link></li>
        <li v-if="!loggedIn"><router-link :to="{name: 'register'}">Register</router-link></li>
        <li v-if="loggedIn"><router-link :to="{name: 'logout'}">Logout</router-link></li>
    </ul>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Master",
        computed:{
            loggedIn(){
                return this.$store.getters.loggedIn
            }
        }
    }
</script>

<style>
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
        /*margin-top: 60px;*/
        height: 100vh;
    }
    .flex-center{
        display: flex;
        justify-content: center;
    }
    .nav{
        display: flex;
        padding: 15px 0;
        margin: 0;
        list-style: none;
        justify-content: flex-end;
        background: aliceblue;
        border-bottom: 1px solid darkgray;
        margin-bottom: 25px;
    }
    .nav a {
        color: #2c3e50;
        padding: 0 25px;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: .1rem;
        text-decoration: none;
        text-transform: uppercase;
    }
     /*Auth Pages*/
       label {
           display: block;
           margin-bottom: 4px;
       }
    .login-heading {
        margin-bottom: 16px;
    }
    .form-control {
        margin-bottom: 24px;
    }
    .mb-more {
        margin-bottom: 42px;
    }
    .login-form {
        max-width: 500px;
        margin: auto;
    }
    .login-input {
        width: 100%;
        font-size: 16px;
        padding: 12px 16px;
        outline: 0;
        border-radius: 3px;
        border: 1px solid lightgrey;
    }
    .btn-submit {
        width: 100%;
        padding: 14px 12px;
        font-size: 18px;
        font-weight: bold;
        background: #60BD4F;
        color: white;
        border-radius: 3px;
        cursor: pointer;
    &:hover {
         background: #42b983;
     }
    }
    .server-error{
        margin-bottom: 12px;
        padding: 10px 16px;
        font-size: 16px;
        background: lightpink;
        color: brown;
        border-radius: 4px;
    }
    .server-success{
        margin-bottom: 12px;
        padding: 10px 16px;
        font-size: 16px;
        background: lightgreen;
        color: #2c3e50;
        border-radius: 4px;
    }

</style>