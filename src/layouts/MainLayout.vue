<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Fold, Expand, Menu } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth'
import SidebarMenu from '@/components/layout/SidebarMenu.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const drawerVisible = ref(false)
const isCollapsed = ref(false)
const isMobile = ref(false)

const mq = window.matchMedia('(max-width: 991px)')

function updateMq() {
  isMobile.value = mq.matches
  if (!mq.matches) {
    drawerVisible.value = false
  }
}

onMounted(() => {
  updateMq()
  mq.addEventListener('change', updateMq)
})

onUnmounted(() => {
  mq.removeEventListener('change', updateMq)
})

const breadcrumbs = computed(() =>
  route.matched
    .filter((r) => r.meta?.title)
    .map((r) => ({ title: r.meta.title, path: r.path })),
)

function onMenuNavigate() {
  drawerVisible.value = false
}

function logout() {
  auth.logout()
  router.push({ name: 'Login' })
}
</script>

<template>
  <el-container class="layout-root">
    <el-aside
      v-if="!isMobile"
      :width="isCollapsed ? '64px' : '240px'"
      class="aside"
    >
      <div class="logo" :class="{ compact: isCollapsed }">
        <span v-if="!isCollapsed">AngelaAdmin</span>
        <span v-else>A</span>
      </div>
      <SidebarMenu :collapse="isCollapsed" />
    </el-aside>

    <el-container direction="vertical" class="main-wrap">
      <el-header class="header" height="56px">
        <div class="header-left">
          <el-button
            v-if="isMobile"
            :icon="Menu"
            circle
            text
            @click="drawerVisible = true"
          />
          <el-button
            v-else
            :icon="isCollapsed ? Expand : Fold"
            circle
            text
            @click="isCollapsed = !isCollapsed"
          />
          <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item
              v-for="(b, i) in breadcrumbs"
              :key="i"
              :to="i < breadcrumbs.length - 1 ? b.path : undefined"
            >
              {{ b.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <span class="user-name">{{ auth.displayName || '관리자' }}</span>
          <el-dropdown trigger="click" @command="logout">
            <el-button text circle>
              <el-avatar :size="32">{{ (auth.displayName || 'A').slice(0, 1) }}</el-avatar>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">로그아웃</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main class="main">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>

    <el-drawer
      v-model="drawerVisible"
      direction="ltr"
      size="260px"
      :with-header="false"
      class="nav-drawer"
    >
      <div class="logo drawer-logo">AngelaAdmin</div>
      <SidebarMenu @navigate="onMenuNavigate" />
    </el-drawer>
  </el-container>
</template>

<style scoped>
.layout-root {
  min-height: 100%;
}

.aside {
  border-right: 1px solid var(--el-border-color-lighter);
  background: var(--el-bg-color);
  transition: width 0.2s ease;
}

.logo {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  color: var(--el-color-primary);
  border-bottom: 1px solid var(--el-border-color-lighter);
  letter-spacing: 0.02em;
}

.logo.compact {
  font-size: 1.25rem;
}

.drawer-logo {
  margin-bottom: 8px;
}

.main-wrap {
  min-width: 0;
  flex: 1;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--el-border-color-lighter);
  background: var(--el-bg-color);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.breadcrumb {
  min-width: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-name {
  font-size: 14px;
  color: var(--el-text-color-regular);
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.main {
  padding: 16px;
  background: var(--el-bg-color-page);
  min-height: calc(100vh - 56px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
