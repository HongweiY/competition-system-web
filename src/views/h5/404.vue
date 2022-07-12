<template>
  <div class="answer-container" :class="{'blurred':matching}">
    <div class="middle-circle">

    </div>
    <div class="answer-header">
      <img src="../../assets/images/h5/must.png">

      <p>规则</p>
    </div>
    <div class="answer-userinfo">

    </div>
    <div class="answer-countdown">
      <div class="answer-countdown-content">

        <span>s</span>
      </div>
    </div>
    <div class="answer-pen-info">
      <div class="answer-pen-progress">
        <p>已答题</p>
        <div class="progress">

        </div>
        <img src="../../assets/images/h5/score.svg">
        <span>+1</span>
      </div>
      <div class="answer-pen-card">
        <pen-card ref="timeOutAnswer" />
      </div>
    </div>
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
        <div class="matching-page-middle">
          <p> 竞赛参数错误</p>
        </div>
      </div>

    </el-dialog>
  </div>


</template>


<script>
import Countdown from "../../components/pc/Countdown.vue";
import RankList from "../../components/pc/RankList.vue";
import {onMounted, ref, onBeforeMount, onUpdated, reactive, defineAsyncComponent, inject, watch} from "vue";
import UserInfoCardMust from "../../components/pc/UserInfoCardMust.vue";
import PenCard from "../../components/h5/PenCard.vue";
import store from "../../store";

export default {
  name: "Answer",
  components: {
    PenCard,
    RankList,
    Countdown,
    UserInfoCardMust: defineAsyncComponent(() =>
        import('../../components/h5/UserInfoCardMust.vue')
    ),
    UserInfoCardDisuse: defineAsyncComponent(() =>
        import('../../components/h5/UserInfoCardDisuse.vue')
    ),
    UserInfoCardFinal: defineAsyncComponent(() =>
        import('../../components/h5/UserInfoCardFinal.vue')
    ),
    MatchingPageMust: defineAsyncComponent(() =>
        import('../../components/h5/MatchingPageMust.vue')
    ),
    MatchingPageDisuse: defineAsyncComponent(() =>
        import('../../components/h5/MatchingPageDisuse.vue')
    ),
  },

  setup() {

    //正在匹配中
    const matching = ref(true)
    const dialogVisible = ref(true)



    return {
      dialogVisible,
      matching,
    }

  }
}
</script>

<style scoped lang="scss">
.blurred {
  filter: blur(10px);

}

.answer-container {
  background: #167FFB;
  color: #FFFFFF;
  width: 740px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .middle-circle {
    position: absolute;
    width: 320px;
    height: 315px;
    background: #FFFFFF;
    opacity: 0.16;
    border-radius: 50%;
  }

  .answer-header {
    width: 100%;
    height: 75px;
    display: flex;
    padding-top: 37px;
    position: relative;

    img {
      width: auto;
      height: 26px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -50px;
      margin-top: -13px;

    }

    p {
      height: 15px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 40px;
      position: absolute;
      right: 20px;
    }

  }

  .answer-userinfo {
    width: 700px;
    height: 140px;
    margin-bottom: 27px;
  }

  .answer-countdown {
    width: 95px;
    height: 95px;
    background: url("../../assets/images/h5/countdown.png") 100% 100% no-repeat;
    text-align: center;
    position: absolute;
    top: 220px;
    color: #603028;
    font-family: D-DIN;
    font-weight: bold;

    .answer-countdown-content {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -26px;
      margin-left: -14px;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      p {
        font-size: 36px;
        width: 38px;
        position: absolute;
        top: 7px;
        left: -10px;


      }

      span {
        font-size: 24px;
        position: absolute;
        top: 16px;
        left: 24px;
      }
    }


  }

  .answer-pen-info {
    width: 700px;
    background: #FFFFFF;
    border-radius: 18px;


    .answer-pen-progress {
      width: 700px;
      height: 80px;
      background: #FEF2E8;
      border-radius: 18px 18px 0px 0px;
      display: flex;
      align-items: center;


      p {
        margin-left: 39px;
        width: 80px;
        height: 20px;
        font-size: 21px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #F2A638;

      }

      .progress {
        margin-left: 8px;
        width: 500px;
        height: 20px;
        background: #EDDED2;
        border-radius: 10px;
        position: relative;
        margin-top: 2px;


        p {
          position: absolute;
          width: 27px;
          height: 20px;
          font-size: 18px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #FFFFFF;
          line-height: 20px;
          left: -25px;
        }

        div {
          width: 0;
          height: 20px;
          background: #F3A433;
          border-radius: 10px;
        }
      }

      img {
        position: absolute;
        width: 36px;
        height: 46px;
        left: 620px;
      }

      span {
        width: 24px;
        height: 20px;
        font-size: 21px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #F2A638;
        margin-left: 8px;
        line-height: 20px;

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
      position: absolute;
      width: 500px;
      height: 500px;
      background: url("../../assets/images/h5/light-circle.png");
      background-size: 100% 100%;
      border-radius: 50%;
      margin-top: 40%;
      margin-left: 15%;


      .matching-page-middle {


        p {
          color: #FFE640;
          font-size: 47px;
          width: 288px;
          height: 37px;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-top: -18px;
          margin-left: -120px;
          font-weight: bold;
          text-align: center;


        }
      }

      .match-action {
        border: 2px #FFFFFF solid;
        text-align: center;
        border-radius: 30px;
        color: #ffffff;
        width: 258px;
        height: 45px;
        position: absolute;
        bottom: -100px;
        left: 50%;
        line-height: 45px;
        margin-left: -120px;
        font-size: 36px;
      }

    }

  }
}


</style>