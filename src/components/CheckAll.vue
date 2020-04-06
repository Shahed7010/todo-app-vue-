<template>
    <div><label for=""><input type="checkbox"
                              :checked="!anyRemaining" @change="checkAllTodos"> check all</label></div>
</template>

<script>
    export default {
        name: "CheckAll",
        computed:{
            anyRemaining(){
                return this.$store.getters.anyRemaining
            }
        },
        methods:{
            checkAllTodos(){
                this.$store.dispatch('checkAllTodos',event.target.checked)
            }
        }
    }
</script>

<style scoped>

</style>