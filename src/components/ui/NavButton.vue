<template>
        <button class="btn" :class="buttonStyle" :style="{ width: showName ? '136px' : '48px', 'margin-right': showName ? '16px' : '8px' }">
            <i class="material-icons" :class="{'with-margin' : showName, 'no-margin' : !showName}"> {{ iconName }} </i>
            <span> {{ showName ? buttonName : ''}} </span>
        </button>
</template>

<script>
export default{
    props: ['buttonName', 'iconName', 'selected', 'showName'],
    computed:{
        buttonStyle(){
            if(this.buttonName === this.selected){
                return "btn-primary"
            } else{
                return "btn-outline-primary"
            }
        }
    }
}
</script>

<style scoped>
button{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  height: 48px;
  width: 136px;
  padding: auto;
}

.with-margin{
  margin-right: 4px;
}

.no-margin{
  margin-right: 0px;
}
</style>