<template>
  <div class="userinfo-container">
    <ul class="userinfo-item" v-if="finalRounds<4">
      <li>
        <div class="head-username">
          <img :src="userInfo.img">
          <p>{{ userInfo.username }}</p>
        </div>
        <div class="rank">
          <p class="score">当前排名</p>
          <p class="use-time">{{ userInfo.rank }}</p>
        </div>
      </li>
      <li>
        <div class="correct-rate">
          <p class="score">正确率</p>
          <p class="use-time">{{ userInfo.correctRate }}</p>
        </div>
        <div class="answer-result-container">
          <div class="is-answer">
            <img src="../../assets/images/answer-success.svg" v-if="userInfo.isRight"/>
            <img src="../../assets/images/answer-fail.svg" v-else="userInfo.isRight"/>
          </div>
          <div class="answer-result" v-show="userInfo.isAnswer">
            <img src="../../assets/images/answer-right.svg" v-show="userInfo.isRight"/>
            <img src="../../assets/images/answer-wrong.svg" v-show="!userInfo.isRight"/>

          </div>
        </div>
      </li>
    </ul>

    <ul class="userinfo-item-other" v-else>
      <ul class="userinfo-item">
        <li v-for="(item,index) in matchUserInfo" :key="index">
          <div class="head-username">
            <img :src="item.img">
            <p>{{ item.username }}</p>
          </div>
          <div class="rank">
            <p class="score">当前排名</p>
            <p class="use-time">{{ item.rank }}</p>
          </div>
        </li>
      </ul>
    </ul>

  </div>

</template>


<script setup>
import store from "../../store";
import {ref, watch} from "vue";

const userInfo = ref()
userInfo.value = store.state.userInfo
const finalRounds = ref(1)
const matchUserInfo = ref()

watch(() => store.state.penInfo, (value, oldValue) => {
  finalRounds.value = value.rounds
  userInfo.value.rank = value.rank
  userInfo.value.correctRate = value.accuracy

})
watch(() => store.state.matchUserInfo, (value, oldValue) => {
  matchUserInfo.value = store.state.matchUserInfo
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

    li:nth-child(1) {
      width: 318px;
      display: flex;

      .head-username {
        position: relative;
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

      .rank {
        margin-left: 30px;
        margin-top: 20px;
        text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.29);
        font-weight: 400;

        p:nth-child(1) {
          width: 120px;
          height: 23px;
          font-size: 24px;
          font-family: Source Han Sans CN;
          color: #FFFFFF;

        }

        p:nth-child(2) {
          margin-top: 26px;
          margin-left: 60px;
          width: 31px;
          height: 26px;
          font-size: 36px;
          font-family: D-DIN;
          color: #EEC674;
        }


      }


    }

    li:nth-child(2) {
      width: 318px;
      margin-left: 84px;
      display: flex;

      .correct-rate {
        width: 150px;
        margin-top: 21px;

        p:nth-child(1) {
          width: 120px;
          height: 23px;
          font-size: 24px;
          font-family: Source Han Sans CN;
          color: #FFFFFF;
        }

        p:nth-child(2) {
          margin-top: 26px;
          width: 31px;
          height: 26px;
          font-size: 36px;
          font-family: D-DIN;
          color: #EEC674;


        }

      }

      .answer-result-container {
        width: 150px;
        height: 86px;

        .is-answer {
          height: 34px;
          margin-top: 16px;

          img {
            height: 34px;
            width: 39px;

          }
        }

        .answer-result {
          height: 34px;
          margin-top: 18px;

          img {
            width: 39px;
            height: 35px;

          }
        }


      }


    }

  }

  .userinfo-item-other {
    display: flex;

    li {
      width: 318px;
      display: flex;

      .head-username {
        position: relative;
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

      .rank {
        margin-left: 30px;
        margin-top: 20px;
        text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.29);
        font-weight: 400;

        p:nth-child(1) {
          width: 120px;
          height: 23px;
          font-size: 24px;
          font-family: Source Han Sans CN;
          color: #FFFFFF;

        }

        p:nth-child(2) {
          margin-top: 26px;
          margin-left: 60px;
          width: 31px;
          height: 26px;
          font-size: 36px;
          font-family: D-DIN;
          color: #EEC674;
        }


      }


    }

    li:nth-child(2) {
      width: 318px;
      margin-left: 84px;
      display: flex;
      flex-direction: row-reverse;
      position: absolute;
      right: 0;

      .correct-rate {
        width: 150px;
        margin-top: 21px;

        p:nth-child(1) {
          width: 120px;
          height: 23px;
          font-size: 24px;
          font-family: Source Han Sans CN;
          color: #FFFFFF;
        }

        p:nth-child(2) {
          margin-top: 26px;
          width: 31px;
          height: 26px;
          font-size: 36px;
          font-family: D-DIN;
          color: #EEC674;


        }

      }

      .answer-result-container {
        width: 150px;
        height: 86px;

        .is-answer {
          height: 34px;
          margin-top: 16px;

          img {
            height: 34px;
            width: 39px;

          }
        }

        .answer-result {
          height: 34px;
          margin-top: 18px;

          img {
            width: 39px;
            height: 35px;

          }
        }


      }


    }

  }


}

</style>