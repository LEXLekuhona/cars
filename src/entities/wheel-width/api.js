import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchWheelWidths = (page, size, token) =>
  axios.get(`${BASE_URL}/wheel-width?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const createWheelWidth = (data, token) =>
  axios.post(`${BASE_URL}/wheel-width`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const updateWheelWidth = (id, data, token) =>
  axios.put(`${BASE_URL}/wheel-width/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteWheelWidth = (id, token) =>
  axios.delete(`${BASE_URL}/wheel-width/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const copyWheelWidth = (wheelWidth, token) =>
  axios.post(`${BASE_URL}/wheel-width`, {
    title: wheelWidth.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
