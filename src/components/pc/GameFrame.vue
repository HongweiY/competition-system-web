<template>
    <iframe src="../src/assets/pen/Demo_2/index.html" width="389px" height="478px"></iframe>
</template>

<script setup>

import {ref, onMounted} from 'vue'

const score = ref(0)

onMounted(() => {
  window.addEventListener('message', getScore)
})

function getScore(event) {
  score.value = event.data.score
}
</script>

<style scoped>
.container{

}
h1 {
  font-size: 20px;
}
</style>