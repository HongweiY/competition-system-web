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
        <div class="score-time">
          <p class="score">{{ item.score }}</p>
          <p class="use-time">{{ item.useTime < 10 ? '0' + item.useTime.toString() : item.useTime }}''</p>
        </div>
      </li>
    </ul>
    <img src="../../assets/images/h5/vs.png" class="userinfo-vs">
  </div>

</template>

<script setup>
import store from "../../store";
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
      height: 100%;
      align-items: center;


      .head-username {
        position: relative;
        order: 1;
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

      .score-time {
        order: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        height: 77px;
        width: 33px;
        margin-left: 111px;
        margin-right: 89px;
        margin-top: -15px;
        line-height: 40px;
        font-family: D-DIN;
        font-weight: 400;
        color: #FFFFFF;

        .score {
          width: 43px;
          height: 25px;
          font-size: 36px;

        }

        .use-time {
          width: 33px;
          height: 17px;
          font-size: 24px;
        }


      }


    }

    li:nth-child(1) {
      background: #78BEDF;;

    }

    li:nth-child(2) {
      background: #EA6767;
      flex-direction: row-reverse;


      .score-time {
        align-items: flex-start;
      }
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