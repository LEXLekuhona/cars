import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchTiresInch = (page, size, token) =>
  axios.get(`${BASE_URL}/tires-inch?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const createTireInch = (data, token) =>
  axios.post(`${BASE_URL}/tires-inch`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateTireInch = (id, data, token) =>
  axios.put(`${BASE_URL}/tires-inch/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteTireInch = (id, token) =>
  axios.delete(`${BASE_URL}/tires-inch/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const copyTireInch = (tireInch, token) =>
  axios.post(`${BASE_URL}/tires-inch`, {
    title: tireInch.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
