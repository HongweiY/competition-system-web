<template>
  <div class="userinfo-container">
    <ul class="userinfo-item" v-if="finalRounds<4">
      <li>
        <div class="head-username">
          <img :src="userInfo.img">
          <div class="username-plaque">
            <p>{{ userInfo.username }}</p>
          </div>
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
      </li>
    </ul>
    <ul class="userinfo-item-other" v-else>
      <li v-for="(item,index) in matchUserInfo" :key="index">
        <div class="head-username">
          <img :src="item.img">
          <div class="username-plaque">
            <p>{{ item.username }}</p>
          </div>
        </div>
        <div class="rank">
          <p class="score">当前排名</p>
          <p class="use-time">{{ item.rank }}</p>
        </div>
      </li>
    </ul>
    <img src="../../assets/images/h5/vs.png" class="userinfo-vs">
  </div>

</template>

<script setup>
import store from "../../store";
import {ref, watch} from "vue";

const userInfo = ref({})
userInfo.value = store.state.userInfo
const finalRounds = ref(1)
const matchUserInfo = []
watch(() => store.state.penInfo, (value, old) => {
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
  width: 700px;
  height: 150px;
  display: flex;
  position: relative;


  .userinfo-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    li:nth-child(1) {
      display: flex;
      width: 350px;
      height: 100%;
      background: #78BEDF;


      .head-username {
        position: relative;
        width: 144px;
        height: 144px;
        border: 3px solid #61CDFB;

        img {
          width: 144px;
          height: 144px;
        }

        .username-plaque {
          width: 144px;
          height: 42px;
          background: #000000;
          opacity: 0.5;
          position: absolute;
          bottom: 0;
          text-align: center;

          p {
            height: 22px;
            font-size: 24px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 40px;
          }
        }

      }

      .rank {
        margin-left: 51px;

        p:nth-child(1) {
          width: 110px;
          height: 23px;
          font-size: 24px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #FFFFFF;
          margin-top: 30px;
        }

        p:nth-child(2) {
          width: 43px;
          height: 26px;
          font-size: 36px;
          font-family: D-DIN;
          font-weight: 400;
          color: #ECDD7D;
          margin-left: 49px;
          margin-top: 28px;
          text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
        }
      }
    }

    li:nth-child(2) {
      background: #78BEDF;
      width: 350px;
      height: 100%;

      .correct-rate {
        margin-left: 86px;

        p:nth-child(1) {
          width: 110px;
          height: 23px;
          font-size: 24px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #FFFFFF;
          margin-top: 30px;
        }

        p:nth-child(2) {
          width: 43px;
          height: 26px;
          font-size: 36px;
          font-family: D-DIN;
          font-weight: 400;
          color: #ECDD7D;

          margin-top: 28px;
          text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
        }
      }

    }

  }

  .userinfo-item-other {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    li {
      display: flex;
      width: 350px;
      height: 100%;
      background: #78BEDF;


      .head-username {
        position: relative;
        width: 144px;
        height: 144px;
        border: 3px solid #61CDFB;

        img {
          width: 144px;
          height: 144px;
        }

        .username-plaque {
          width: 144px;
          height: 42px;
          background: #000000;
          opacity: 0.5;
          position: absolute;
          bottom: 0;
          text-align: center;

          p {
            height: 22px;
            font-size: 24px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 40px;
          }
        }

      }

      .rank {
        margin-left: 51px;

        p:nth-child(1) {
          width: 110px;
          height: 23px;
          font-size: 24px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #FFFFFF;
          margin-top: 30px;
        }

        p:nth-child(2) {
          width: 43px;
          height: 26px;
          font-size: 36px;
          font-family: D-DIN;
          font-weight: 400;
          color: #ECDD7D;
          margin-left: 49px;
          margin-top: 28px;
          text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
        }
      }
    }

    li:nth-child(2) {
      display: flex;
      width: 350px;
      height: 100%;
      background: #78BEDF;
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
    margin-left: -64px;
  }


}

</style>