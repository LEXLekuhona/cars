import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export function useAllDirectory(baseUrl, dataKey = 'items', pageSize = 100) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const token = Cookies.get('token')

  useEffect(() => {
    let isMounted = true
    async function fetchAll() {
      setLoading(true)
      setError(null)
      let all = []
      let page = 1
      let hasMore = true
      try {
        while (hasMore) {
          const url = `${baseUrl}?page=${page}&size=${pageSize}`
          const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
          })
          const items = response.data[dataKey] || []
          all = all.concat(items)
          hasMore = items.length === pageSize
          page++
        }
        if (isMounted) setData(all)
      } catch (e) {
        if (isMounted) setError('Ошибка загрузки данных')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchAll()
    return () => { isMounted = false }
  }, [baseUrl, dataKey, pageSize, token])

  return { data, loading, error }
} 