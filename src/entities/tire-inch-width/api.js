import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchTireInchWidths = (page, size, token) =>
  axios.get(`${BASE_URL}/tire-inch-width?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const createTireInchWidth = (data, token) =>
  axios.post(`${BASE_URL}/tire-inch-width`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const updateTireInchWidth = (id, data, token) =>
  axios.put(`${BASE_URL}/tire-inch-width/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteTireInchWidth = (id, token) =>
  axios.delete(`${BASE_URL}/tire-inch-width/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const copyTireInchWidth = (tireInchWidth, token) =>
  axios.post(`${BASE_URL}/tire-inch-width`, {
    title: tireInchWidth.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
