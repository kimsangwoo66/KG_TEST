<template>
  <span>
    <Button @click="toggleFeature('init')">옵션 확인</Button> 
     &nbsp
    <Button @click="toggleFeature('manipulation')">그래프 조작</Button>

  </span>
  <init v-if="activeFeature === 'init'"/>
  <manipulation v-if="activeFeature === 'manipulation'"/>
</template>

<script setup>
import init from '~/components/init.vue'
import manipulation from '~/components/manipulation.vue'

const activeFeature = ref(null) // 현재 활성화된 기능을 저장


function toggleFeature(feature) {
  // 현재 활성화된 기능을 토글
      activeFeature.value = (activeFeature.value === feature) ? null : feature
}

</script>
