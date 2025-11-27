import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchBatteryPolarities = (page, size, token) =>
  axios.get(`${BASE_URL}/battery-polarity?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const createBatteryPolarity = (data, token) =>
  axios.post(`${BASE_URL}/battery-polarity`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const updateBatteryPolarity = (id, data, token) =>
  axios.put(`${BASE_URL}/battery-polarity/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteBatteryPolarity = (id, token) =>
  axios.delete(`${BASE_URL}/battery-polarity/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const copyBatteryPolarity = (batteryPolarity, token) =>
  axios.post(`${BASE_URL}/battery-polarity`, {
    title: batteryPolarity.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
