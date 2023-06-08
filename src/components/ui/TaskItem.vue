<template>
    <div class="card overall-card" style="width: 100%;" @click="getTaskId(taskId)">
        <div class="card-body row task-card">
            <div class="col-10 radio-and-name">
            <i class="material-icons hover-effect" @click.stop="switchStatus"> {{ checkStatus }} </i>
            <h5 class="task-title" :class="taskStatus" style="cursor: default;"> {{ taskName }} </h5>
            </div>
            <div class="col-2 star-and-my-day">
                <i class="material-icons hover-effect" :style="{color: isFavorite ? '#f1c40f' : 'black'}" @click.stop="switchFavorite"> {{ isFavorite ? "star" : "star_border" }} </i>
                <i class="hover-effect" :class="{'material-icons' : isMyDay, 'material-icons-outlined' : !isMyDay}" :style="{color: isMyDay ? '#2980b9' : 'black'}" @click.stop="switchMyDay"> light_mode </i>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        inject:['getTaskId'],
        props:['taskId','taskName', 'taskStatus', 'isFavorite', 'isMyDay'],
        computed:{
            checkStatus(){  //To define the type of radio icon
                if(this.taskStatus === 'done'){
                    return "radio_button_checked"
                } else if(this.taskStatus === 'open'){
                    return "radio_button_unchecked"
                }return ""
            }
        },
        methods:{
            switchFavorite(){
                this.$store.dispatch('switchFavorite', {id:this.taskId, isFavorite: this.isFavorite})
            },
            switchMyDay(){
                this.$store.dispatch('switchMyDay', {id:this.taskId, isMyDay:this.isMyDay})
            },
            switchStatus(){
                if(this.taskStatus === 'open'){
                    this.$store.dispatch('switchStatus', {id:this.taskId, taskStatus: 'done'})
                } else if(this.taskStatus === 'done'){
                    this.$store.dispatch('switchStatus', {id:this.taskId, taskStatus: 'open'})
                }
            }
        }
    }
</script>

<style scoped>
.overall-card{
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.overall-card:active{
    box-shadow: none;
}

.task-card{
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.task-card .radio-and-name{
  display: inline-flex;
  gap: 12px;
  align-items: center;
}

.task-card .radio-and-name h5{
  margin: 0;
  font-size: 1rem;
}

.star-and-my-day{
  display: inline-flex;
  flex-direction: row-reverse;
  gap: 20px;
  align-items: center;
}

.done{
    text-decoration: line-through;
}

.task-title{
    word-break: break-all;
}

.hover-effect{
    cursor: pointer;
}
</style>