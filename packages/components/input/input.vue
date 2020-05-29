<template>
  <div class="tal-input">
    <label>名称</label>
    <slot>
      <input type="text" placeholder="请输入文字" />
    </slot>
  </div>
</template>

<script>
export default {
  name: 'TalInput'
}
</script>

<style scoped>
.tal-input {
  width: 200px;
  height: 30px;
  border: 1px solid red;
}
</style>
