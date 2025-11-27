import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchTireMetricWidths = (page, size, token) =>
  axios.get(`${BASE_URL}/tire-metric-width?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const createTireMetricWidth = (data, token) =>
  axios.post(`${BASE_URL}/tire-metric-width`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const updateTireMetricWidth = (id, data, token) =>
  axios.put(`${BASE_URL}/tire-metric-width/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteTireMetricWidth = (id, token) =>
  axios.delete(`${BASE_URL}/tire-metric-width/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const copyTireMetricWidth = (tireMetricWidth, token) =>
  axios.post(`${BASE_URL}/tire-metric-width`, {
    title: tireMetricWidth.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
