<template>
  <div class="pen-container">
    <div class="pen-rounds">
      <p v-if="!penInfo.area">当前第 {{ userRounds }} 轮</p>
      <p v-else>当前第 {{ userRounds }} 轮，您所在的是【{{ penInfo.area }}】答题区：</p>
    </div>

    <template v-if="penInfo.src">
      <iframe :src="penInfo.src" class="interactive-container"></iframe>
    </template>
    <template v-else>
      <div class="pen-order">
        <p>题目{{ penInfo.penRoundsNumber }}/{{ penInfo.allNum }}：请选择正确答案（{{ penInfo.penType }}）</p>
      </div>
      <div class="pen-info">
        <p>{{ penInfo.stem }}</p>
        <el-checkbox-group v-model="answer" class="pen-options" v-if="penInfo.penType==='多选'">
          <el-checkbox :label="labelOption[index]" v-for="(item,index) in penInfo.options" :key="index" size="large"
                       class="pen-options-radio"><p>{{ item }}</p>
          </el-checkbox>
        </el-checkbox-group>
        <el-radio-group v-model="answer" class="pen-options" v-else>
          <el-radio :label="labelOption[index]" v-for="(item,index) in penInfo.options" :key="index" size="large"
                    class="pen-options-radio"><p>{{ item }}</p>
          </el-radio>
        </el-radio-group>
      </div>
      <div class="pen-submit">
        <p @click="submitAnswer()" class="submitAnswer">提交本题答案</p>
        <!--        <p class="submitAnswer forbidden" v-else>提交本题答案</p>-->
        <p>每题答完均需“点击”此按钮，提交后不可更改，未提交进入下一题的，视为未作答,答对加分，答错扣分，未作答不扣分</p>
      </div>
    </template>
  </div>

</template>
<!--penRoundsNumber,  // 当前所在题目-->
<!--currentNum, // 当前用户所在轮数-->
<!--allNum,-->

<script setup>
import store from "../../store";
import {ElMessage, ElNotification} from 'element-plus'
import emitter from "../../utils/bus.js";

import {ref, watch, defineExpose, defineProps ,onMounted} from "vue";
import api from "../../api";


const penInfo = ref({})
const penId = ref({})
const rounds = ref({})
const penType = ref('')
const canSubmit = ref(false)

const labelOption = ref(['A', 'B', 'C', 'D', 'E', 'F', 'G'])

const userRounds = ref(1)
const props = defineProps({
  useTime: Number
})


watch(() => store.state.penInfo, (val, old) => {
  penInfo.value = val
  penId.value = val.penId
  penType.value = val.penType
  rounds.value = val.penRoundsNumber
  canSubmit.value = true
  userRounds.value = val.rounds
  answer.value = []
})


const answer = ref([])

