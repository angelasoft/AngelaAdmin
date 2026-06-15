<script setup>
import { onMounted, ref } from 'vue'
import { Odometer, User, Document } from '@element-plus/icons-vue'
import http from '@/api/http'

const backendHealth = ref(null)
const healthLoading = ref(false)

onMounted(async () => {
  healthLoading.value = true
  try {
    const { data } = await http.get('/health')
    backendHealth.value = data
  } catch {
    backendHealth.value = null
  } finally {
    healthLoading.value = false
  }
})
</script>

<template>
  <div class="page">
    <h2 class="page-title">대시보드</h2>
    <el-row :gutter="16">
      <el-col :xs="24" :sm="8">
        <el-card shadow="never" class="stat">
          <div class="stat-inner">
            <el-icon class="stat-icon" :size="28"><Odometer /></el-icon>
            <div>
              <div class="stat-label">오늘 방문</div>
              <div class="stat-value">128</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="8">
        <el-card shadow="never" class="stat">
          <div class="stat-inner">
            <el-icon class="stat-icon" :size="28"><User /></el-icon>
            <div>
              <div class="stat-label">등록 단원</div>
              <div class="stat-value">42</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="8">
        <el-card shadow="never" class="stat">
          <div class="stat-inner">
            <el-icon class="stat-icon" :size="28"><Document /></el-icon>
            <div>
              <div class="stat-label">최근 활동</div>
              <div class="stat-value">15</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="mt" shadow="never">
      <template #header>
        <span>AngelaCore 연결</span>
      </template>
      <el-skeleton v-if="healthLoading" :rows="2" animated />
      <template v-else>
        <el-alert
          v-if="backendHealth"
          type="success"
          :closable="false"
          title="백엔드 헬스 응답"
          :description="JSON.stringify(backendHealth)"
        />
        <el-alert
          v-else
          type="info"
          :closable="false"
          title="백엔드에 연결되지 않았습니다."
          description="AngelaCore를 실행한 뒤 프록시(/api)로 /api/health 을 확인하세요."
        />
      </template>
    </el-card>
  </div>
</template>

<style scoped>
.page-title {
  margin: 0 0 16px;
  font-size: 1.25rem;
}

.stat {
  margin-bottom: 16px;
}

.stat-inner {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  color: var(--el-color-primary);
}

.stat-label {
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
}

.mt {
  margin-top: 8px;
}
</style>
