<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const form = reactive({
  username: '',
  password: '',
})

const loading = ref(false)

function loginErrorMessage(status) {
  if (status === 401) return '아이디 또는 비밀번호가 올바르지 않습니다.'
  if (status === 429) return '로그인 시도가 너무 많습니다. 15분 후 다시 시도해 주세요.'
  return '로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
}

async function onSubmit() {
  loading.value = true
  try {
    await auth.login({ username: form.username, password: form.password })
    const redirect = route.query.redirect || '/dashboard'
    await router.replace(String(redirect))
  } catch (err) {
    ElMessage.error(loginErrorMessage(err?.response?.status))
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <el-card class="login-card" shadow="hover">
      <template #header>
        <div class="card-head">
          <span class="title">AngelaAdmin</span>
          <span class="sub">관리자 로그인</span>
        </div>
      </template>
      <el-form :model="form" label-position="top" @submit.prevent="onSubmit">
        <el-form-item label="아이디">
          <el-input v-model="form.username" autocomplete="username" clearable />
        </el-form-item>
        <el-form-item label="비밀번호">
          <el-input
            v-model="form.password"
            type="password"
            show-password
            autocomplete="current-password"
            clearable
          />
        </el-form-item>
        <el-button type="primary" class="submit" native-type="submit" :loading="loading" block>
          로그인
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(160deg, var(--el-color-primary-light-9), var(--el-bg-color-page));
}

.login-card {
  width: 100%;
  max-width: 400px;
}

.card-head {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--el-color-primary);
}

.sub {
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.submit {
  margin-top: 8px;
}
</style>
