<template>
    <div class="popup">
    <div class="popup-content">
      <h4>{{ title }}</h4>
      <p>{{ message }}</p>
      <div class="button-group">
          <button @click="deleteTask" class="btn btn-danger delete-button">
            <i class="material-icons">delete</i>
            <span>Delete</span>
          </button>
          <button @click="closePopup" class="btn btn-light close-button">Close</button>
       </div>
    </div>
    <div class="popup-overlay" @click="closePopup"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    message: String,
  },
  methods: {
    closePopup() {
      this.$emit('close');
    },
    deleteTask(){
        this.$emit('deleteTask')
    }
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background: #fff;
  padding: 20px;
  text-align: left;
  z-index: 101;
  border-radius: 6px;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.button-group{
    display: flex;
    flex-direction: row-reverse;
    gap: 16px;
}

.delete-button{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: 48px;
  padding: auto;
}

.close-button{
  height: 48px;
  padding-left: 24px;
  padding-right: 24px;
}
</style>