<template>
    <div>
        <button :class="{active : filter=='all'}" @click="changeFilter('all')">all</button>
        <button :class="{active : filter=='active'}" @click="changeFilter('active')">queue</button>
        <button :class="{active : filter=='completed'}" @click="changeFilter('completed')">completed</button>
    </div>
</template>

<script>
    export default {
        name: "FilterOption",
        data(){
            return{
                filter: 'all',
            }
        },
        methods:{
            changeFilter(data){
                this.filter=data
                window.eventBus.$emit('changeFilter', data)
            }
        }
    }
</script>

<style scoped>

</style>