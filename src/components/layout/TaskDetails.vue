<template>
    <info-message  v-if="selectedTaskId===null" width="20%">
        <p>Select a task to see the task details</p>
    </info-message>
    <div v-else>
        <div class="generic-container" @click="showDetails">
            <div class="generic-icon-and-text">
                <i class="material-icons hover-effect" @click="switchStatus"> {{ selectedTaskDetails.taskStatus === 'open' ? 'radio_button_unchecked' : 'radio_button_checked' }} </i>
                <input class="task-name-field" :class="selectedTaskDetails.taskStatus" type="text" v-model.trim="editTaskName" @keydown.enter="$refs.taskNameField.blur()" ref="taskNameField" @blur="updateTaskName">
            </div>
            <br class="br"/>
            <subtask-item 
            v-for="subtask in selectedTaskDetails.subtasks"
            :key="subtask.subtaskId"
            :id="subtask.subtaskId"
            :name="subtask.subtaskName"
            :status="subtask.subtaskStatus"
            @swithSubtaskStatus="swithSubtaskStatus"
            @updateSubtaskName="updateSubtaskName"
            @removeSubtask="removeSubtask"></subtask-item>
            <div class="add-button-container-for-more-margin">
                <div class="generic-icon-and-text hover-effect" @click="focusNewSubtaskField">
                    <i class="material-icons" :style="{color: addingNewSubtask ? 'black' : 'blue'}"> {{ addingNewSubtask ? 'radio_button_unchecked' : 'add' }} </i>
                    <input ref="newSubtaskNameField" class="new-subtask-name-field" type="text" v-model.trim="newSubtaskName" @keydown.enter="addNewSubtask('enter')"  @blur="addNewSubtask('blur')" :placeholder="computedSubtaskPlaceholder">
                </div> 
            </div>
        </div>
        <div class="generic-container hover-effect">
            <div class="generic-icon-and-text" @click="switchFavorite">
                <i class="material-icons" :style="{color: selectedTaskDetails.isFavorite ? '#f1c40f' : 'black'}"> {{ selectedTaskDetails.isFavorite ? "star" : "star_border" }} </i>
                <p class="task-title"> {{ selectedTaskDetails.isFavorite ? "Added to Favorites" : "Add to Favorites" }} </p>
            </div>
        </div>
        <div class="generic-container hover-effect">
            <div class="generic-icon-and-text" @click="switchMyDay">
                <i 
                :class="{'material-icons' : selectedTaskDetails.isMyDay, 'material-icons-outlined' : !selectedTaskDetails.isMyDay}" 
                :style="{color: selectedTaskDetails.isMyDay ? '#2980b9' : 'black'}">light_mode</i>
                <p class="task-title">{{ selectedTaskDetails.isMyDay ? 'Added to My Day' : 'Add to My Day' }} </p>
            </div>
        </div>
        <div class="generic-container">
            <textarea class="description-textarea" ref="taskNotesField" v-model.trim="editNotesValue" @blur="updateTaskNotes" placeholder="Add Notes"></textarea>
        </div>
        <div class="generic-container hover-effect">
            <div class="generic-icon-and-text" style="color: red;" @click="deleteTask">
                <i class="material-icons">delete</i>
                <p class="task-title">Delete Task</p>
            </div>
        </div>
    </div>
</template>

