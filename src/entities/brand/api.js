import axios from 'axios';
import { BASE_URL } from '../../shared/config';

export const fetchBrands = (page, size, token) =>
  axios.get(`${BASE_URL}/brands?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const createBrand = (data, token) =>
  axios.post(`${BASE_URL}/brands`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateBrand = (id, data, token) =>
  axios.put(`${BASE_URL}/brands/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteBrand = (id, token) =>
  axios.delete(`${BASE_URL}/brands/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const copyBrand = (brand, token) =>
  axios.post(`${BASE_URL}/brands`, {
    title: brand.title + ' (копия)',
    model_ids: brand.model_ids || []
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }) 