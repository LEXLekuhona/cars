import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchTireMetricProfiles = (page, size, token) =>
  axios.get(`${BASE_URL}/tire-metric-profile?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const createTireMetricProfile = (data, token) =>
  axios.post(`${BASE_URL}/tire-metric-profile`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const updateTireMetricProfile = (id, data, token) =>
  axios.put(`${BASE_URL}/tire-metric-profile/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteTireMetricProfile = (id, token) =>
  axios.delete(`${BASE_URL}/tire-metric-profile/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const copyTireMetricProfile = (tireMetricProfile, token) =>
  axios.post(`${BASE_URL}/tire-metric-profile`, {
    title: tireMetricProfile.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
