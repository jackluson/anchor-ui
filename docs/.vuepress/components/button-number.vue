
<template>
  <div class="box-vue">
    <button @click="plus">+</button>
    <button @click="minus">-</button>
    <OutboundLink
      >https://element.eleme.cn/#/zh-CN/component/installation
    </OutboundLink>
    {{ number }}
  </div>
</template>
<script>
export default {
  name: "button-number",
  data() {
    return {
      number: 2,
    };
  },
  mounted() {
    console.log("this", this);

    console.log("ji");
  },
  methods: {
    plus() {
      this.number++;
    },
    minus() {
      this.number--;
    },
  },
};
</script>
<style>
.box-vue {
  color: red;
}
</style>
