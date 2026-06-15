<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Odometer,
  User,
  Document,
} from '@element-plus/icons-vue'

defineProps({
  collapse: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['navigate'])

const route = useRoute()
const active = computed(() => route.path)

const items = [
  { path: '/dashboard', title: '대시보드', icon: Odometer },
  { path: '/members', title: '단원 관리', icon: User },
  { path: '/activity', title: '활동 기록', icon: Document },
]

function onSelect() {
  emit('navigate')
}
</script>

<template>
  <el-menu
    :default-active="active"
    :collapse="collapse"
    :collapse-transition="false"
    router
    class="side-menu"
    @select="onSelect"
  >
    <el-menu-item v-for="item in items" :key="item.path" :index="item.path">
      <el-icon><component :is="item.icon" /></el-icon>
      <template #title>{{ item.title }}</template>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.side-menu {
  border-right: none;
}
</style>
