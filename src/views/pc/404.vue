<template>
  <div class="answer-container" :class="{'blurred':matching}">

  </div>
  <!-- 匹配 -->
  <div class="matching-page-container">
    <el-dialog
        custom-class="matching-page-dialog"
        v-model="dialogVisible"
        width="100%"
        :lock-scroll="true"
        :close-on-click-modal="false"
        :show-close="false"
        :close-on-press-escape="false"
    >
      <div class="matching-page">
        <matching-page-must/>
      </div>
      <div class="start-match">
        信息错误，请重新进入
      </div>

    </el-dialog>
  </div>


</template>


<script>


import MatchingPageMust from "../../components/pc/MatchingPageMust.vue";

export default {
  name: "Answer",
  components: {MatchingPageMust},
  setup() {
    const dialogVisible = true
    const matching = true

    return {
      dialogVisible,
      matching
    }

  }
}
</script>

<style scoped lang="scss">
.blurred {
  filter: blur(2px);

}

.answer-container {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/main-bg.png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;


  .answer-header {
    height: 125px;
    background-image: url("../../assets/images/main-header.png");
    background-size: 100% 100%;
    text-align: center;

    p {
      margin: auto;
      margin-top: 21px;
      width: 684px;
      height: 34px;
      font-size: 46px;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 40px;
      opacity: 0.8;
      text-shadow: 0px 8px 7px #0B5C65;
    }

  }

  .answer-content {
    height: 918px;
    display: flex;


    .answer-left {
      width: 292px;
      display: flex;
      flex-direction: column;
      padding: 26px 81px 21px 76px;


      .answer-left-countdown {
        height: 100px;
        width: 254px;
        margin-bottom: 60px;
        text-align: center;
        background-image: url("../../assets/images/countdown.png");
        background-size: 100% 100%;
      }

      .answer-left-rank {
        height: 736px;
        margin-left: 26px;
      }

    }

    .answer-main {
      width: 1309px;
      display: flex;
      flex-direction: column;


      .answer-userInfo {
        margin-top: 23px;
        height: 152px;
        width: 635px;
        margin-left: 186px;
        background-image: url("../../assets/images/userinfo-bg.png");
        background-size: 100% 100%;
        position: relative;

        .type-title {
          width: 153px;
          height: 28px;
          position: absolute;
          left: 50%;
          margin-left: -67px;
          text-align: center;
        }

        .hour-meter {
          background: url("../../assets/images/hour-meter.png");
          width: 142px;
          height: 142px;
          background-size: 100% 100%;
          position: absolute;
          left: 51%;
          top: 50%;
          margin-top: 18px;
          transform: translate(-50%, -50%);

          .time-progress {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }

          span {
            width: 30px;
            height: 22px;
            font-size: 30px;
            font-family: Furore;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 40px;
          }

        }

      }

      .answer-pen-card {
        height: 711px;
        margin-top: 33px;
        background-image: url("../../assets/images/pen-bg.png");
        background-size: 100% 100%;
      }
    }


  }

}

.matching-page-container {
  &:deep(.matching-page-dialog) {
    --el-dialog-bg-color: none;
    --el-dialog-padding-primary: 0px;
    margin-top: 14%;


    .matching-page {
      width: 100%;
      height: 510px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}

.start-match {
  width: 458px;
  height: 45px;
  border: 2px solid #FFFFFF;
  border-radius: 20px;
  font-size: 36px;
  font-family: YouSheBiaoTiHei;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 45px;
  text-align: center;
  position: absolute;
  top: 480px;
  left: 50%;
  margin-left: -229px;
  cursor: pointer;

}

</style>