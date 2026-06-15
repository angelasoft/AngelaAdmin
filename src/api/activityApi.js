import staticHttp from './staticHttp'

export async function fetchActivityLogs() {
  const { data } = await staticHttp.get('mock/activity.json')
  return data
}
