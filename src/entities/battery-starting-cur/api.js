import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchBatteryStartingCurs = (page, size, token) =>
  axios.get(`${BASE_URL}/battery-starting-cur?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const createBatteryStartingCur = (data, token) =>
  axios.post(`${BASE_URL}/battery-starting-cur`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const updateBatteryStartingCur = (id, data, token) =>
  axios.put(`${BASE_URL}/battery-starting-cur/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteBatteryStartingCur = (id, token) =>
  axios.delete(`${BASE_URL}/battery-starting-cur/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const copyBatteryStartingCur = (batteryStartingCur, token) =>
  axios.post(`${BASE_URL}/battery-starting-cur`, {
    title: batteryStartingCur.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
