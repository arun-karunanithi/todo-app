export default{
    openAllTasks(state){
        const openAllTasks = state.tasks.filter(task => task.taskStatus === 'open');
        return openAllTasks;
    },
    completedAllTasks(state){
        const openAllTasks = state.tasks.filter(task => task.taskStatus === 'done');
        return openAllTasks;
    },
    hasTasksInAllTasks(state){
        return state.tasks.some(task => task.taskName)
    },
    hasCompletedTasksInAllTasks(state){
        return state.tasks.some(task => task.taskStatus === 'done')
    },
    openFavoriteTasks(state){
        const openFavoriteTasks = state.tasks.filter(task => (task.taskStatus === 'open' && task.isFavorite));
        return openFavoriteTasks;
    },
    completedFavoriteTasks(state){
        const completedFavoriteTasks = state.tasks.filter(task => (task.taskStatus === 'done' && task.isFavorite));
        return completedFavoriteTasks;
    },
    hasTasksInFavoriteTasks(state){
        return state.tasks.some(task =>  task.isFavorite)
    },
    hasCompletedTasksInFavoriteTasks(state){
        return state.tasks.some(task => (task.taskStatus === 'done' && task.isFavorite))
    },
    openMyDayTasks(state){
        const openMyDayTasks = state.tasks.filter(task => (task.taskStatus === 'open' && task.isMyDay));
        return openMyDayTasks;
    },
    completedMyDayTasks(state){
        const completedMyDayTasks = state.tasks.filter(task => (task.taskStatus === 'done' && task.isMyDay));
        return completedMyDayTasks;
    },
    hasTasksInMyDayTasks(state){
        return state.tasks.some(task =>  task.isMyDay)
    },
    hasCompletedTasksInMyDayTasks(state){
        return state.tasks.some(task => (task.taskStatus === 'done' && task.isMyDay))
    },
    fetchSelectedTaskDetails: (state) => (taskId) => {
        return state.tasks.find((task) => task.id === taskId);
    }
}