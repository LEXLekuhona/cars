import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Кастомный хук для управления формой создания сущности
 * @param {Object} config - Конфигурация формы
 * @param {Function} config.createFunction - Функция API для создания сущности
 * @param {string} config.successMessage - Сообщение об успешном создании
 * @param {string} config.errorMessage - Сообщение об ошибке по умолчанию
 * @param {string} config.redirectPath - Путь для редиректа после создания
 * @param {Object} config.initialValues - Начальные значения полей
 * @returns {Object} Состояние формы и методы управления
 */
export const useEntityForm = ({
	createFunction,
	successMessage,
	errorMessage,
	redirectPath,
	initialValues = {}
}) => {
	const navigate = useNavigate()
	
	// Базовые поля состояния
	const [title, setTitle] = useState(initialValues.title || '')
	const [description, setDescription] = useState(initialValues.description || '')
	const [loading, setLoading] = useState(false)
	const [showToast, setShowToast] = useState(false)
	const [toastText, setToastText] = useState('')

	// Дополнительные поля (для специфичных сущностей)
	const [customFields, setCustomFields] = useState(initialValues.customFields || {})

	const updateCustomField = (fieldName, value) => {
		setCustomFields(prev => ({
			...prev,
			[fieldName]: value
		}))
	}

	const handleSubmit = async (e, prepareDataCallback) => {
		e.preventDefault()
		setLoading(true)

		try {
			const token = Cookies.get('token')
			
			// Подготавливаем данные для отправки
			const formData = prepareDataCallback ? 
				prepareDataCallback({ title, description, customFields }) :
				{ title, description, ...customFields }

			await createFunction(formData, token)

			setToastText(successMessage)
			setShowToast(true)

			// Редирект с параметром для обновления
			setTimeout(() => {
				navigate(`${redirectPath}?refresh=true`)
			}, 1000)
		} catch (error) {
			if (error.response && error.response.status === 409 && error.response.data && error.response.data.message) {
				setToastText(error.response.data.message)
				setShowToast(true)
			} else {
				alert(errorMessage)
			}
		} finally {
			setLoading(false)
		}
	}

	const closeToast = () => {
		setShowToast(false)
	}

	return {
		// Состояние
		title,
		setTitle,
		description,
		setDescription,
		loading,
		showToast,
		toastText,
		customFields,
		updateCustomField,
		
		// Методы
		handleSubmit,
		closeToast
	}
}
