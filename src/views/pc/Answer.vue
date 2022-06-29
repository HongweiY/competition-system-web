<template>
  <div class="answer-container" :class="{'blurred':matching}">
    <div class="answer-header">
      <p>{{ competeInfo.title }}</p>
    </div>
    <div class="answer-content">
      <div class="answer-left">
        <div class="answer-left-countdown">
          <countdown/>
        </div>
        <div class="answer-left-rank">
          <rank-list/>
        </div>
      </div>
      <div class="answer-main">
        <div class="answer-userInfo">
          <div class="type-title">
            <img src="../../assets/images/must.png" v-if="currentType==='must'">
            <img src="../../assets/images/disuse.png" v-if="currentType==='disuse'">
            <img src="../../assets/images/final.png" v-if="currentType==='final'">
          </div>
          <component :is="competeTypeInfo[currentType]['component']"></component>
          <div class="hour-meter">
            <el-progress type="circle" :percentage="timePercentage" :stroke-width="20" color="#EEC674" :width="90"
                         class="time-progress">
              <span>{{ showTime }}</span>
            </el-progress>
          </div>
        </div>
        <div class="answer-pen-card">
          <pen-card ref="timeOutAnswer" :use-time="competeTypeInfo[currentType]['perTime']-showTime"/>
        </div>
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
        <component :is="competeTypeInfo[currentType]['matchComponent']"></component>
      </div>
      <div class="start-match" @click="readyStatus.status?startMatch():''">
        {{ readyStatus.msg }}
      </div>

    </el-dialog>
  </div>


</template>


<script>
import Countdown from "../../components/pc/Countdown.vue";
import RankList from "../../components/pc/RankList.vue";
import {
  onMounted,
  ref,
  onBeforeMount,
  onUpdated,
  reactive,
  defineAsyncComponent,
  inject,
  watch,
} from "vue";
import UserInfoCardMust from "../../components/pc/UserInfoCardMust.vue";
import PenCard from "../../components/pc/PenCard.vue";
import store from "../../store";
import {ElMessage} from "element-plus";
import storage from "../../utils/storage";


export default {
  name: "Answer",
  components: {
    PenCard,
    RankList,
    Countdown,
    UserInfoCardMust: defineAsyncComponent(() =>
        import('../../components/pc/UserInfoCardMust.vue')
    ),
    UserInfoCardDisuse: defineAsyncComponent(() =>
        import('../../components/pc/UserInfoCardDisuse.vue')
    ),
    UserInfoCardFinal: defineAsyncComponent(() =>
        import('../../components/pc/UserInfoCardFinal.vue')
    ),
    MatchingPageMust: defineAsyncComponent(() =>
        import('../../components/pc/MatchingPageMust.vue')
    ),
    MatchingPageDisuse: defineAsyncComponent(() =>
        import('../../components/pc/MatchingPageDisuse.vue')
    ),
  },

  setup() {
    const $api = inject('$api')
    const $storage = inject('$storage')
    const roomId = ref('')
    //竞赛状态
    const readyStatus = ref({
      "status": true,
      "msg": '开始匹配'
    })

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
            'matchBgUrl': 'assets/images/match-final.png',
            'component': 'UserInfoCardFinal',
            'matchComponent': 'MatchingPageDisuse',
            'perTime': 30
          }
    })
    let perTime = competeTypeInfo[currentType.value]['perTime'];
    //监听题目是否发生变化
    watch(() => store.state.penInfo, (val, old) => {
      matching.value = false
      // penInfo.value = val
      dialogVisible.value = false
      //开始倒计时
      perTime = val.countDown;
      clearInterval(countdownInterval)
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
    //开启终极排位赛
    const startFinal = async() => {
      let params = {cid: competeInfo.value.cId, type: currentType.value, uid: userInfo.userId}
      $api.startFinal(params).then((res) => {

      })
    }
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

    })

    onUpdated(() => {


    })
    onMounted(() => {
      competitionInfo()

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
  width: 258px;
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
  margin-left: -129px;
  cursor: pointer;

}

</style>