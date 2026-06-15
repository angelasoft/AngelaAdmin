<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchMembers } from '@/api/memberApi'

const router = useRouter()
const loading = ref(false)
const rows = ref([])

onMounted(async () => {
  loading.value = true
  try {
    rows.value = await fetchMembers()
  } finally {
    loading.value = false
  }
})

function goDetail(row) {
  router.push({ name: 'MemberDetail', params: { id: row.id } })
}
</script>

<template>
  <div class="page">
    <div class="toolbar">
      <h2 class="page-title">단원 관리</h2>
      <el-input class="search" placeholder="검색 (UI만)" clearable disabled />
    </div>
    <el-card shadow="never">
      <el-table v-loading="loading" :data="rows" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="72" />
        <el-table-column prop="name" label="이름" min-width="120" />
        <el-table-column prop="role" label="역할" min-width="100" />
        <el-table-column prop="phone" label="연락처" min-width="140" />
        <el-table-column prop="joinedAt" label="등록일" min-width="120" />
        <el-table-column prop="status" label="상태" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'" size="small">
              {{ row.status === 'active' ? '활동' : '휴면' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="" width="100" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="goDetail(row)">상세</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.page-title {
  margin: 0;
  font-size: 1.25rem;
}

.search {
  width: 100%;
  max-width: 280px;
}
</style>
