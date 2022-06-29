<template>
  <div class="rank-container">
    <p @click="goBack" class="goBack"> &lt</p>
    <div class="middle-circle">
    </div>
    <div class="rank-header">
      <img src="../../assets/images/h5/rank-title.png">
    </div>
    <div class="rank-flowers">
      <img src="../../assets/images/h5/rank-flower-left.png">
      <img src="../../assets/images/h5/rank-flower-right.png">
    </div>
    <div class="answer-countdown">
      <div class="answer-countdown-content">
        <span>No.</span>
        <p>{{ rank }}</p>
      </div>
    </div>
    <div class="rank-list">
      <div class="rank-list-header">
        <img src="../../assets/images/h5/rank-rank.png">
        <img src="../../assets/images/h5/rank-player.png">
        <img src="../../assets/images/h5/score.svg">
        <img src="../../assets/images/h5/rank-score.png">
      </div>
      <div class="rank-list-content">
        <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto"
            :infinite-scroll-immediate="false"
            :infinite-scroll-delay="1000">
          <li v-for="(item,index) in RankList" :key="index" class="infinite-list-item">
            <p class="rank-top3" :class="item.rank===1?'gold':item.rank===2?'silver':'copper'" v-if="item.rank<=3">
            </p>
            <p v-else class="other-rank">
              {{ item.rank }}
            </p>
            <img :src="item.img">
            <p class="rank-username"> {{ item.username }}</p>
            <p class="rank-score"> {{ item.score }}</p>
          </li>

          <li style="position: fixed; bottom: 40px;left: 7%;background: linear-gradient(0deg, #FFBD19 0%, #FFE26D 100%);
               border-radius: 31px;" class="infinite-list-item">
            <p class="other-rank">
              {{ userRank.arrayIndex }}
            </p>
            <img :src="store.state.userInfo.img">
            <p class="rank-username"> {{ store.state.userInfo.username }}</p>
            <p class="rank-score"> {{ userRank.score }}</p>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>


<script setup>
import {onMounted, ref, onBeforeMount, onUpdated,} from "vue";
import store from "../../store";
import {ElMessage} from "element-plus";
import api from "../../api";
import {useRoute, useRouter} from 'vue-router'

const page_size = 8
const total = ref()
const currentPage = ref(1)
let allPage = Math.ceil(total / page_size)
const RankList = ref({})
const rank = ref()
const userRank = ref([])
const router = useRouter()
// 获取排名列表
const getRankList = async() => {
  const params = {
    page: currentPage.value,
    page_size: page_size,
    cid: store.state.competeInfo.cId,
    uid: store.state.userInfo._id
  }
  try {
    const {data, page, currentRank, currentRankInfo} = await api.rankList(params)
    RankList.value = data
    total.value = page.total
    rank.value = currentRank
    userRank.value = currentRankInfo


  } catch(e) {
    throw e
  }
}

const goBack = () => {
  router.go(-1)
}
const load = async() => {

  currentPage.value++
  const params = {
    page: currentPage.value,
    page_size: page_size,
    cid: store.state.competeInfo.cId,
    uid: store.state.userInfo._id
  }
  const {data} = await api.rankList(params)
  RankList.value = RankList.value.concat(data)
}

onBeforeMount(() => {

})

onUpdated(() => {

})
onMounted(() => {
  //查询
  getRankList()

})


</script>

<style scoped lang="scss">

.rank-container {
  background: #167FFB;
  color: #FFFFFF;
  width: 740px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .goBack {
    position: absolute;
    left: 40px;
    top: 34px;
    z-index: 10000
  }

  .middle-circle {
    position: absolute;
    width: 320px;
    height: 315px;
    background: #FFFFFF;
    opacity: 0.16;
    border-radius: 50%;
    top: 20px;
  }

  .rank-header {
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

  }

  .rank-flowers {
    width: 700px;
    height: 120px;
    margin-bottom: 97px;
    display: flex;
    justify-content: space-between;
    margin-top: -50px;

    img {
      width: 302px;
      height: 285px;
    }

    img:nth-child(1) {

    }

    img:nth-child(2) {

    }
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
        top: 4px;
        left: 7px;


      }

      span {
        font-size: 24px;
        position: absolute;
        top: 16px;
        left: -6px;
      }
    }


  }

  .rank-list {
    width: 700px;
    background: #FFFFFF;
    border-radius: 18px;

    .rank-list-header {
      width: 700px;
      height: 80px;
      background: #FEF2E8;
      border-radius: 18px 18px 0px 0px;
      display: flex;
      align-items: center;
      display: flex;

      img:nth-child(1) {
        width: 53px;
        height: 31px;
        margin-left: 69px;

      }

      img:nth-child(2) {
        width: 53px;
        height: 31px;
        margin-left: 78px;

      }

      img:nth-child(3) {
        width: 36px;
        height: 46px;
        margin-left: 302px;

      }

      img:nth-child(4) {
        width: 53px;
        height: 31px;
        margin-left: 5px;
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

    .rank-list-content {

      .infinite-list {
        padding-top: 21px;
        height: 800px;
        position: relative;
      }

      .infinite-list-item {
        margin: auto;
        width: 640px;
        height: 110px;
        background: #FCD2A5;
        border-radius: 31px;
        background: url("../../assets/images/h5/rank-item-bg.png");
        background-size: 100% 100%;
        margin-bottom: 27px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;

        img {
          width: 65px;
          height: 65px;
          margin-left: 56px;
        }

        .rank-username {
          width: 52px;
          height: 24px;
          font-size: 26px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: #633838;
          line-height: 30px;
          margin-left: 32px;
        }

        .rank-score {
          width: 51px;
          height: 27px;
          font-size: 36px;
          font-family: D-DIN;
          font-weight: bold;
          color: #FEF7E2;
          line-height: 30px;
          -webkit-text-stroke: 2px #A75D2F;
          text-stroke: 2px #A75D2F;
          position: absolute;
          right: 69px;
        }

        .rank-top3 {
          width: 60px;
          height: 72px;
        }

        p:nth-child(1) {
          background-size: 100% 100%;
          margin-left: 24px;
          text-align: center;
        }

        .gold {
          background-image: url("../../assets/images/h5/glad.png");
          background-size: 32px 38px;
        }

        .silver {
          background-image: url("../../assets/images/silver.svg");
        }

        .copper {
          background-image: url("../../assets/images/copper.svg");

        }

        .other-rank {
          width: 60px;
          font-size: 40px;
          font-family: D-DIN;
          font-weight: bold;
          color: #643838;
        }

      }

    }


  }


}


</style>