<script>
    import SubtaskItem from '../ui/SubtaskItem.vue'

    export default{
        data(){
            return{
                editNotesValue: null,
                editTaskName: null,
                addingNewSubtask: false,
                newSubtaskName: null,
            }
        },
        components:{SubtaskItem: SubtaskItem},
        props: ['selectedTaskDetails', 'selectedTaskId'],
        watch: {
            selectedTaskDetails(newValue) {
                this.editNotesValue = newValue.notes;
                this.editTaskName = newValue.taskName;
            },
        },
        methods:{
            focusNewSubtaskField(){
                this.addingNewSubtask = true;
                this.$refs.newSubtaskNameField.focus()
                console.log( this.addingNewSubtask)
            },
            switchStatus(){
                if(this.selectedTaskDetails.taskStatus === 'open'){
                    this.$store.dispatch('switchStatus', {id:this.selectedTaskDetails.id, taskStatus: 'done'})
                } else if(this.selectedTaskDetails.taskStatus === 'done'){
                    this.$store.dispatch('switchStatus', {id:this.selectedTaskDetails.id, taskStatus: 'open'})
                }
            },
            switchFavorite(){
                this.$store.dispatch('switchFavorite', {id:this.selectedTaskDetails.id, isFavorite:this.selectedTaskDetails.isFavorite})
            },
            switchMyDay(){
                this.$store.dispatch('switchMyDay', {id:this.selectedTaskDetails.id, isMyDay:this.selectedTaskDetails.isMyDay})
            },
            swithSubtaskStatus(subtaskId, subtaskStatus){
                if(subtaskStatus === 'open'){
                    this.$store.dispatch('swithSubtaskStatus', {
                    id:this.selectedTaskDetails.id,
                    subtaskId:subtaskId,
                    subtaskStatus: 'done'})
                } else if(subtaskStatus === 'done'){
                    this.$store.dispatch('swithSubtaskStatus', {
                    id:this.selectedTaskDetails.id,
                    subtaskId:subtaskId,
                    subtaskStatus: 'open'})
                }
            },
            updateTaskName(){
                this.$store.dispatch('updateTaskName', {
                    id:this.selectedTaskDetails.id,
                    taskName:this.editTaskName})
            },
            updateSubtaskName(subtaskDetails){
                this.$store.dispatch('updateSubtaskName', {
                    id: this.selectedTaskDetails.id,
                    ...subtaskDetails})
            },
            removeSubtask(subtaskId){
                this.$store.dispatch('removeSubtask', {
                    id:this.selectedTaskDetails.id,
                    subtaskId:subtaskId})
            },
            addNewSubtask(position){
                if(this.newSubtaskName !== '' && this.newSubtaskName !== null){
                    this.$store.dispatch('addNewSubtask', {
                        id:this.selectedTaskDetails.id,
                        subtaskName:this.newSubtaskName})
                }
                this.newSubtaskName = null;
                if(position === 'enter'){
                    this.addingNewSubtask = true;
                } else if (position === 'blur'){
                    this.addingNewSubtask = false;
                }
            },
            updateTaskNotes(){
                if (this.editNotesValue !== this.selectedTaskDetails.notes){
                    this.$store.dispatch('updateTaskNotes', {
                    id:this.selectedTaskDetails.id,
                    updatedNotes: this.editNotesValue})
                }
            },
            deleteTask(){
                this.$emit('deleteTask', this.selectedTaskDetails.id)
            }
        },
        computed:{
            computedSubtaskPlaceholder(){
                if (this.addingNewSubtask){
                    return ''
                } else {
                    return 'Add Subtask'
                }
            }
        },
        mounted(){
            if(this.selectedTaskId !== null){
                this.editNotesValue = this.selectedTaskDetails.notes;
                this.editTaskName = this.selectedTaskDetails.taskName;   
            }
        }
    }
</script>

<style scoped>

.info-icon-no-task{
    size: 500%;
}

.generic-container{
    background-color: white;
    padding: 12px;
    margin: 12px 0 auto 0;
    border-radius: 6px;
}

.generic-icon-and-text{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
}

.task-title{
    margin: 0;
}

.br{
    content: '';
    display: block;
    margin-top: 12px;
    margin-bottom: 12px;
    border-bottom: 0.5px solid gray;;
}

.add-subtask-button{
    padding: 0;
    color: blue;
    margin-top: 4px;
}

.description-textarea{
    width: 100%;
    height: 160px;
    resize: none;
    border: 0;
}

.description-textarea:focus{
    outline: none;
}

.done{
    text-decoration: line-through;
}

.hover-effect{
    cursor: pointer;
}

.task-name-field{
    width: 100%;
    font-size: 1.25rem;
    font-weight: 600;
    border: 0;
}

.task-name-field:focus{
    outline: none;
}

.new-subtask-name-field{
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    border: 0;
}

.new-subtask-name-field:focus{
    outline: none;
}

.new-subtask-name-field::placeholder{
    color: blue;
}

.add-button-container-for-more-margin{
    margin-top: 4px;
}
</style>