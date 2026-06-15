<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import { fetchMemberById } from '@/api/memberApi'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const member = ref(null)
const notFound = ref(false)

onMounted(async () => {
  loading.value = true
  notFound.value = false
  try {
    member.value = await fetchMemberById(route.params.id)
  } catch (e) {
    if (e?.code === 'NOT_FOUND') {
      notFound.value = true
    }
  } finally {
    loading.value = false
  }
})

function back() {
  router.push({ name: 'MemberList' })
}
</script>

<template>
  <div class="page">
    <div class="toolbar">
      <el-button :icon="ArrowLeft" text @click="back">목록</el-button>
      <h2 class="page-title">단원 상세</h2>
    </div>

    <el-skeleton v-if="loading" :rows="6" animated />

    <el-result v-else-if="notFound" icon="warning" title="단원을 찾을 수 없습니다" />

    <el-card v-else-if="member" shadow="never">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="ID">{{ member.id }}</el-descriptions-item>
        <el-descriptions-item label="이름">{{ member.name }}</el-descriptions-item>
        <el-descriptions-item label="역할">{{ member.role }}</el-descriptions-item>
        <el-descriptions-item label="연락처">{{ member.phone }}</el-descriptions-item>
        <el-descriptions-item label="이메일">{{ member.email }}</el-descriptions-item>
        <el-descriptions-item label="등록일">{{ member.joinedAt }}</el-descriptions-item>
        <el-descriptions-item label="상태">
          <el-tag :type="member.status === 'active' ? 'success' : 'info'" size="small">
            {{ member.status === 'active' ? '활동' : '휴면' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="메모">{{ member.note }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.page-title {
  margin: 0;
  font-size: 1.25rem;
}
</style>
