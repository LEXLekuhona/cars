import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchWheelChDiameters = (page, size, token) =>
  axios.get(`${BASE_URL}/wheel-ch-diameter?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const createWheelChDiameter = (data, token) =>
  axios.post(`${BASE_URL}/wheel-ch-diameter`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const updateWheelChDiameter = (id, data, token) =>
  axios.put(`${BASE_URL}/wheel-ch-diameter/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteWheelChDiameter = (id, token) =>
  axios.delete(`${BASE_URL}/wheel-ch-diameter/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const copyWheelChDiameter = (wheelChDiameter, token) =>
  axios.post(`${BASE_URL}/wheel-ch-diameter`, {
    title: wheelChDiameter.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
