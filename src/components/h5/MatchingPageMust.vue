<template>
  <div class="matching-page-must">
    <ul class="matching-user-item">
      <li v-for="(item,index) in userList" :key="index">
        <div class="head-username">
          <img :src="item.headImg">
          <p>{{ item.username }} </p>
        </div>
        <p class="matching-user-role matching-user">{{ `(${item.role})` }} </p>
        <p class="matching-user-username matching-user" v-show="item.username">{{ item.username }} </p>
        <p class="matching-user-username matching-user matching" v-show="!item.username">随机匹配中</p>
        <p class="matching-user-dept">{{ item.department }}</p>
      </li>
    </ul>
  </div>

</template>

<script setup>
import {inject, onMounted, reactive, ref} from "vue";

const $api = inject('$api')
const $message = inject('$message')

const userList = ref([])

const answerUserinfo = async() => {
  let params = {id: 1}

}

onMounted(() => {
  answerUserinfo()
})

</script>

<style scoped lang="scss">
.matching-page-must {
  width: 100%;
  height: 510px;
  background: url("../../assets/images/match-must.png");
  background-size: 100% 100%;

  .matching-user-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 22px;
    padding-left: 222px;


    li {
      display: flex;
      width: 739px;
      height: 50%;
      align-items: center;
      position: relative;

      .head-username {
        order: 1;
        width: 116px;
        height: 116px;
        border: 4px solid #26CCEC;
        margin-top: 48px;
        position: relative;

        img {
          width: 116px;
          height: 116px;
        }

        p {
          width: 116px;
          height: 30px;
          background: #000000;
          opacity: 0.5;
          position: absolute;
          bottom: 0;
          text-align: center;
          font-size: 20px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 36px;
        }
      }

      .matching-user-role {
        order: 2;
        width: 82px;
        height: 30px;
        font-size: 30px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 40px;
        opacity: 0.8;
        margin-left: 88px;
      }

      .matching-user-username {
        order: 3;
        height: 41px;
        font-size: 42px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 40px;
        margin-left: 172px;
      }

      .matching-user-dept {
        order: 4;
        height: 23px;
        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #454545;
        line-height: 40px;
        position: absolute;
      }

      .matching {
        margin-left: 52px;
      }

    }

    li:nth-child(2n) {
      flex-direction: row-reverse;
      margin-right: 220px;

      .matching-user-role {
        margin-right: 88px;
      }
    }

    li:nth-child(1) {
      .matching-user {
        margin-top: 40px;
      }

      .matching-user-dept {
        top: 12px;
        right: -100px;
      }
    }

    li:nth-child(2) {
      .matching-user {
        margin-top: 130px;
      }

      .matching {
        margin-right: -48px;
      }

      .matching-user-dept {
        top: 50px;
        left: 200px;
      }
    }

    li:nth-child(3) {

      .matching-user {
        margin-bottom: 60px;
      }

      .matching-user-dept {
        bottom: 10px;
        right: 200px;
      }
    }

    li:nth-child(4) {
      .matching-user {
        margin-top: 30px;
      }

      .matching-user-username {
        margin-right: 40px;
      }

      .matching {
        margin-right: 128px;
      }
      .matching-user-dept {
        bottom: -20px;
        left: -100px;
      }
    }
  }
}

</style>