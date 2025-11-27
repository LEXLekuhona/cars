import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchWipers = (page, size, token) =>
  axios.get(`${BASE_URL}/wipers?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const createWiper = (data, token) =>
  axios.post(`${BASE_URL}/wipers`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateWiper = (id, data, token) =>
  axios.put(`${BASE_URL}/wipers/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteWiper = (id, token) =>
  axios.delete(`${BASE_URL}/wipers/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const copyWiper = (wiper, token) =>
  axios.post(`${BASE_URL}/wipers`, {
    title: wiper.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
