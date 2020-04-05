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
        computed:{
            filter(){
                return this.$store.state.filter
            }
        },
        methods:{
            changeFilter(data){
                this.$store.dispatch('updateFilter', data)
            }
        }
    }
</script>

<style scoped>

</style>