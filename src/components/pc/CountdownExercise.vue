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
import {onMounted, ref, onBeforeUnmount, watch, onUnmounted} from "vue";


export default {
  name: "Countdown",

  setup(props, {emit}) {
    const countDownTime = ref('00:00')

    let competeInfo = store.state.competeInfo

    let timer = null
    let lastTime = 20 * 60

    const countDown = () => {

      //查询当前模式
      if(lastTime <= 0) {
        countDownTime.value = '00:00'
        clearTimeout(timer)
        timer = null
        //竞赛结束
        emit('competitionEnd', "end")

        return false
      }
      lastTime--
      let day = Math.floor(lastTime / 60 / 60 / 24)
      let hr = Math.floor(lastTime / 60 / 60 % 24)
      let min = Math.floor(lastTime / 60 % 60)
      let sec = lastTime % 60
      hr = hr > 9 ? hr : '0' + hr
      min = min > 9 ? min : '0' + min
      sec = sec > 9 ? sec : '0' + sec
      countDownTime.value = day + ':' + hr + ':' + min + ':' + sec
    }

    watch(() => store.state.competeInfo, (val, old) => {
      competeInfo = val
      countDown()

    })

    onMounted(() => {
      countDown()
      timer = setInterval(() => {
        countDown()
      }, 1000)


    })
    onUnmounted(() => {
      console.log('------')
      clearInterval(timer)
      timer = null
    })


    return {
      countDownTime,
      emit
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