import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchTireInchHeights = (page, size, token) =>
  axios.get(`${BASE_URL}/tire-inch-height?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const createTireInchHeight = (data, token) =>
  axios.post(`${BASE_URL}/tire-inch-height`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const updateTireInchHeight = (id, data, token) =>
  axios.put(`${BASE_URL}/tire-inch-height/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteTireInchHeight = (id, token) =>
  axios.delete(`${BASE_URL}/tire-inch-height/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const copyTireInchHeight = (tireInchHeight, token) =>
  axios.post(`${BASE_URL}/tire-inch-height`, {
    title: tireInchHeight.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
