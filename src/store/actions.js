export default{
    async fetchTaskDetails(context){
        const response = await fetch('https://http-course-f3e8f-default-rtdb.firebaseio.com/tasks.json')

        if(!response.ok){
            const error = new Error(response.statusText || 'Something went wrong. Please try again')
            throw error;
        } else {
            const responseData = await response.json();
            const tasks = [];
            for(let key in responseData){
                const task = {
                    id: key,
                    taskName: responseData[key].taskName,
                    taskStatus: responseData[key].taskStatus,
                    subtasks: [],
                    isFavorite: responseData[key].isFavorite,
                    isMyDay: responseData[key].isMyDay,
                    notes: responseData[key].notes
                }
                for(let key2 in responseData[key].subtasks){
                    const subtask ={
                        subtaskId: key2,
                        subtaskName: responseData[key].subtasks[key2].subtaskName,
                        subtaskStatus: responseData[key].subtasks[key2].subtaskStatus
                    }
                    task.subtasks.push(subtask)
                }
                tasks.push(task);
            }
            context.commit('fetchTaskDetails', tasks);
        }
    },
    async addTask(context, data){
        const newTask = {};
        newTask.taskName = data.enteredTaskTitle; 
        newTask.taskStatus = 'open';
        newTask.subtasks = [];
        newTask.notes = '';
        if(data.selectedTab === 'All Tasks'){
            newTask.isFavorite = false;
            newTask.isMyDay = false;
        } else if(data.selectedTab === 'Favorites'){
            newTask.isFavorite = true;
            newTask.isMyDay = false;
        } else if(data.selectedTab === 'My Day'){
            newTask.isFavorite = false;
            newTask.isMyDay = true;
        }

        const response = await fetch('https://http-course-f3e8f-default-rtdb.firebaseio.com/tasks.json',{
            method: 'POST',
            body: JSON.stringify(newTask)

        })
        if (!response.ok){
            const error = new Error(response.statusText || "Something went wrong")
            throw error;
        } else{
            const responseData = await response.json();
            context.commit('addTask', {
            id: responseData.name,
            ...newTask});
        }
    },
    async switchFavorite(context, data){
        const response = await fetch(`https://http-course-f3e8f-default-rtdb.firebaseio.com/tasks/${data.id}.json`, {
            method: 'PATCH',
            body: JSON.stringify({isFavorite: !data.isFavorite})
        })
        
        if (!response.ok){
            const error = new Error(response.statusText || "Something went wrong")
            console.log(error);
            throw error;
        } else{
        context.commit('switchFavorite', data)
        }
    },
    async switchMyDay(context, data){
        const response = await fetch(`https://http-course-f3e8f-default-rtdb.firebaseio.com/tasks/${data.id}.json`, {
            method: 'PATCH',
            body: JSON.stringify({isMyDay: !data.isMyDay})
        })
        
        if (!response.ok){
            const error = new Error(response.statusText || "Something went wrong")
            console.log(error);
            throw error;
        } else{
        context.commit('switchMyDay', data)
        }
    },
    async switchStatus(context, data){
        const response = await fetch(`https://http-course-f3e8f-default-rtdb.firebaseio.com/tasks/${data.id}.json`, {
            method: 'PATCH',
            body: JSON.stringify({taskStatus: data.taskStatus})
        })
        
        if (!response.ok){
            const error = new Error(response.statusText || "Something went wrong")
            throw error;
        } else{
        context.commit('switchStatus', data)
        }
    },
    async updateTaskName(context, data){
        const response = await fetch(`https://http-course-f3e8f-default-rtdb.firebaseio.com/tasks/${data.id}.json`, {
            method: 'PATCH',
            body: JSON.stringify({taskName: data.taskName})
        })
        
        if (!response.ok){
            const error = new Error(response.statusText || "Something went wrong")
            throw error;
        } else{
        context.commit('updateTaskName', data)
        }
    },
    async swithSubtaskStatus(context, data){
        const response = await fetch(`https://http-course-f3e8f-default-rtdb.firebaseio.com/tasks/${data.id}/subtasks/${data.subtaskId}.json`, {
            method: 'PATCH',
            body: JSON.stringify({subtaskStatus: data.subtaskStatus})
        })
        
        if (!response.ok){
            const error = new Error(response.statusText || "Something went wrong")
            throw error;
        } else{
        context.commit('swithSubtaskStatus', data)
    }
    },
    async updateSubtaskName(context, data){
        const response = await fetch(`https://http-course-f3e8f-default-rtdb.firebaseio.com/tasks/${data.id}/subtasks/${data.subtaskId}.json`, {
            method: 'PATCH',
            body: JSON.stringify({subtaskName: data.updatedSubtaskName})
        })
        
        if (!response.ok){
            const error = new Error(response.statusText || "Something went wrong")
            throw error;
        } else{
        context.commit('updateSubtaskName', data)
        }
    },
    async removeSubtask(context, data){
        const response = await fetch(`https://http-course-f3e8f-default-rtdb.firebaseio.com/tasks/${data.id}/subtasks/${data.subtaskId}.json`, {
            method: 'DELETE'
        })
        
        if (!response.ok){
            const error = new Error(response.statusText || "Something went wrong")
            throw error;
        } else{
        context.commit('removeSubtask', data)
        }
        
    },
    async addNewSubtask(context, data){
        const response = await fetch(`https://http-course-f3e8f-default-rtdb.firebaseio.com/tasks/${data.id}/subtasks.json`, {
            method: 'POST',
            body: JSON.stringify({subtaskName: data.subtaskName, subtaskStatus: 'open'})
        })
        
        if (!response.ok){
            const error = new Error(response.statusText || "Something went wrong")
            throw error;
        } else{
        const responseData = await response.json();
        context.commit('addNewSubtask', {
            subtaskId: responseData.name,
            ...data})
        }
    },
    async updateTaskNotes(context, data){
        const response = await fetch(`https://http-course-f3e8f-default-rtdb.firebaseio.com/tasks/${data.id}.json`, {
            method: 'PATCH',
            body: JSON.stringify({notes: data.updatedNotes})
        })
        
        if (!response.ok){
            const error = new Error(response.statusText || "Something went wrong")
            throw error;
        } else{
        context.commit('updateTaskNotes', data)
        }
    },
    async deleteTask(context, data){
        const response = await fetch(`https://http-course-f3e8f-default-rtdb.firebaseio.com/tasks/${data}.json`, {
            method: 'DELETE'
        })
        
        if (!response.ok){
            const error = new Error(response.statusText || "Something went wrong")
            throw error;
        } else{
        context.commit('deleteTask', data)
        }
    }
}