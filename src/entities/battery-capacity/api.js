import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchBatteryCapacities = (page, size, token) =>
  axios.get(`${BASE_URL}/battery-capacity?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const createBatteryCapacity = (data, token) =>
  axios.post(`${BASE_URL}/battery-capacity`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const updateBatteryCapacity = (id, data, token) =>
  axios.put(`${BASE_URL}/battery-capacity/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteBatteryCapacity = (id, token) =>
  axios.delete(`${BASE_URL}/battery-capacity/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const copyBatteryCapacity = (batteryCapacity, token) =>
  axios.post(`${BASE_URL}/battery-capacity`, {
    title: batteryCapacity.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
