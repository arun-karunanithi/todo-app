<template>
    <info-message v-if="!hasTasksInAllTasks" width="8%" style="margin-top: 10%;">
        <h4 style="color: gray;">Add a task to get started</h4>
    </info-message>
    <div class="task-list">
        <task-item 
        v-for="task in openTaskList"
        :key="task.id"
        :taskId ="task.id"
        :taskName="task.taskName" 
        :taskStatus="task.taskStatus" 
        :isFavorite="task.isFavorite" 
        :isMyDay="task.isMyDay" 
        class="task-item" ></task-item>
    </div>
    <button v-if="hasCompletedTasks" class="btn btn-light completed-button" @click="openCompletedTasks">
        <span>Completed</span>
        <i class="material-icons"> {{ openCompleted ? 'expand_less' : 'expand_more' }} </i>
    </button>
    <div v-if="openCompleted">
        <div class="task-list">
            <task-item 
            v-for="task in completedTaskList"
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
            openTaskList(){
                return this.$store.getters.openAllTasks;
            },
            completedTaskList(){
                return this.$store.getters.completedAllTasks;
            },
            hasCompletedTasks(){
                return this.$store.getters.hasCompletedTasksInAllTasks;
            },
            hasTasksInAllTasks(){
                return this.$store.getters.hasTasksInAllTasks;
            }
        },
        methods:{
            openCompletedTasks(){
                this.openCompleted = !this.openCompleted;
            }
        },
        mounted(){
            this.$emit('updateNavigation', 'All Tasks');
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