import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchOilTypes = (page, size, token) =>
  axios.get(`${BASE_URL}/oil-type?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const createOilType = (data, token) =>
  axios.post(`${BASE_URL}/oil-type`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const updateOilType = (id, data, token) =>
  axios.put(`${BASE_URL}/oil-type/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteOilType = (id, token) =>
  axios.delete(`${BASE_URL}/oil-type/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const copyOilType = (oilType, token) =>
  axios.post(`${BASE_URL}/oil-type`, {
    title: oilType.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
