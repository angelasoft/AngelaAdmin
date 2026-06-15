<script setup>
import { onMounted, ref } from 'vue'
import { fetchActivityLogs } from '@/api/activityApi'

const loading = ref(false)
const logs = ref([])

onMounted(async () => {
  loading.value = true
  try {
    logs.value = await fetchActivityLogs()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="page">
    <h2 class="page-title">활동 기록</h2>
    <el-card shadow="never">
      <el-table v-loading="loading" :data="logs" stripe style="width: 100%">
        <el-table-column prop="at" label="일시" min-width="160" />
        <el-table-column prop="actor" label="주체" min-width="100" />
        <el-table-column prop="action" label="동작" min-width="120" />
        <el-table-column prop="detail" label="내용" min-width="220" show-overflow-tooltip />
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.page-title {
  margin: 0 0 16px;
  font-size: 1.25rem;
}
</style>
