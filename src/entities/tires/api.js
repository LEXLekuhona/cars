import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchTires = (page, size, token) =>
  axios.get(`${BASE_URL}/tires?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const createTire = (data, token) =>
  axios.post(`${BASE_URL}/tires`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateTire = (id, data, token) =>
  axios.put(`${BASE_URL}/tires/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteTire = (id, token) =>
  axios.delete(`${BASE_URL}/tires/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const copyTire = (tire, token) =>
  axios.post(`${BASE_URL}/tires`, {
    title: tire.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
