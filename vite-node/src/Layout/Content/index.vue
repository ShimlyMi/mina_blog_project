<template>
    <div class="yz-content">
        <div >111</div>
    </div>
</template>
<script setup lang="ts">

</script>

<style scoped lang="scss">
@include b(content) {
    flex: 1;
    overflow: auto;
    background: transparent linear-gradient(
          to right,
          rgba(184,203,184,.8) 0%,
          rgba(184,203,184,.8) 0%,
          rgba(180,101,218,.7) 0%,
          rgb(207,108,201,.7) 33%,
          rgba(238,96,156,.5) 66%,
          rgba(238,96,156,.5) 100%,
  );
  //min-height: calc(100vh - 80px);
}
</style>