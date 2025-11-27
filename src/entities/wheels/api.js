import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchWheels = (page, size, token) =>
  axios.get(`${BASE_URL}/wheels?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const createWheel = (data, token) =>
  axios.post(`${BASE_URL}/wheels`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateWheel = (id, data, token) =>
  axios.put(`${BASE_URL}/wheels/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteWheel = (id, token) =>
  axios.delete(`${BASE_URL}/wheels/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const copyWheel = (wheel, token) =>
  axios.post(`${BASE_URL}/wheels`, {
    title: wheel.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
