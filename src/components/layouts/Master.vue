<template>
    <div id="app">
    <ul class="nav">
        <li><router-link :to="{name: 'home'}" >Home</router-link></li>
        <li><router-link :to="{name: 'app'}" >App</router-link></li>
        <li><router-link :to="{name:'about'}">About</router-link></li>
        <li><router-link :to="{name: 'login'}">Login</router-link></li>
        <li><router-link :to="{name: 'register'}">Register</router-link></li>
    </ul>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Master"
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
</style>