const timeOutAnswer = () => {
  //对答案处理
  let postAnswer = ''
  if(penType.value === '多选') {
    if(answer.value) {
      answer.value.sort()
      for(const answerKey of answer.value) {
        postAnswer = postAnswer ? postAnswer + ',' + answerKey : answerKey
      }
    }
  } else {
    postAnswer = answer.value[0] ? answer.value[0] : ''
  }
  api.timeOutAnswer(
      {
        "cid": store.state.competeInfo.cId,
        "answer": postAnswer,
        "roomId": store.state.roomId,
        "penId": penId.value,
        "type": store.state.competeInfo.currentType,
        "useTime": props.useTime,
        "rounds": rounds.value//当前在哪一题
      }
  ).then(res => {
    console.log(res)
  })


}
//提交答案
const submitAnswer = () => {
  let postAnswer = ''
  if(answer.value) {
    if(penType.value === '多选') {
      answer.value.sort()
      for(const answerKey of answer.value) {
        postAnswer = postAnswer ? postAnswer + ',' + answerKey : answerKey
      }
    } else {
      postAnswer = answer.value[0] ? answer.value[0] : ''
    }
  }
  emitter.emit('RankReload')


  api.checkAnswer(
      {
        "cid": store.state.competeInfo.cId,
        "answer": postAnswer,
        "roomId": store.state.roomId,
        "penId": penId.value,
        "type": store.state.competeInfo.currentType,
        "useTime": props.useTime,
        "rounds": rounds.value//当前在哪一题
      }
  ).then((res) => {
        if(res.code == 200) {
          canSubmit.value = false
          ElMessage({
            message: res.msg,
            type: 'success',
          })
        } else {
          ElMessage({
            message: res.msg,
            type: 'error',
          })
        }


      }
  )

  //动画题提交分数
  const submitScore = (score) => {

    api.checkAnswer(
        {
          "cid": store.state.competeInfo.cId,
          "answer": score,
          "score": score,
          "roomId": store.state.roomId,
          "penId": penId.value,
          "type": store.state.competeInfo.currentType,
          "useTime": props.useTime,
          "rounds": rounds.value//当前在哪一题
        }
    ).then((res) => {
          if(res.code == 200) {
            ElNotification({
              message: res.msg,
              type: 'success',
            })
          } else {
            ElNotification({
              message: res.msg,
              type: 'error',
            })
          }

        }
    )
  }

  onMounted(() => {
    window.addEventListener('message', e => {
      const data = e.data
      if(data.event === 'sendScore') {
        submitScore(data.score)
        //提交分数
      }

    })
  })
}

defineExpose({timeOutAnswer})


</script>

<style scoped lang="scss">
.pen-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .pen-rounds {
    height: 22px;
    font-size: 30px;
    font-family: PangMenZhengDao-3;
    font-weight: 400;
    color: #FFFFFF;
    margin-top: 64px;
    margin-left: 137px;

  }

  .pen-order {
    height: 36px;
    margin-top: 43px;
    margin-left: 137px;

    font-size: 21px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 36px;

  }

  .interactive-container {
    width: 1034px;
    height: 570px;
    margin-left: 120px;
    margin-top: 20px;

  }

  .pen-info {
    height: 360px;
    width: 1034px;
    margin-top: 36px;
    margin-left: 137px;
    font-size: 21px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 36px;

    p {
      width: 1034px;
      word-break: break-word;
      word-wrap: break-word;
      white-space: pre-line;
    }

    .pen-options {
      display: flex;
      flex-direction: column;
      justify-items: flex-start;
      align-items: flex-start;
      margin-top: 54px;


      .pen-options-radio {
        width: 255px;
        height: 20px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 30px;
        margin-bottom: 27px;

        &:deep(.el-radio__label) {
          font-size: 21px;
        }

        &:deep(.el-radio__inner) {
          width: 19px;
          height: 19px;
          margin-right: 14px;
        }

        &:deep(.el-radio__input.is-checked+.el-radio__label) {
          color: #FB9638;
        }

        &:deep(.el-radio__input.is-checked .el-radio__inner) {
          background: #FB9638;
          border-color: #FB9638;
        }


        //多选
        &:deep(.el-checkbox__label) {
          font-size: 21px;
        }

        &:deep(.el-checkbox__inner) {
          width: 19px;
          height: 19px;
          margin-right: 14px;

          ::after {
            color: #FB9638;
          }
        }

        &:deep(.el-checkbox__input.is-checked+.el-checkbox__label) {
          color: #FB9638;
        }

        &:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
          background: #FB9638;
          border-color: #FB9638;
        }

      }


    }
  }

  .pen-submit {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 102px;

    .submitAnswer {
      text-align: center;
      width: 212px;
      height: 58px;
      border: 2px solid #09A5F6;
      line-height: 58px;
      cursor: pointer;
    }

    p:nth-child(2) {
      margin-top: 24px;
      text-align: center;
      width: 959px;
      height: 20px;
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #FB9638;
      line-height: 40px;
    }

  }
}

</style>