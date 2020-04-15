<template>
    <div class="login-form">
        <h2 class="login-heading">Register</h2>
        <div v-if="serverError" class="server-error">
            <div v-for="(value, key) in serverError" :key="key">
                {{value[0]}}
            </div>
        </div>
        <form action="#" @submit.prevent="register">

            <div class="form-control">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" class="login-input" v-model="name">
            </div>

            <div class="form-control">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" class="login-input" v-model="email">
            </div>

            <div class="form-control mb-more">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" class="login-input" v-model="password">
            </div>

            <div class="form-control">
                <button type="submit" class="btn-submit">Create Account</button>
            </div>

        </form>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data(){
            return{
                name: '',
                email: '',
                password: '',
                serverError:'',
            }
        },
        methods:{
            register(){
                this.$store.dispatch('registerUser',{
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    // eslint-disable-next-line no-unused-vars
                }).then(response => {
                        this.$router.push({ name: 'login',params:{
                            success: 'user registered successfully'
                            }})
                    }
                ).catch(error => {
                    this.serverError = error.response.data.errors
                })
            }
        }
    }
</script>

<style scoped>

</style>