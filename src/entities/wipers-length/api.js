import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchWipersLengths = (page, size, token) =>
  axios.get(`${BASE_URL}/wipers-length?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const createWipersLength = (data, token) =>
  axios.post(`${BASE_URL}/wipers-length`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const updateWipersLength = (id, data, token) =>
  axios.put(`${BASE_URL}/wipers-length/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteWipersLength = (id, token) =>
  axios.delete(`${BASE_URL}/wipers-length/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const copyWipersLength = (wipersLength, token) =>
  axios.post(`${BASE_URL}/wipers-length`, {
    title: wipersLength.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
