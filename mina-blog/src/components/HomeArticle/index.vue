<script setup>

</script>

<template>
<el-row>
  <template>

  </template>
</el-row>
</template>

<style lang="scss" scoped>
.no-article {
  color: var(--font-color);
  margin: 10px auto;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

/** mobile */
@media screen and (max-width: 768px) {
  @include b(articleBox) {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    height: 30rem;
  }
}

@media screen and (min-width: 768px) {
  @include b(articleBox) {
    display: flex;
    align-items: center;
    height: 20rem;
  }
}
</style>
