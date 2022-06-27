<template>
  <div class="userinfo-container">
    <ul class="userinfo-item">
      <li v-for="(item,index) in store.state.matchUserInfo" :key="index">
        <div class="head-username">
          <img :src="item.img">
          <div class="username-plaque">
            <p>{{ item.username }}</p>
          </div>
        </div>
        <p class="use-time">{{ item.useTime < 10 ? '0' + item.useTime.toString() : item.useTime }}''</p>
        <p class="score">{{ item.score }}</p>
      </li>
    </ul>
    <img src="../../assets/images/h5/vs.png" class="userinfo-vs">
  </div>

</template>

<script setup>
import store from "../../store";
import {ref, watch} from "vue";

const answerInfo = ref([])
answerInfo.value = store.state.matchUserInfo

watch(() => store.state.penInfo, (val, old) => {
  for(let i = 0; i < answerInfo.value.length; i++) {
    answerInfo.value[i].isRight = ''
  }

})

</script>

<style scoped lang="scss">


.userinfo-container {
  width: 700px;
  height: 150px;
  display: flex;
  position: relative;

  .userinfo-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;


    li {
      display: flex;
      width: 350px;
      height: 50%;
      align-items: center;

      .head-username {
        position: relative;
        order: 1;
        width: 69px;
        height: 69px;
        border: 3px solid #26CCEC;

        img {
          width: 69px;
          height: 69px;
        }

        .username-plaque {
          width: 69px;
          height: 21px;
          background: #000000;
          opacity: 0.5;
          position: absolute;
          bottom: 0;
          text-align: center;
          font-size: 12px;

          p {
            height: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 20px;
          }
        }

      }

      .use-time {
        width: 42px;
        height: 22px;
        font-size: 30px;
        font-family: D-DIN;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 40px;
        order: 2;
        margin: 16px;
      }

      .score {
        order: 3;
        width: 11px;
        height: 22px;
        font-size: 30px;
        font-family: D-DIN;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 40px;
        margin: 39px;

      }

    }

    li:nth-child(1) {
      background: #78BEDF;

    }

    li:nth-child(2) {
      background: #46688C;
    }

    li:nth-child(3) {
      background: #EA6767;
    }

    li:nth-child(4) {
      background: #FDA579;
    }

    li:nth-child(2n) {
      flex-direction: row-reverse;
    }

  }

  .userinfo-vs {
    position: absolute;
    width: 152px;
    height: 122px;
    top: 50%;
    left: 50%;
    margin-top: -60px;
    margin-left: -62px;
  }


}

</style>