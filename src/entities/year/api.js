import axios from 'axios';
import { BASE_URL } from '../../shared/config';

export const fetchYears = (page, size, token) =>
  axios.get(`${BASE_URL}/generations?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const createYear = (data, token) =>
  axios.post(`${BASE_URL}/generations`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateYear = (id, data, token) =>
  axios.put(`${BASE_URL}/generations/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteYear = (id, token) =>
  axios.delete(`${BASE_URL}/generations/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const copyYear = (year, token) =>
  axios.post(`${BASE_URL}/generations`, {
    title: year.title + ' (копия)',
    generation_id: year.generation_id
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }) 