<script setup lang="ts" name="PanelGroup">
import CountTo from "vue-count-to";
const props = defineProps({
  label: {
    type: String,
    default: ""
  },
  value: {
    type: [String, Number],
    default: ""
  }
});
</script>
<template>
  <el-card class="m-[5px]">
    <div class="flex justify-between items-center card-panel">
      <div class="icon">
        <slot />
      </div>
      <div class="flex flex_col justify-between items-center">
        <span class="label">{{ props.label }}</span>
        <div class="value">
          <CountTo
            :duration="3600"
            :start-val="0"
            :end-val="props.value"
            class="card-panel-num"
          />
        </div>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.label {
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  margin-right: 5px;
  color: #666;
}

.value {
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  color: #666;
}

.icon {
  width: 48px;
  height: 48px;
  cursor: pointer;
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
