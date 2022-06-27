<template>
  <div class="answer-container" :class="{'blurred':matching}">
    <div class="middle-circle">

    </div>
    <div class="answer-header">
      <img src="../../assets/images/h5/must.png" v-if="currentType==='must'">
      <img src="../../assets/images/h5/disuse.png" v-if="currentType==='disuse'">
      <img src="../../assets/images/h5/final.png" v-if="currentType==='final'">
      <p>规则</p>
    </div>
    <div class="answer-userinfo">
      <component :is="competeTypeInfo[currentType]['component']"></component>
    </div>
    <div class="answer-countdown">
      <div class="answer-countdown-content">
        <p>{{ showTime }}</p>
        <span>s</span>
      </div>
    </div>
    <div class="answer-pen-info">
      <div class="answer-pen-progress">
        <p>已答题</p>
        <div class="progress">
          <p>{{ penInfo.penRoundsNumber }}/{{ penInfo.allNum }}</p>
          <div :style="{width: progress }"></div>
        </div>
        <img src="../../assets/images/h5/score.svg">
        <span>+1</span>
      </div>
      <div class="answer-pen-card">
        <pen-card ref="timeOutAnswer" :use-time="competeTypeInfo[currentType]['perTime']-showTime"/>
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
          <p> {{ readyStatus.msg }}</p>
        </div>
        <p class="match-action" @click="readyStatus.status?startMatch():''">
          {{ readyStatus.msg }}
        </p>
      </div>

    </el-dialog>
  </div>


</template>


<script>
import RankList from "../../components/pc/RankList.vue";
import {onMounted, ref, onBeforeMount, onUpdated, reactive, defineAsyncComponent, inject, watch} from "vue";
import UserInfoCardMust from "../../components/pc/UserInfoCardMust.vue";
import PenCard from "../../components/h5/PenCard.vue";
import store from "../../store";
import {ElMessage} from "element-plus";
import dayjs from "dayjs";

