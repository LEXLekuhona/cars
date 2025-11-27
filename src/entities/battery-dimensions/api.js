import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchBatteryDimensions = (page, size, token) =>
  axios.get(`${BASE_URL}/battery-dimensions?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const createBatteryDimension = (data, token) =>
  axios.post(`${BASE_URL}/battery-dimensions`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const updateBatteryDimension = (id, data, token) =>
  axios.put(`${BASE_URL}/battery-dimensions/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteBatteryDimension = (id, token) =>
  axios.delete(`${BASE_URL}/battery-dimensions/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const copyBatteryDimension = (batteryDimension, token) =>
  axios.post(`${BASE_URL}/battery-dimensions`, {
    title: batteryDimension.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
