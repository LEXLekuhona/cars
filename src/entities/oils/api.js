import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchOils = (page, size, token) =>
  axios.get(`${BASE_URL}/oils?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const createOil = (data, token) =>
  axios.post(`${BASE_URL}/oils`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateOil = (id, data, token) =>
  axios.put(`${BASE_URL}/oils/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteOil = (id, token) =>
  axios.delete(`${BASE_URL}/oils/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const copyOil = (oil, token) =>
  axios.post(`${BASE_URL}/oils`, {
    title: oil.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
