<template>
  <div class="countdown">
    <p class="countdown-content">
      {{ countDownTime }}
    </p>
  </div>
</template>

<script>

import store from "../../store";
import dayjs from "dayjs"
import {onMounted, ref, onBeforeUnmount,watch} from "vue";


export default {
  name: "Countdown",

  setup() {
    const countDownTime = ref('00:00')

    let competeInfo = store.state.competeInfo

    let timer = ''

    const countDown = () => {
      let lastTime
      let currentType
      //查询当前模式
      switch(competeInfo['currentType']) {
        case 'must':
          lastTime = dayjs(competeInfo.startTime).unix() + 20 * 60 - dayjs().unix()
          currentType='disuse'
          break;
        case 'disuse':
          lastTime = dayjs(competeInfo.startTime).unix() + 20 * 60 + 20 * 60 - dayjs().unix()
          currentType='final'
          break;
        case 'final':
          lastTime = dayjs(competeInfo.endTime).unix()  - dayjs().unix()
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
            cId:competeInfo.cId,
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
      timer = setTimeout(function() {
        countDown()
      }, 1000)
    }

    watch(() => store.state.competeInfo, (val, old) => {
      competeInfo = val
      countDown()

    })

    onMounted(() => {
      countDown()
    })

    onBeforeUnmount(() => {
      clearTimeout(timer)
    })

    return {
      countDownTime
    }
  }
}
</script>

<style scoped lang="scss">
.countdown {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;


  .countdown-content {
    width: 140px;
    height: 22px;
    font-size: 30px;
    font-family: Furore;
    font-weight: 400;
    color: #FFFFFF;
    margin-left: 85px;
  }
}

</style>