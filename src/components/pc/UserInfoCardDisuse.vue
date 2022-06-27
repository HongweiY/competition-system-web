<template>
  <div class="userinfo-container">
    <ul class="userinfo-item">
      <li v-for="(item,index) in store.state.matchUserInfo" :key="index">
        <div class="head-username">
          <img :src="item.img">
          <p>{{ item.username }}</p>
        </div>
          <div v-show="item.isAnswer">
          <img src="../../assets/images/answer-right.svg" v-show="item.isRight" class="answer-result"/>
          <img src="../../assets/images/answer-wrong.svg" v-show="!item.isRight" class="answer-result"/>
        </div>


        <div class="time-score">
          <p class="score">{{ item.score }}</p>
          <p class="use-time">{{ item.useTime < 10 ? '0' + item.useTime.toString() : item.useTime }}''</p>
        </div>
      </li>
    </ul>

  </div>

</template>

<script setup>
import store from "../../store";

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
    justify-content: space-between;

    li {
      display: flex;
      width: 258px;
      align-items: center;

      .head-username {
        position: relative;
        order: 1;
        width: 110px;
        height: 110px;
        border: 3px solid #EEC674;

        p {
          width: 110px;
          height: 26px;
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

        img {
          width: 110px;
          height: 110px;
        }
      }

      .answer-result {
        width: 39px;
        height: 34px;
        order: 2;
        position: absolute;
        left: 130px;
        bottom: 10px;

      }

      .time-score {
        order: 3;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 110px;
        width: 30px;
        margin-left: 90px;
        margin-right: 70px;
        align-items: flex-end;


        .score {
          width: 22px;
          height: 26px;
          font-size: 36px;
          font-family: D-DIN;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 40px;
          text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.29);
          margin-top: 10px;
        }

        .use-time {
          width: 30px;
          height: 26px;
          font-size: 24px;
          font-family: D-DIN;
          font-weight: 400;
          color: #FFFFFF;
          text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.29);
          margin-bottom: 8px;
        }


      }


    }

    li:nth-child(1)::after {
      content: '（本场积分）';
      position: absolute;
      left: 159px;
      top: 40px;
      height: 14px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #EEC674;
      line-height: 40px;
      text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.29);
    }

    li:nth-child(2)::after {
      content: '（本场积分）';
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
      position: absolute;
      right: 0;

      .time-score {
        align-items: flex-start;

      }
      .answer-result{
        left: 90px;
      }

    }

  }


}

</style>