export default {
  name: "Answer",
  components: {
    PenCard,
    RankList,
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
    const progress = ref('0')
    const $api = inject('$api')
    const $storage = inject('$storage')
    const roomId = ref('')
    //竞赛状态
    const readyStatus = ref({
      "status": true,
      "msg": '开始匹配'
    })
    const penInfo = ref({})
    const timeOutAnswer = ref()
    //传递数据
    const competeInfo = ref([])
    competeInfo.value = $storage.getItem('competeInfo')
    const userInfo = $storage.getItem('userInfo')
    const matchUserInfo = ref([userInfo])
    const currentType = ref(competeInfo.value['currentType'])
    let timePercentage = ref(0)

    let showTime = ref()
    //正在匹配中
    const matching = ref(true)
    const dialogVisible = ref(true)
    let countdownInterval

    const countDownTime = ref('00:00')
    let timer = ''

    const allCountDown = () => {
      let lastTime
      let currentType
      //查询当前模式
      switch(competeInfo.value['currentType']) {
        case 'must':
          lastTime = dayjs(competeInfo.value.startTime).unix() + 20 * 60 - dayjs().unix()
          currentType='disuse'
          break;
        case 'disuse':
          lastTime = dayjs(competeInfo.value.startTime).unix() + 20 * 60 + 20 * 60 - dayjs().unix()
          currentType='final'
          break;
        case 'final':
          lastTime = dayjs(competeInfo.value.endTime).unix()  - dayjs().unix()
          currentType='final'
          break;

      }

      if(lastTime <= 0) {
        countDownTime.value = '00:00'
        clearTimeout(timer)
        //通知服务器竞赛切换
        store.state.ws.send(JSON.stringify({
          event: 'changeCompeteType',
          message: {
            cId:competeInfo.value.cId,
            userId:store.state.userInfo.userId,
            currentType
          }
        }))

        return false
      }

      let day = Math.floor(lastTime / 60 / 60 / 24)
      let hr = Math.floor(lastTime / 60 / 60 % 24)
      let min = Math.floor(lastTime / 60 % 60)
      let sec = lastTime % 60
      hr = hr > 9 ? hr : '0' + hr
      min = min > 9 ? min : '0' + min
      sec = sec > 9 ? sec : '0' + sec

      countDownTime.value = day + ':' + hr + ':' + min + ':' + sec
      console.log( countDownTime.value)
      timer = setTimeout(function() {
        allCountDown()
      }, 1000)
    }
    //比赛信息
    const competeTypeInfo = reactive({
      'must':
          {
            'name': '四人必答赛',
            'titleImgUrl': 'assets/images/must.png',
            'matchBgUrl': 'assets/images/match-must.png',
            'component': 'UserInfoCardMust',
            'matchComponent': 'MatchingPageMust',
            'perTime': 25
          },
      'disuse':
          {
            'name': '两人淘汰赛',
            'titleImgUrl': 'assets/images/disuse.png',
            'matchBgUrl': 'assets/images/match-disuse.png',
            'component': 'UserInfoCardDisuse',
            'matchComponent': 'MatchingPageDisuse',
            'perTime': 25
          },
      'final':
          {
            'name': '终极排位赛',
            'titleImgUrl': 'assets/images/final.png',
            'matchBgUrl': 'assets/images/match-disuse.png',
            'component': 'UserInfoCardFinal',
            'matchComponent': 'MatchingPageDisuse',
            'perTime': 30
          }
    })
    let perTime = competeTypeInfo[currentType.value]['perTime'];

    watch(() => store.state.penInfo, (val, old) => {
      penInfo.value = val
      matching.value = false
      dialogVisible.value = false
      //开始倒计时
      perTime = val.countDown;
      clearInterval(countdownInterval)
      progress.value = (penInfo.value.penRoundsNumber / penInfo.value.allNum) * 100 + '%'
      //跟新答题情况
      for(const key in matchUserInfo.value) {
        matchUserInfo.value[key].isRight = null
      }
      countdown()
    })
    //state.roomId
    watch(() => store.state.rounds, (val, old) => {
      dialogVisible.value = true
      matching.value = true
      startMatch()
    })
    watch(() => store.state.pushInfo, (val, old) => {
      dialogVisible.value = true
      matching.value = true
      readyStatus.value.status = false
      readyStatus.value.msg = store.state.pushInfo
    })
    //开启新的模式
    watch(() => store.state.competeInfo, (val, old) => {
      //判断是终极排位赛还是其他
      currentType.value = val['currentType']
      if(val['currentType'] !== old['currentType']) {
        competeInfo.value = val
        dialogVisible.value = true
        matching.value = true
        if(val['currentType'] === 'final') {
          //开启终极排位赛
          startFinal()
          if(store.state.finalInfo) {
            ElMessage({
              message: store.state.finalInfo.showMessage,
              type: 'success',
              duration: 5000
            })
          } else {
            readyStatus.value.status = false
            readyStatus.value.msg = '比赛已结束，你未能进入终极排位赛'
            dialogVisible.value = true
            matching.value = true
          }
        } else {
          dialogVisible.value = true
          matching.value = true

          startMatch()
        }
      }

    })

    const countdown = () => {
      let newTime = perTime
      countdownInterval = setInterval(() => {
        if(perTime < 0) {
          clearInterval(countdownInterval)
          timeOutAnswer.value.timeOutAnswer()
          return
        }
        showTime.value = perTime--
        timePercentage.value = (1 - perTime / competeTypeInfo[currentType.value]['perTime']) * 100
      }, 1000)
    }
    /**
     * 开始配置信息
     */
    const startMatch = async() => {
      let params = {cid: competeInfo.value.cId, type: currentType.value, uid: userInfo.userId}
      $api.startMatch(params).then((res) => {
        if(res.roomId !== 'pushPen') {
          roomId.value = res.roomId
          store.commit('startMatch', res.roomId)
        }
        readyStatus.value.status = false
        readyStatus.value.msg = '匹配当中'


      })
    }
    //开启终极排位赛
    const startFinal = async() => {
      let params = {cid: competeInfo.value.cId, type: currentType.value, uid: userInfo.userId}
      $api.startFinal(params).then((res) => {

      })
    }
    const competitionInfo = async() => {
      const cid = competeInfo.value.cId
      if(cid) {
        let params = {cid: competeInfo.value.cId, type: currentType.value, uid: userInfo.userId}
        $api.competitionInfo(params).then((res) => {
          store.commit('saveCompeteInfo', res.competition)
          currentType.value = res.competition.currentType
          if(res.competition.currentType === 'final') {
            readyStatus.value.status = false
            readyStatus.value.msg = '等待题目推送'
          }
        })
      }


    }


    onBeforeMount(() => {
      clearTimeout(timer)
    })

    onUpdated(() => {

    })
    onMounted(() => {
      //查询
      competitionInfo()
      allCountDown()

    })


    return {
      competeInfo,
      userInfo,
      competeTypeInfo,
      currentType,
      timePercentage,
      showTime,
      dialogVisible,
      matching,
      startMatch,
      matchUserInfo,
      timeOutAnswer,
      readyStatus,
      penInfo,
      progress
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
          width: 188px;
          height: 37px;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-top: -18px;
          margin-left: -90px;
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