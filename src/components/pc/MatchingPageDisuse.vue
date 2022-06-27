<template>
  <div class="matching-page-must">
    <ul class="matching-user-item">
      <li v-for="(item,index) in  store.state.matchUserInfo" :key="index">
        <div class="head-username">
          <img :src="item.img" v-show="item.username">
          <img src="../../assets/images/user.png" v-show="!item.username">
          <p v-show="item.username">{{ item.username }} </p>
          <p v-show="!item.username">匹配中</p>
        </div>
        <p class="matching-user-role">{{ `(${item.role})` }} </p>
        <p class="matching-user-username " v-show="item.username">{{ item.username }} </p>
        <p class="matching-user-username  matching" v-show="!item.username">随机匹配中</p>
        <p class="matching-user-dept">{{ item.department }}</p>
      </li>
    </ul>
  </div>

</template>

<script setup>
import store from "../../store";
</script>

<style scoped lang="scss">
.matching-page-must {
  width: 100%;
  height: 510px;
  background: url("../../assets/images/match-disuse.png");
  background-size: 100% 100%;

  .matching-user-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 22px;
    padding-left: 108px;


    li {
      display: flex;
      width: 739px;
      height: 50%;
      align-items: center;
      position: relative;

      .head-username {
        order: 1;
        width: 232px;
        height: 232px;
        border: 4px solid #26CCEC;
        margin-top: 48px;
        position: relative;

        img {
          width: 232px;
          height: 232px;
        }

        p {
          width: 232px;
          height: 52px;
          background: #000000;
          opacity: 0.5;
          position: absolute;
          bottom: 0;
          text-align: center;
          font-size: 32px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 60px;
        }
      }

      .matching-user-role {
        order: 2;
        height: 30px;
        font-size: 30px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 40px;
        opacity: 0.8;
      }

      .matching-user-username {
        order: 3;
        height: 41px;
        font-size: 42px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 40px;
      }

      .matching-user-dept {
        order: 4;
        height: 23px;
        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #454545;
        line-height: 40px;
        position: absolute;
      }

      .matching {
        margin-left: 52px;
      }

    }


    li:nth-child(1) {
      .matching-user-dept {
        top: 307px;
        right: 100px;
      }

      .matching-user-role {
        position: absolute;
        left: 326px;
        top: 94px;

      }

      .matching-user-username {
        position: absolute;
        left: 600px;
        top: 176px;
      }
    }

    li:nth-child(2) {
      flex-direction: row-reverse;
      margin-right: 108px;

      .matching-user-role {
        position: absolute;
        right: 326px;
        bottom: 0;

      }

      .matching-user-username {
        position: absolute;
        right: 500px;
        top: 176px;
      }

      .matching {
        margin-right: -48px;
      }

      .matching-user-dept {
        top: 50px;
        left: 100px;
      }
    }
  }
}

</style>