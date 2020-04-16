<template>
    <div class="login-form">
        <h2 class="login-heading">Login</h2>
        <div v-if="serverError" class="server-error">
            {{serverError}}
        </div>
        <div v-if="serverSuccess" class="server-success">
            {{serverSuccess}}
        </div>
        <form action="#" @submit.prevent="login">

            <div class="form-control">
                <label for="email">Username/Email</label>
                <input type="email" name="username" id="username" class="login-input" v-model="email">
            </div>

            <div class="form-control mb-more">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" class="login-input" v-model="password">
            </div>

            <div class="form-control">
                <button type="submit" class="btn-submit" :disabled="loading">
                    <div class="bar-spinner" v-if="loading">
                    <div class="loadingio-spinner-bars-mfz7rqo4kz"><div class="ldio-kdlwpjk415c">
                        <div></div><div></div><div></div><div></div>
                    </div></div>
                    </div>
                        Login
                </button>
            </div>

        </form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        props:{
          success:{
              type: String,
          }
        },
        data(){
            return {
                email: '',
                password: '',
                serverError:'',
                serverSuccess: this.success,
                loading: false,
            }
        },
        methods:{
            login(){
                this.loading = true
                this.$store.dispatch('loginToken',{
                    email: this.email,
                    password: this.password
                    // eslint-disable-next-line no-unused-vars
                }).then(response => {
                    this.loading = false
                    this.$router.push({ name: 'app'})
                    }
                ).catch(error =>{
                    this.loading = false
                    this.serverError = error.response.data
                    this.password=''
                    this.serverSuccess=''
                })
            }
        }

    }
</script>

<style scoped>

</style>