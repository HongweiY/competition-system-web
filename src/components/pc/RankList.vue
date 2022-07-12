<template>
  <div class="rank">
    <div class="rank-title">
      <div class="rank-circle left-top"></div>
      <div class="rank-circle right-top"></div>
      <img src="../../assets/images/game.svg">
      <p>实时积分排名：No.{{ rank }}</p>
      <div class="rank-circle left-bottom"></div>
      <div class="rank-circle right-bottom"></div>
    </div>
    <div class="rank-content">
      <div class="rank-list">
        <ul>
          <li v-for="(item,index) in rankList" :key="index" class="rank-list-item">
            <p class="rank-top3" :class="item.rank===1?'gold':item.rank===2?'silver':'copper'" v-if="item.rank<=3">
            </p>
            <p v-else class="other-rank">
              {{ item.rank }}
            </p>
            <p> {{ item.username }}</p>
            <p> {{ item.score }}</p>
          </li>
        </ul>
      </div>
      <div class="rank-page">
        <div class="rank-page-item" @click="prevPage()">
          <span>上一页</span>
        </div>
        <div class="rank-page-item" @click="nextPage()">
          <span>下一页</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref, inject} from "vue";
import storage from '../../utils/storage'
import store from "../../store";
import api from "../../api";
import emitter from "../../utils/bus";

const userInfo = storage.getItem('userInfo')
const rank = ref(0)
const page_size = 10
let rankList = ref([])
const total = ref()
const currentPage = ref(1)
let allPage = Math.ceil(total / page_size)
const prevPage = () => {
  if(currentPage.value <= 1) {
    return false
  } else {
    currentPage.value--
    getRankList()
  }

}
const nextPage = () => {
  if(currentPage.value >= allPage) {
    return false
  } else {
    currentPage.value++
    getRankList()
  }

}


// 获取排名列表
const getRankList = async() => {
  const params = {page: currentPage.value, page_size: page_size, cid: store.state.competeInfo.cId, uid: userInfo._id}
  try {
    const {data, page, currentRank} = await api.rankList(params)
    rankList.value = data
    total.value = page.total
    rank.value = currentRank
  } catch(e) {
    throw e
  }
}

onMounted(() => {
  getRankList()
  //查询
  emitter.on('RankReload', () => {
        getRankList()
      }
  );
})
</script>

<style scoped lang="scss">
.rank {
  height: 100%;
  width: 100%;

  .rank-title {
    display: flex;
    height: 42px;
    width: 264px;
    justify-content: center;
    align-items: center;
    border-top: 2px solid #01719E;
    position: relative;

    .rank-circle {
      width: 10px;
      height: 10px;
      background: #26CCEC;
      border-radius: 50%;
      position: absolute;
    }

    .left-top {
      left: -5px;
      top: -5px;
    }

    .left-bottom {
      left: -5px;
      bottom: -5px;
    }

    .right-top {
      right: -5px;
      top: -5px;
    }

    .right-bottom {
      right: -5px;
      bottom: -5px;
    }

    img {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }

    p {
      width: 184px;
      height: 16px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #A4D3E1;
      text-align: center;
    }

  }

  .rank-content {
    width: 266px;
    height: 700px;
    position: relative;
    border: 2px solid #0B4A6B;

    .rank-list {
      position: relative;
      padding-top: 28px;
      font-size: 21px;
      font-family: D-DIN;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 40px;

      .rank-list-item {
        display: flex;
        height: 38px;
        width: 100%;
        margin-bottom: 24px;
        justify-content: flex-start;
        align-items: center;

        p:nth-child(1) {
          background-size: 100% 100%;
          margin-left: 24px;
          text-align: center;
        }

        p:nth-child(2) {
          font-family: Source Han Sans CN;
          margin-left: 19px;
        }

        p:nth-child(3) {
          position: absolute;
          right: 20px;
        }

        .rank-top3 {
          width: 36px;
          height: 38px;
        }

        .gold {
          background-image: url("../../assets/images/gold.svg");
          background-size: 32px 38px;
        }

        .silver {
          background-image: url("../../assets/images/silver.svg");
        }

        .copper {
          background-image: url("../../assets/images/copper.svg");

        }

        .other-rank {
          width: 36px;
          height: 36px;
          border: 2px solid #26CCEC;
        }
      }
    }

    .rank-page {
      position: absolute;
      bottom: 10px;
      display: flex;
      justify-content: space-around;

      .rank-page-item {
        width: 102px;
        height: 40px;
        border: 2px solid #09A5F6;
        text-align: center;
        margin-left: 16px;
        margin-right: 16px;
        cursor: pointer;

        span {
          width: 52px;
          height: 17px;
          font-size: 18px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: #87B0BE;
          line-height: 40px;
        }


      }
    }
  }

}
</style>