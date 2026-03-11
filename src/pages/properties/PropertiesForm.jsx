import { propertiesApi, propertyTypesApi } from '@entities/properties/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function PropertiesForm() {
	const { propertyTypeId } = useParams()
	const [propertyType, setPropertyType] = useState(null)
	const [propertyTypes, setPropertyTypes] = useState([])

	useEffect(() => {
		if (propertyTypeId) {
			propertyTypesApi.getById(propertyTypeId)
				.then(response => setPropertyType(response.data))
				.catch(() => {})
		} else {
			// Если нет propertyTypeId, загружаем все типы для выбора
			propertyTypesApi.getAll()
				.then(response => setPropertyTypes(response.data.items || []))
				.catch(() => {})
		}
	}, [propertyTypeId])

	const formState = useEntityForm({
		createFunction: propertiesApi.create,
		successMessage: 'Свойство успешно создано',
		errorMessage: 'Ошибка при создании свойства',
		redirectPath: propertyTypeId ? `/property-types/${propertyTypeId}/properties` : '/properties',
		initialValues: {}
	})

	const handleSubmit = (e) => {
		formState.handleSubmit(e, ({ title, customFields }) => {
			const payload = { title }
			if (propertyTypeId) {
				payload.property_type_id = parseInt(propertyTypeId)
			} else if (customFields?.property_type_id) {
				payload.property_type_id = customFields.property_type_id
			}
			return payload
		})
	}

	const customFields = (
		<>
			{!propertyTypeId && (
				<div className="form-group">
					<label htmlFor="id_property_type">Тип свойства:</label>
					<select
						name="property_type"
						className="form-control"
						required
						id="id_property_type"
						value={formState.customFields?.property_type_id || ''}
						onChange={(e) => formState.setCustomFields({ ...formState.customFields, property_type_id: parseInt(e.target.value) })}
						disabled={formState.loading}
					>
						<option value="">Выберите тип</option>
						{propertyTypes.map(type => (
							<option key={type.id} value={type.id}>{type.title}</option>
						))}
					</select>
				</div>
			)}
			<div className="form-group">
				<label htmlFor="id_property">Название свойства:</label>
				<input
					type='text'
					name="property"
					className="form-control"
					required
					id="id_property"
					placeholder="Введите название свойства (например: Ширина)"
					value={formState.title}
					onChange={(e) => formState.setTitle(e.target.value)}
					disabled={formState.loading}
				/>
			</div>
		</>
	)

	return (
		<YearForm
			title={propertyType ? `Добавить свойство для "${propertyType.title}"` : 'Добавить свойство'}
			pageTitle="CarsDB - Создать свойство"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default PropertiesForm
