<template>
    <div class="generic-icon-and-text" style="padding-bottom: 8px;">
        <i class="material-icons hover-effect" @click="swithSubtaskStatus"> {{ status === 'open' ? 'radio_button_unchecked' : 'radio_button_checked' }} </i>
        <input class="subtask-name-field" :class="status" type="text" v-model.trim="editSubtaskName" @keydown.enter="$refs.subtaskNameField.blur()" ref="subtaskNameField" @blur="updateSubtaskName">
        <i class="material-icons hover-effect close-icon" @click="removeSubtask"> close </i>
    </div>
</template>

<script>
    export default{
        props:['id', 'name', 'status'],
        data(){
            return{
                editSubtaskName: null
            }
        },
        methods:{
            swithSubtaskStatus(){
                this.$emit('swithSubtaskStatus', this.id, this.status)
            },
            updateSubtaskName(){
                if (this.editSubtaskName !== this.name){
                    this.$emit('updateSubtaskName', {
                        updatedSubtaskName: this.editSubtaskName,
                        subtaskId:this.id})
                }
            },
            removeSubtask(){
                this.$emit('removeSubtask', this.id)
            }
        },
        mounted(){
                this.editSubtaskName = this.name;
            },
    }
</script>

<style scoped>
.generic-icon-and-text{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
}

.task-title{
    margin: 0;
}

.done{
    text-decoration: line-through;
}

.hover-effect{
    cursor: pointer;
}

.close-icon{
    margin-left: auto;
    margin-right: 12px;
}

.subtask-name-field{
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    border: 0;
}

.subtask-name-field:focus{
    outline: none;
}
</style>