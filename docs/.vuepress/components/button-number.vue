
<template>
  <div class="box-vue">
    <button @click="plus">+</button>
    <button @click="minus">-</button>
    {{ number }}
  </div>
</template>
<script>
export default {
  data(){
    return {
      number: 2
    }
  },
  methods: {
    plus () { this.number++ },
    minus () { this.number-- }
  }
}
</script>
<style>
.box-vue { color: red; }
</style>
