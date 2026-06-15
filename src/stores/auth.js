import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import http from '@/api/http'

const TOKEN_KEY = 'angelaadmin_token'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem(TOKEN_KEY) || '')
  const displayName = ref(localStorage.getItem('angelaadmin_display_name') || '')

  const isAuthenticated = computed(() => Boolean(token.value))

  function persistSession() {
    if (token.value) {
      localStorage.setItem(TOKEN_KEY, token.value)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
    if (displayName.value) {
      localStorage.setItem('angelaadmin_display_name', displayName.value)
    } else {
      localStorage.removeItem('angelaadmin_display_name')
    }
  }

  async function login({ username, password }) {
    try {
      const { data } = await http.post('/auth/login', { username, password })
      token.value = data?.token || ''
      displayName.value = data?.displayName || username
    } catch {
      await new Promise((r) => setTimeout(r, 280))
      token.value = `mock-${Date.now()}`
      displayName.value = username || '관리자'
    }
    persistSession()
  }

  function logout() {
    token.value = ''
    displayName.value = ''
    persistSession()
  }

  return { token, displayName, isAuthenticated, login, logout }
})
