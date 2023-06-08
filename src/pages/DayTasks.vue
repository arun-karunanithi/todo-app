<template>
    <info-message v-if="!hasTasksInMyDayTasks" width="8%" style="margin-top: 10%;">
        <h4 style="color: gray;">You have no tasks marked for today</h4>
    </info-message>
    <div class="task-list">
        <task-item 
        v-for="task in openMyDayTasks"
        :key="task.id"
        :taskId ="task.id"
        :taskName="task.taskName" 
        :taskStatus="task.taskStatus" 
        :isFavorite="task.isFavorite" 
        :isMyDay="task.isMyDay" 
        class="task-item" ></task-item>
    </div>
    <button v-if="hasCompletedTasksInMyDayTasks" class="btn btn-light completed-button" @click="openCompletedTasks">
        <span>Completed</span>
        <i class="material-icons"> {{ openCompleted ? 'expand_less' : 'expand_more' }} </i>
    </button>
    <div v-if="openCompleted">
        <div class="task-list">
            <task-item 
            v-for="task in completedMyDayTasks"
            :key="task.id"
            :taskId ="task.id"
            :taskName="task.taskName" 
            :taskStatus="task.taskStatus" 
            :isFavorite="task.isFavorite" 
            :isMyDay="task.isMyDay" 
            class="task-item" ></task-item>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                openCompleted: false
            }
        },
        computed:{
            openMyDayTasks(){
                return this.$store.getters.openMyDayTasks;
            },
            completedMyDayTasks(){
                return this.$store.getters.completedMyDayTasks;
            },
            hasTasksInMyDayTasks(){
                return this.$store.getters.hasTasksInMyDayTasks;
            },
            hasCompletedTasksInMyDayTasks(){
                return this.$store.getters.hasCompletedTasksInMyDayTasks;
            }
        },
        methods:{
            openCompletedTasks(){
                this.openCompleted = !this.openCompleted;
            }
        },
        mounted(){
            this.$emit('updateNavigation', 'My Day');
        }
    }
</script>

<style scoped>
.task-item{
    margin-bottom: 8px;
}

.completed-button{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 8px;
}

.completed-button i{
    margin-left: 4px;
}
</style>