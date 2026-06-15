import staticHttp from './staticHttp'

/**
 * 단원 목록 (public/mock — axios; 백엔드 준비 시 API 모듈로 교체)
 */
export async function fetchMembers() {
  const { data } = await staticHttp.get('mock/members.json')
  return data
}

export async function fetchMemberById(id) {
  const list = await fetchMembers()
  const found = list.find((m) => String(m.id) === String(id))
  if (!found) {
    const err = new Error('NOT_FOUND')
    err.code = 'NOT_FOUND'
    throw err
  }
  return found
}
