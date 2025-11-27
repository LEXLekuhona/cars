import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchOilViscosities = (page, size, token) =>
  axios.get(`${BASE_URL}/oil-viscosity?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const createOilViscosity = (data, token) =>
  axios.post(`${BASE_URL}/oil-viscosity`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const updateOilViscosity = (id, data, token) =>
  axios.put(`${BASE_URL}/oil-viscosity/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteOilViscosity = (id, token) =>
  axios.delete(`${BASE_URL}/oil-viscosity/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const copyOilViscosity = (oilViscosity, token) =>
  axios.post(`${BASE_URL}/oil-viscosity`, {
    title: oilViscosity.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
