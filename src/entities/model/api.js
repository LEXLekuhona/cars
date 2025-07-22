import axios from 'axios';
import { BASE_URL } from '../../shared/config';

export const fetchModels = (page, size, token) =>
  axios.get(`${BASE_URL}/models?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const createModel = (data, token) =>
  axios.post(`${BASE_URL}/models`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateModel = (id, data, token) =>
  axios.put(`${BASE_URL}/models/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteModel = (id, token) =>
  axios.delete(`${BASE_URL}/models/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const copyModel = (model, token) =>
  axios.post(`${BASE_URL}/models`, {
    title: model.title + ' (копия)',
    brand_id: model.brand_id,
    generation_ids: model.generation_ids || []
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }) 