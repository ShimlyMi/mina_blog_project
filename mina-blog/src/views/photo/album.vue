<script setup name="Album">
import {ref, onMounted} from "vue";
import {getAllAlbum} from "@/api/album.js";
import SkeletonItem from "@/components/SkeletonItem/index.vue"
import {Picture as IconPicture} from '@element-plus/icons-vue'

const albumList = ref([])
const loading = ref(false)

const getAll = async () => {
  loading.value = true
  let res = await getAllAlbum()
  // console.log("album", res)
  if (res && res.code == 0) {
    albumList.value = res.result
    loading.value = false
  }
}
onMounted(() => {
  getAll()
})
</script>

<template>
  <div class="mi-album">
    <el-row class="center_box">
      <el-col :span="24">
        <el-card class="mi-album__card">
          <el-row v-if="loading" class="row-space">
            <el-col v-for="item in 8" :key="item" :sm="6" :xs="12" class="col-space">
              <div class="flex_center">
                <el-skeleton animated>
                  <template #template>
                    <SkeletonItem height="8rem" variant="image" width="100%"/>
                  </template>
                </el-skeleton>
              </div>
            </el-col>
          </el-row>
          <el-row v-else class="row-space">
            <el-col v-for="item in albumList" :key="item.id" :sm="7" :xs="12" class="col-space">
              <div
                  v-image="item.album_cover"
                  class="mi-album__box"
              >
                <div class="mi-album--mask">
                  <span class="name text_overflow"> {{ item.album_name }}</span>
                  <span class="desc text_overflow">{{ item.description }}</span>
                </div>
                <el-image
                    :src="item.album_cover"
                    class="mi-album--image animate__animated animate__bounceIn"
                    fit="cover"
                    lazy
                >
                  <template #error>
                    <div class="w-[100%] h-[100%] grid place-items-center image-slot">
                      <el-icon>
                        <icon-picture/>
                      </el-icon>
                    </div>
                  </template>
                </el-image>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
@include b(album) {
  @include e(card) {
    padding: 10px;
    min-height: 12em;
    cursor: pointer;
    margin-top: 25px;
  }

  @include e(box) {
    position: relative;
    width: 16rem;
    height: 10rem;
    transition: all 0.3s ease-in-out;
  }
  @include m(image) {
    border-radius: 8px;
    vertical-align: middle;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @include m(mask) {
    display: block;
    position: absolute;
    top: 0.8rem;
    left: 1rem;
    right: 1rem;
    bottom: 40%;
    border-radius: 5px;
    padding: 5px;
    z-index: 999;
    background: rgba(0, 0, 0, 0.2);
    .name {
      display: block;
      width: 100%;
      color: #fff;
      font-size: 1.4rem;
      font-weight: bold;
    }
    .desc {
      display: block;
      width: 100%;
      color: #fff;
      font-size: 1rem;
      font-weight: bold;
    }
  }
}

.mi-album__box:hover {
  filter: saturate(2) drop-shadow(0 0 5px rgba(0, 0, 0, 0.66));
  transform: translateY(-5px);
}

.row-space {
  padding: 0 !important;
}

.col-space {
  padding: 5px 2px !important;
}

@media screen and (max-width: 768px) {
  .mi-album__box {
    width: 12rem;
    height: 8rem;
  }
}
</style>
