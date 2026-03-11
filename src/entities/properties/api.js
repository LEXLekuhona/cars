import axios from 'axios'
import Cookies from 'js-cookie'
import { BASE_URL, API_PATHS } from '@shared/config'

const getHeaders = () => {
	const token = Cookies.get('token')
	return {
		Authorization: `Bearer ${token}`,
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
}

// Property Types API
export const propertyTypesApi = {
	getAll: () => axios.get(`${BASE_URL}${API_PATHS.propertyTypes}`, { headers: getHeaders() }),
	getById: (id) => axios.get(`${BASE_URL}${API_PATHS.propertyTypes}/${id}`, { headers: getHeaders() }),
	create: (data) => axios.post(`${BASE_URL}${API_PATHS.propertyTypes}`, data, { headers: getHeaders() }),
	update: (id, data) => axios.put(`${BASE_URL}${API_PATHS.propertyTypes}`, { ...data, id }, { headers: getHeaders() }),
	delete: (id) => axios.delete(`${BASE_URL}${API_PATHS.propertyTypes}/${id}`, { headers: getHeaders() })
}

// Properties API
export const propertiesApi = {
	getAll: (params = {}) => {
		const queryParams = new URLSearchParams(params).toString()
		return axios.get(`${BASE_URL}${API_PATHS.properties}${queryParams ? `?${queryParams}` : ''}`, { headers: getHeaders() })
	},
	getById: (id) => axios.get(`${BASE_URL}${API_PATHS.properties}/${id}`, { headers: getHeaders() }),
	create: (data) => axios.post(`${BASE_URL}${API_PATHS.properties}`, data, { headers: getHeaders() }),
	update: (id, data) => axios.put(`${BASE_URL}${API_PATHS.properties}`, { ...data, id }, { headers: getHeaders() }),
	delete: (id) => axios.delete(`${BASE_URL}${API_PATHS.properties}/${id}`, { headers: getHeaders() })
}

// Property Values API (backend: value, dir_property_id, dir_property)
export const propertyValuesApi = {
	getAll: (params = {}) => {
		const queryParams = new URLSearchParams(params).toString()
		return axios.get(`${BASE_URL}${API_PATHS.propertyValues}${queryParams ? `?${queryParams}` : ''}`, { headers: getHeaders() })
	},
	getById: (id) => axios.get(`${BASE_URL}${API_PATHS.propertyValues}/${id}`, { headers: getHeaders() }),
	create: (data) => {
		const body = { value: data.value ?? data.title, dir_property_id: data.dir_property_id ?? data.property_id }
		return axios.post(`${BASE_URL}${API_PATHS.propertyValues}`, body, { headers: getHeaders() })
	},
	update: (id, data) => axios.put(`${BASE_URL}${API_PATHS.propertyValues}`, { id, value: data.value ?? data.title }, { headers: getHeaders() }),
	delete: (id) => axios.delete(`${BASE_URL}${API_PATHS.propertyValues}/${id}`, { headers: getHeaders() })
}

/** Нормализация элемента из GET /property_values: value → title, dir_property → property_id */
export const mapPropertyValueFromApi = (item) => {
	if (!item) return item
	return {
		...item,
		title: item.value ?? item.title,
		property_id: item.dir_property?.id ?? item.property_id
	}
}
