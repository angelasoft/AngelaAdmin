import axios from 'axios'

/** public 폴더 정적 리소스용 (baseURL = Vite BASE_URL) */
export default axios.create({
  baseURL: import.meta.env.BASE_URL || '/',
  timeout: 15_000,
})
