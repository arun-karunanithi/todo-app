export default{
    fetchTaskDetails(state, payload){
        state.tasks = payload;
    },
    addTask(state, payload){
        state.tasks.push(payload);
    },
    switchFavorite(state,payload){
        const task = state.tasks.find(task => task.id === payload.id);
        if (task) {
        task.isFavorite = !payload.isFavorite;
        }
    },
    switchMyDay(state,payload){
        const task = state.tasks.find(task => task.id === payload.id);
        if (task) {
        task.isMyDay = !payload.isMyDay;
        }
    },
    switchStatus(state,payload){
        const task = state.tasks.find(task => task.id === payload.id);
        if (task) {
                task.taskStatus = payload.taskStatus;
        }
    },
    updateTaskName(state,payload){
        const task = state.tasks.find(task => task.id === payload.id);
        if (task){
            task.taskName = payload.taskName;
        }
    },
    swithSubtaskStatus(state,payload){
        const task = state.tasks.find(task => task.id === payload.id);
        if (task) {
            const subtask = task.subtasks.find(subtask => subtask.subtaskId === payload.subtaskId);
            if (subtask){
                    subtask.subtaskStatus = payload.subtaskStatus;
            }
        }
    },
    updateSubtaskName(state,payload){
        const task = state.tasks.find(task => task.id === payload.id);
        if (task) {
            const subtask = task.subtasks.find(subtask => subtask.subtaskId === payload.subtaskId);
            if (subtask){
                subtask.subtaskName = payload.updatedSubtaskName
            }
        }
    },
    removeSubtask(state,payload){
        const task = state.tasks.find(task => task.id === payload.id);
        if (task) 
            {const subtaskIndex = task.subtasks.findIndex((subtask) => subtask.subtaskId === payload.subtaskId);
                if (subtaskIndex !== -1) {
                    task.subtasks.splice(subtaskIndex, 1);
                }
        }   
    },
    addNewSubtask(state,payload){
        const task = state.tasks.find(task => task.id === payload.id);
        if (task) {
            const newSubtask ={};
            newSubtask.subtaskId = payload.subtaskId;
            newSubtask.subtaskName = payload.subtaskName;
            newSubtask.subtaskStatus = 'open';
            task.subtasks.push(newSubtask);
            console.log(newSubtask);
        }
        console.log(state);
    },
    updateTaskNotes(state,payload){
        const task = state.tasks.find(task => task.id === payload.id);
        if (task){
            task.notes = payload.updatedNotes;
        }
    },
    deleteTask(state, payload){
        const taskIndex = state.tasks.findIndex((task) => task.id === payload);
            if (taskIndex !== -1) {
                state.tasks.splice(taskIndex, 1);
            }
    }
}