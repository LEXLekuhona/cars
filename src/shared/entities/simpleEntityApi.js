import axios from 'axios'
import Cookies from 'js-cookie'
import { API_PATHS, BASE_URL, STORAGE_KEYS } from '@shared/config'

const buildHeaders = () => {
	const token = Cookies.get(STORAGE_KEYS.token)
	return {
		Authorization: `Bearer ${token}`,
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
}

export const createSimpleEntityApi = (apiKey) => {
	const path = API_PATHS[apiKey]
	if (!path) {
		throw new Error(`API path is not defined for key "${apiKey}"`)
	}

	const endpoint = `${BASE_URL}${path}`

	return {
		create: (data) => axios.post(endpoint, data, { headers: buildHeaders() }),
		copy: (payload) => axios.post(endpoint, payload, { headers: buildHeaders() }),
		delete: (id) => axios.delete(`${endpoint}/${id}`, { headers: buildHeaders() })
	}
}

