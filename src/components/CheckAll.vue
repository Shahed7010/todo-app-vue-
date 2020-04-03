<template>
    <div><label for=""><input type="checkbox"
                              :checked="!anyRemaining" @change="checkAllTodos"> check all</label></div>
</template>

<script>
    export default {
        name: "CheckAll",
        props:{
            anyRemaining:{
                type: Boolean,
                required: true
            }
        },
        methods:{
            checkAllTodos(){
                window.eventBus.$emit('checkedAll')
            }
        }
    }
</script>

<style scoped>

</style>