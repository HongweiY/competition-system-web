<template>
  <router-view/>
</template>

<script>


import {inject, ref, onMounted} from "vue";
import {useStore} from 'vuex'
import {useRouter, useRoute} from 'vue-router'
import storage from "./utils/storage";
import dayjs from "dayjs";

export default {
  name: 'App',
  setup() {

    const $api = inject('$api')
    const store = useStore()
    const router = useRouter()
    const route = useRoute()


    const isMobile = () => {
      let agent = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return agent
    }

    //获取参数，添加到竞赛
    const dealUserInfo = async() => {
      //判断vuex中是否有用户信息或者房间id
      //如果有用户信息，执行短线重连

      //判断跳转信息是否齐全
      const cid = route.query.cid
      const token = route.query.token

      if(cid && token) {
        //齐全，第一次进入竞赛
        const params = {
          cid,
          token: token.replaceAll(' ', '+')
        }
        $api.dealUserInfo(params).then(async res => {
          store.commit('saveUserInfo', res.userInfo)
          store.commit('saveCompeteInfo', res.competeInfo)
          store.commit('saveToken', res.token)

          // 刷新页面
          if(isMobile()) {
            await router.push({
              path: 'answer_h5'
            })
          } else {
            await router.push({
              path: 'answer_pc'
            })
          }

        })
      } else {
        //查询混存中是否存在信息
        const competeInfo = storage.getItem('competeInfo')
        const userInfo = storage.getItem('userInfo')
        if(dayjs(competeInfo.startTime).isAfter(dayjs())) {
          if(isMobile()) {
            await router.push({
              path: 'h5_404'
            })
          } else {
            await router.push({
              path: 'pc_404'
            })
          }
        }
        if(dayjs(competeInfo.endTime).isBefore(dayjs())) {
          if(isMobile()) {
            await router.push({
              path: 'h5_404'
            })
          } else {
            await router.push({
              path: 'pc_404'
            })
          }
        }

        // 刷新页面
        if(isMobile()) {
          await router.push({
            path: 'answer_h5'
          })
        } else {
          await router.push({
            path: 'answer_pc'
          })
        }
      }


    }

    onMounted(() => {
      dealUserInfo()
    })
  },


}
</script>
<style lang="scss">
html, body, #app {
  width: 100%;
  height: 100vh;
}

@import 'assets/css/reset.css';
@import "assets/css/index.scss";
</style>