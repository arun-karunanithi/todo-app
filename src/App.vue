<template>
  <delete-popup 
  v-if="isDeleteTask"
  class="popup-element" title="Are you sure you want to delete this task?" 
  message="Once deleted you will not be able to retrive the task data"
  @close="closeDeletePopup"
  @deleteTask="deleteTask"></delete-popup>
  <div class="container-fluid overallApp">
    <div class="row overall-row">
      <div v-if="!isScreenSizeAllowed && selectedTaskId !== null" class="col-12 mobile-task-details task-details-col">
        <mobile-taskdetails
        :selectedTaskId="selectedTaskId"
        :selectedTaskDetails="selectedTaskDetails"
        @deleteTask="initiateDeleteTask"
        @closeMobileTaskDetails="closeMobileTaskDetails"
        ></mobile-taskdetails>
      </div>
      <div  v-else class="col-md-8 col-12 tasks-col">
        <div class="navigation">
          <nav-button buttonName="All Tasks"  iconName="task" :selected="selectedTab" :showName=true @click="changeTab('All Tasks')"></nav-button>
          <nav-button buttonName="My Day" v-if="isScreenSizeAllowed" iconName="light_mode" :selected="selectedTab" :showName=true  @click="changeTab('My Day')"></nav-button>
          <nav-button buttonName="My Day" v-if="!isScreenSizeAllowed" iconName="light_mode" :selected="selectedTab" :showName=false  @click="changeTab('My Day')"></nav-button>
          <nav-button buttonName="Favorites" v-if="isScreenSizeAllowed" iconName="star" :selected="selectedTab" :showName=true  @click="changeTab('Favorites')"></nav-button>
          <nav-button buttonName="Favorites" v-if="!isScreenSizeAllowed" iconName="star" :selected="selectedTab" :showName=false  @click="changeTab('Favorites')"></nav-button>
        </div>
        <div class="task-lists">
          <router-view @updateNavigation="updateNavigation"></router-view>
        </div>
        <div class="footer-with-add-task">
          <div class="card add-task-bg-card">
          <div class="card-body row">
            <input type="text" name="myField" placeholder="Add Task" class="col-10 add-task-field" v-model="enteredTaskTitle" @keydown.enter="addTask">
            <button class="btn btn-primary col-2" style="border-radius: 0 5px 5px 0;"><i class="material-icons" @click="addTask"> done </i></button>
          </div>
        </div>
        </div>
      </div>
      <div class="col-4 task-details-col" v-if="isScreenSizeAllowed">
        <task-details 
        :selectedTaskId="selectedTaskId"
        :selectedTaskDetails="selectedTaskDetails"
        @deleteTask="initiateDeleteTask"
        ></task-details>
      </div>
    </div>
  </div>
</template>

<script>
import TaskDetails from './components/layout/TaskDetails.vue'
import MobileTaskdetails from './components/layout/MobileTaskdetails.vue'
import DeletePopup from './components/ui/DeletePopup.vue'

export default{
  components:{
    TaskDetails: TaskDetails,
    DeletePopup: DeletePopup,
    MobileTaskdetails: MobileTaskdetails
  },
  provide(){
    return{
      getTaskId: this.getTaskId,
    }
  },
  data(){
    return{
      selectedTab: 'All Tasks',
      enteredTaskTitle: '',
      selectedTaskId: null,
      selectedTaskDetails: null,
      isDeleteTask: false,
      taskIdToBeDeleted: null,
      isScreenSizeAllowed: true
    }
  },
  methods:{
    checkScreenSize() {
      this.isScreenSizeAllowed = window.innerWidth >= 768; // Adjust the screen size threshold as needed
    },
    changeTab(tabName){
      this.selectedTab = tabName;
      if( tabName === 'All Tasks'){
        this.$router.push('/all-tasks')
      }
      if( tabName === 'Favorites'){
        this.$router.push('/favorite-tasks')
      }
      if( tabName === 'My Day'){
        this.$router.push('/my-day-tasks')
      }
    },
    updateNavigation(tabName){
      this.selectedTab = tabName;
    },
    addTask(){
      if(this.enteredTaskTitle === ''){
        return
      } else {
        this.$store.dispatch('addTask', {
          selectedTab: this.selectedTab,
          enteredTaskTitle: this.enteredTaskTitle
        });
        this.enteredTaskTitle = '';
      }
    },
    getTaskId(taskId){
      this.selectedTaskId = taskId;
      this.selectedTaskDetails = this.$store.getters.fetchSelectedTaskDetails(taskId);
    },
    initiateDeleteTask(taskId){
      this.isDeleteTask = true;
      this.taskIdToBeDeleted = taskId;
    },
    closeDeletePopup(){
      this.isDeleteTask = false;
      this.taskIdToBeDeleted = null;
    },
    deleteTask(){
      this.$store.dispatch('deleteTask', this.taskIdToBeDeleted)
      this.isDeleteTask = false;
      this.taskIdToBeDeleted = null;
      this.selectedTaskId = null;
    },
    closeMobileTaskDetails(){
      this.taskIdToBeDeleted = null;
      this.selectedTaskId = null;
    }
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  unmounted() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
  created(){
    this.$store.dispatch('fetchTaskDetails')
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}

.overallApp{
  width: 100vw;
  margin: 0;
  padding: 0;
}

.overall-row{
  margin: 0;
}

.tasks-col{
  height: 100vh;
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.tasks-col::-webkit-scrollbar {
  width: 0; /* Adjust the width as needed */
}

.task-details-col{
  background-color: azure;
  height: 100vh;
}

.navigation{
  margin: 0 0 0 16px;
  position: sticky;
  top: 0;
  z-index: 90;
  background-color: white;
  padding-top: 12px;
  padding-bottom: 12px;
}

nav-button{
  margin-right: 16px;
}

.task-lists{
  margin: 4px 0 16px 16px; 
  margin-left: 16px;
}

.footer-with-add-task{
  background-color: white;
  width: 100%;
  padding-top: 4px;
  padding-bottom: 4px;
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 90;
  margin-top: auto;
}

.add-task-bg-card{
  margin: 8px 0 12px 16px; 
  padding: 0;
  border-radius: 6px;
  border: 1px solid grey;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.add-task-bg-card .card-body{
  padding: 0;
  margin: 0;
  width: 100%;
  background: none;
}

.add-task-field{
  border-width: 0;
  background: none;
}

.add-task-field:focus{
  outline: none;
}

.popup-element{
  z-index: 100;
}

.mobile-task-details{
  z-index: 91;
}
</style>