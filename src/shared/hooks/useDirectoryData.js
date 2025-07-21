import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from 'js-cookie'

export function useDirectoryData(baseUrl, dataKey = 'items', page, size) {
  const token = Cookies.get('token')

  const fetcher = async () => {
    const url = `${baseUrl}?page=${page}&size=${size}`
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data[dataKey] || []
  }

  const {
    data = [],
    isLoading: loading,
    error,
    isFetching
  } = useQuery({
    queryKey: [baseUrl, token, dataKey, page, size],
    queryFn: fetcher,
    keepPreviousData: true
  })

  return { data, loading, error, isFetching }
} 