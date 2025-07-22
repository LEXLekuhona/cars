import axios from 'axios'
import Cookies from 'js-cookie'
import { useCallback, useEffect, useState } from 'react'

export function useAllBrands(baseUrl, dataKey = 'items', pageSize = 100) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const token = Cookies.get('token')

  const fetchAll = useCallback(async () => {
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
      setData(all)
    } catch (e) {
      setError('Ошибка загрузки данных')
    } finally {
      setLoading(false)
    }
  }, [baseUrl, dataKey, pageSize, token])

  useEffect(() => {
    let isMounted = true
    fetchAll()
    return () => { isMounted = false }
  }, [fetchAll])

  return { data, loading, error, refetch: fetchAll }
} 