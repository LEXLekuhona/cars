import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchWheelDiameters = (page, size, token) =>
  axios.get(`${BASE_URL}/wheel-diameter?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const createWheelDiameter = (data, token) =>
  axios.post(`${BASE_URL}/wheel-diameter`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const updateWheelDiameter = (id, data, token) =>
  axios.put(`${BASE_URL}/wheel-diameter/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteWheelDiameter = (id, token) =>
  axios.delete(`${BASE_URL}/wheel-diameter/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const copyWheelDiameter = (wheelDiameter, token) =>
  axios.post(`${BASE_URL}/wheel-diameter`, {
    title: wheelDiameter.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
