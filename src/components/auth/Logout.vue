<template>
    <div></div>
</template>

<script>
    export default {
        name: "Logout",
        created() {
            // eslint-disable-next-line no-unused-vars
            this.$store.dispatch('removeToken').then(response => {
                this.$router.push({name: 'home'})
                }
            )
            this.$store.dispatch('clearTodos')
        }
    }
</script>

<style scoped>

</style>