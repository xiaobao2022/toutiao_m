<template>
  <i :class="['toutiao', `toutiao-${icon}`]"></i>
  <!-- <i :class="['toutiao', `toutiao-${a}`]"></i> -->
</template>

<script>
export default {
  props: {
    icon: {
      type: String
    }
    // a: {
    //   type: String
    // }
  },
  mounted() {
    // console.log(this.icon)
  }
}
</script>

<style></style>
