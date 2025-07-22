import axios from 'axios';
import { BASE_URL } from '../../shared/config';

export const fetchGenerations = (page, size, token) =>
  axios.get(`${BASE_URL}/generation?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const createGeneration = (data, token) =>
  axios.post(`${BASE_URL}/generation`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateGeneration = (id, data, token) =>
  axios.put(`${BASE_URL}/generation/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteGeneration = (id, token) =>
  axios.delete(`${BASE_URL}/generation/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const copyGeneration = (generation, token) =>
  axios.post(`${BASE_URL}/generation`, {
    title: generation.title + ' (копия)',
    model_id: generation.model_id,
    year_ids: generation.year_ids || []
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }) 