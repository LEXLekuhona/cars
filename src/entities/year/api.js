import axios from 'axios';
import { BASE_URL } from '../../shared/config';

export const fetchYears = (page, size, token) =>
  axios.get(`${BASE_URL}/year?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const createYear = (data, token) =>
  axios.post(`${BASE_URL}/year`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateYear = (id, data, token) =>
  axios.put(`${BASE_URL}/year/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteYear = (id, token) =>
  axios.delete(`${BASE_URL}/year/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  }); 