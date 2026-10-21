import axios from 'axios'

const TOKEN_KEY = 'angelaadmin_token'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15_000,
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    // 토큰 만료 등으로 인증이 풀리면 세션을 지우고 로그인 화면으로 보낸다.
    if (err.response?.status === 401 && err.config?.url !== '/auth/login') {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem('angelaadmin_display_name')
      window.location.assign('/login')
    }
    return Promise.reject(err)
  },
)

export default http
