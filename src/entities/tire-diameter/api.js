import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchTireDiameters = (page, size, token) =>
  axios.get(`${BASE_URL}/tire-diameter?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const createTireDiameter = (data, token) =>
  axios.post(`${BASE_URL}/tire-diameter`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateTireDiameter = (id, data, token) =>
  axios.put(`${BASE_URL}/tire-diameter/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteTireDiameter = (id, token) =>
  axios.delete(`${BASE_URL}/tire-diameter/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const copyTireDiameter = (tireDiameter, token) =>
  axios.post(`${BASE_URL}/tire-diameter`, {
    title: tireDiameter.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
