<template>
  <div class="userinfo-container">
    <ul class="userinfo-item">
      <li v-for="(item,index) in store.state.matchUserInfo" :key="index">
        <div class="head-username">
          <img :src="item.img">
          <p>{{ item.username }}</p>
        </div>
        <div v-show="item.isAnswer">
          <img src="../../assets/images/answer-right.svg" v-if="item.isRight===true" class="answer-result"/>
          <img src="../../assets/images/answer-wrong.svg" v-if="item.isRight===false" class="answer-result"/>
        </div>
        <p class="use-time">{{ item.useTime < 10 ? '0' + item.useTime.toString() : item.useTime }}''</p>
        <p class="score">{{ item.score }}</p>

      </li>
    </ul>

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
  width: 635px;
  height: 116px;
  display: flex;
  position: absolute;
  bottom: 0;

  .userinfo-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    li {
      display: flex;
      width: 258px;
      height: 50%;
      align-items: center;

      .head-username {
        position: relative;
        order: 1;
        width: 52px;
        height: 52px;
        border: 3px solid #26CCEC;

        img {
          width: 52px;
          height: 52px;
        }

        p {
          width: 52px;
          height: 18px;
          background: #000000;
          opacity: 0.5;
          position: absolute;
          bottom: 0;
          text-align: center;
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 20px;
        }
      }

      .answer-result {
        width: 39px;
        height: 34px;
        margin: 13px;
        order: 2;
      }

      .use-time {
        width: 30px;
        height: 34px;
        font-size: 24px;
        font-family: D-DIN;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 40px;
        text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.29);
        order: 3;
        margin: 16px;
      }

      .score {
        order: 4;
        width: 14px;
        height: 34px;
        font-size: 36px;
        font-family: D-DIN;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 40px;
        text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.29);
        margin: 39px;

      }

    }

    li:nth-child(3)::after {
      content: '（本轮答题分）';
      position: absolute;
      left: 159px;
      top: 40px;
      //width: 79px;
      height: 14px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #EEC674;
      line-height: 40px;
      text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.29);
    }

    li:nth-child(4)::after {
      content: '（本轮答题分）';
      position: absolute;
      right: 146px;
      top: 40px;
      height: 14px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #EEC674;
      line-height: 40px;
      text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.29);
    }

    li:nth-child(2n) {
      flex-direction: row-reverse;
    }

  }


}

</style>