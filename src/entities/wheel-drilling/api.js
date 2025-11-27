import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchWheelDrillings = (page, size, token) =>
  axios.get(`${BASE_URL}/wheel-drilling?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const createWheelDrilling = (data, token) =>
  axios.post(`${BASE_URL}/wheel-drilling`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const updateWheelDrilling = (id, data, token) =>
  axios.put(`${BASE_URL}/wheel-drilling/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteWheelDrilling = (id, token) =>
  axios.delete(`${BASE_URL}/wheel-drilling/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const copyWheelDrilling = (wheelDrilling, token) =>
  axios.post(`${BASE_URL}/wheel-drilling`, {
    title: wheelDrilling.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
