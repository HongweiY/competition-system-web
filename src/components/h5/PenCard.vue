<template>
  <div class="pen-container">
    <div class="pen-rounds">
      <p>第 {{ userRounds }} 轮</p>
    </div>
    <div class="pen-order">
      <p>{{ penInfo.penRoundsNumber }}</p>|<p>{{ penInfo.penType }}</p>
    </div>
    <template v-if="penInfo.src">
      <iframe :src="penInfo.src" class="interactive-container" ></iframe>
    </template>
    <template v-else>
      <div class="pen-info">
        <p class="pen-stem">{{ penInfo.stem }}</p>
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
      <div class="pen-submit" @click="submitAnswer()">
        <P>提交答案</P>
      </div>
    </template>
  </div>

</template>

<script setup>
import store from "../../store";
import {ElMessage} from 'element-plus'

import {ref, watch, defineExpose, defineProps,onMounted} from "vue";
import api from "../../api";

const penInfo = ref({})
const penId = ref({})
const rounds = ref({})
const penType = ref('')

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
  if(val.rounds != 1) {
    userRounds.value = val.rounds
  }
})


const answer = ref([])

const timeOutAnswer = () => {
  //对答案处理
  let postAnswer = ''
  if(penType.value === '多选') {
    if(answer) {
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
  answer.value = []

}
//提交答案
const submitAnswer = () => {
  let postAnswer = ''
  if(answer) {
    if(penType.value === '多选') {
      answer.value.sort()
      for(const answerKey of answer.value) {
        postAnswer = postAnswer ? postAnswer + ',' + answerKey : answerKey
      }
    } else {
      postAnswer = answer.value[0] ? answer.value[0] : ''
    }
  }


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
}
//动画题提交分数
const submitScore = (score) => {

  api.checkAnswer(
      {
        "cid": store.state.competeInfo.cId,
        "answer": score,
        "score":score,
        "roomId": store.state.roomId,
        "penId": penId.value,
        "type": store.state.competeInfo.currentType,
        "useTime": props.useTime,
        "rounds": rounds.value//当前在哪一题
      }
  ).then((res) => {
        if(res.code == 200) {
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
}
onMounted(()=>{
  window.addEventListener('message', e=>{
    const data = e.data
    if(data.event==='sendScore'){
      submitScore(data.score)
      //提交分数
    }

  })
})



defineExpose({timeOutAnswer})


</script>

<style scoped lang="scss">
.pen-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 24px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #4C160C;

  .pen-rounds {
    height: 23px;
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #A46F4B;
    line-height: 40px;
    align-self: flex-end;
    margin-top: 20px;
    margin-right: 43px;

  }

  .pen-order {
    width: 80px;
    height: 20px;
    font-size: 21px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #A46F4B;
    line-height: 40px;
    display: flex;
    margin-top: 18px;
    margin-left: 32px;
    justify-content: space-between;

    p:nth-child(1) {
      height: 25px;
      font-size: 36px;
      font-family: D-DIN;
      font-weight: bold;
      color: #A46F4B;
      line-height: 40px;
    }

  }

  .interactive-container {
    width: 732px;
    height: 895px;
    margin-top: 20px;
    margin-left: -16px;
    margin-bottom: -16px;

    body {
      overflow: hidden;
    }


  }

  .pen-info {
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #4C160C;
    line-height: 36px;
    margin: 28px 32px 53px 32px;

    .pen-stem {
      width: 650px;
      margin-bottom: 57px;
    }

    .pen-options {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-wrap: nowrap;
      height: 600px;
      overflow: scroll;


      .pen-options-radio {
        margin: auto;
        --el-color-primary: #FF4B00;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 40px;
        margin-bottom: 27px;
        width: 556px;
        background: #FFF2E9;
        border-radius: 31px;
        word-wrap: break-word;
        white-space: normal;
        padding: 20px;
        font-size: 21px;


        &:deep(.el-radio-button__inner) {
          font-size: 21px;
          background: #FFF2E9;
          width: 56px;
          border-radius: 31px;
          border: none;
          word-wrap: break-word;
          white-space: normal;


          p {
            height: auto;
            float: left;
            height: 100%;
            line-height: 35px;
          }


        }


      }

      &:deep(.el-radio-button__original-radio:checked+.el-radio-button__inner) {
        width: 506px;
        border: 1px solid #FF4B00;
        border-radius: 31px;
        font-size: 21px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #FF4B00;


      }
    }
  }

  .pen-submit {
    width: 506px;
    height: 62px;
    background: linear-gradient(-2deg, #FFA852, #FF5A00);
    border-radius: 31px;
    align-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    p {
      font-size: 21px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 30px;
    }

  }
}

</style>