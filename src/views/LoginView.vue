<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const form = reactive({
  username: '',
  password: '',
})

const loading = ref(false)

async function onSubmit() {
  loading.value = true
  try {
    await auth.login({ username: form.username, password: form.password })
    const redirect = route.query.redirect || '/dashboard'
    await router.replace(String(redirect))
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
