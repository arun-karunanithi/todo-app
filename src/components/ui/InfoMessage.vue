<template>
    <div class="overall-container">
        <svg xmlns="http://www.w3.org/2000/svg" :width="width" viewBox="0 0 800 800">
        <path id="info_FILL0_wght0_GRAD0_opszNaN" d="M453-280h60V-520H453Zm26.982-314Q494-594,503.5-603.2A30.465,30.465,0,0,0,513-626q0-14.45-9.482-24.225a31.428,31.428,0,0,0-23.5-9.775,31.484,31.484,0,0,0-23.518,9.775Q447-640.45,447-626a30.493,30.493,0,0,0,9.482,22.8Q465.965-594,479.982-594Zm.284,514q-82.734,0-155.5-31.5T197.5-197.5Q143-252,111.5-324.841T80-480.5q0-82.819,31.5-155.659T197.5-763q54.5-54,127.341-85.5T480.5-880q82.819,0,155.659,31.5T763-763q54,54,85.5,127T880-480.266q0,82.734-31.5,155.5T763-197.684q-54,54.316-127,86T480.266-80Zm.234-60Q622-140,721-239.5t99-241Q820-622,721.188-721T480-820q-141,0-240.5,98.812T140-480q0,141,99.5,240.5T480.5-140ZM480-480Z" transform="translate(-80 880)" fill="#919191"/>
        </svg>
        <slot></slot>
    </div>
</template>

<script>
export default{
    props:['width']
}
</script>

<style scoped>
.overall-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
}
</style>