import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchBatteries = (page, size, token) =>
  axios.get(`${BASE_URL}/batteries?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const createBattery = (data, token) =>
  axios.post(`${BASE_URL}/batteries`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateBattery = (id, data, token) =>
  axios.put(`${BASE_URL}/batteries/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteBattery = (id, token) =>
  axios.delete(`${BASE_URL}/batteries/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const copyBattery = (battery, token) =>
  axios.post(`${BASE_URL}/batteries`, {
    title: battery.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
