<script setup>
defineProps({
    configDetail: {
        type: Object,
        default: () => {}
    }
})

// console.log("props",props)
</script>

<template>
  <div class="info-background">
    <el-image fit="cover" style="width: 100%; height: 100%;">
      <template #error>
        <div class="image-slot">
          <el-icon></el-icon>
        </div>
      </template>
    </el-image>
  </div>
  <div class="info-avatar">
    <router-link to="/"><el-avatar :src="configDetail.blog_avatar" /></router-link>
    <span class="blog-name">{{ configDetail.blog_name }}</span>
  </div>
  <div class="personality-signature">{{ configDetail.personality_signature }}</div>
</template>

<style scoped lang="scss">
.info-background {
  height: 8rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info-avatar {
  display: flex;
  justify-content: flex-start;

  .el-avatar {
    position: relative;
    width: 60px;
    height: 60px;
    transition: ease-in-out 1s;
    background-color: #fff;
    margin: -2rem 0 0 1rem;

    &:hover {
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
    }
  }

  .blog-name {
    padding: 0.5rem 0 0 0.5rem;
    color: #222;
    font-size: 14px;
  }
}
.personality-signature {
  height: 5rem;
  padding: 8px;
  color: var(--font-color-title);
  font-size: 1em;
  font-family: "DYBlack", serif;
}
</style>
