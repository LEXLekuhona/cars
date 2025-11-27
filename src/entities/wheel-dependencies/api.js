import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchWheelDependencies = (page, size, token) =>
  axios.get(`${BASE_URL}/wheel-dependencies?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const createWheelDependency = (data, token) =>
  axios.post(`${BASE_URL}/wheel-dependencies`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const updateWheelDependency = (id, data, token) =>
  axios.put(`${BASE_URL}/wheel-dependencies/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteWheelDependency = (id, token) =>
  axios.delete(`${BASE_URL}/wheel-dependencies/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const copyWheelDependency = (wheelDependency, token) =>
  axios.post(`${BASE_URL}/wheel-dependencies`, {
    title: wheelDependency.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
