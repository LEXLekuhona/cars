import axios from 'axios'
import { BASE_URL } from '../../shared/config'

export const fetchWheelDepartures = (page, size, token) =>
  axios.get(`${BASE_URL}/wheel-departure?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const createWheelDeparture = (data, token) =>
  axios.post(`${BASE_URL}/wheel-departure`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const updateWheelDeparture = (id, data, token) =>
  axios.put(`${BASE_URL}/wheel-departure/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteWheelDeparture = (id, token) =>
  axios.delete(`${BASE_URL}/wheel-departure/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const copyWheelDeparture = (wheelDeparture, token) =>
  axios.post(`${BASE_URL}/wheel-departure`, {
    title: wheelDeparture.title + ' (копия)',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
