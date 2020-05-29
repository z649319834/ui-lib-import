<template>
  <div class="tal-button">
    <slot>按钮</slot>
  </div>
</template>

<script>
export default {
  name: 'TalButton'
}
</script>

<style scoped>
.tal-button {
  width: 100px;
  height: 30px;
  color: aqua;
  background: red;
  border: 1px solid red;
  text-align: center;
  line-height: 30px;
}
</style>
