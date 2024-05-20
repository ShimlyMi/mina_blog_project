<script setup name="Message">
import { reactive } from "vue";
import { MESSAGE_TYPE } from "vue-baberrage/src/lib/index.js";

</script>

<template>
<div class="message">
  <!-- 留言弹幕 -->
  <div class="bullet-wrap">

<!--    <div class="bullet-item" v-for="item in messageList" :key="item.id">-->
<!--      <div v-if="!item.user_id" class="no-user-message">-->
<!--        <el-avatar class="left-avatar" :src="getBlogAvatar">{{ item.nick_name }}</el-avatar>-->
<!--        <span class="user-message">{{ item.message }}</span>-->
<!--      </div>-->
<!--      <template v-else>-->
<!--        <el-avatar class="left-avatar" :src="item.avatar">{{ item.nick_name }}</el-avatar>-->
<!--        <span class="user-message">{{ item.message }}</span>-->
<!--      </template>-->
<!--    </div>-->
  </div>
  <div class="message-body">
<!--    <img src="../../assets/rosie.jpg" alt="">-->
    <div class="comment clearfix">
      <el-input
          v-model="form.message"
          class="publish"
          placeholder="留下什么再走吧~"
          clearable
          maxlength="12"
          type="text"
      />
    </div>
    <div class="p-btn">
      <el-button
          class="leave-message"
          @click="messgae"
      >发射</el-button>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.message {
  height: 100vh;
  background: url("../../assets/rosie.jpg") no-repeat fixed;
  background-size: cover;
  overflow: hidden;

  .bullet-wrap {
    height: 100%;
    position: relative;
    margin-top: 60px;
  }
  .bullet-item {
    position: absolute;
    min-width: 50px;
    text-align: center;
    border: 2px #fff solid;
    border-radius: 20px;
    color: #fff;
    font-size: 14px;
    animation: rightToLeft 10s linear both;
    .no-user-message {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 10px;
    }
    .left-avatar {
      width: 30px;
      height: 30px;
    }
    .user-message {
      color: #fff;
      margin-left: 0.3rem;
      letter-spacing: 1px;
      font-size: 16px;
    }
  }

  &-body {
    display: flex;
    overflow: hidden;
    .comment, p-btn {
      height: 100vh;
      position: relative;

    }
    .publish {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .p-btn {
      position: fixed;
      top: 50%;
      left: calc(50% + 150px);
      transform: translate(-50%, -50%);
    }

    .leave-message {
      width: 50px;
      height: 35px;
      border-radius: 10px;
      color: #fff;
      margin-left: 10px;
      background-color: transparent;
    }
  }
}

:deep(.el-input) {
  --el-input-bg-color: transparentize(0);
  --el-input-border-color: #fff;
  --el-input-text-color: #fff;
}
:deep(.el-input__inner) {
  &::placeholder{
    color: #fff;
  }
}

@keyframes rightToLeft {
  0% {
    transform: translate(100vw);
  }
  100% {
    transform: translate(-100%);
  }
}

// pc
@media screen and (min-width: 768px) {
  .center-top {
    .left-avatar {
      width: 48px;
      height: 48px;
    }
  }

  .publish-pc {
    position: fixed;
    top: 150px;
    right: 50px;
    z-index: 3001;
    cursor: pointer;
    border: none;
  }

  .publish-mobile {
    display: none;
  }
}

.publish {
  height: 35px;
  width: 250px;
  :deep(.el-input__wrapper) {
    border-radius: 20px;
  }
}

// mobile
@media screen and (max-width: 768px) {
  .center-top {
    .left-avatar {
      width: 40px;
      height: 40px;
    }
  }

  .publish-mobile {
    position: fixed;
    top: 150px;
    right: 10px;
    z-index: 3001;
    cursor: pointer;
    border: none;
  }

  .publish-pc {
    display: none;
  }
}
</style>
