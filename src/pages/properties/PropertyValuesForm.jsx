import { propertyValuesApi, propertiesApi } from '@entities/properties/api'
import YearForm from '@shared/YearForm/YearForm'
import AddPropertyModal from '@shared/AddPropertyModal/AddPropertyModal'
import { useEntityForm } from '@shared/hooks/useEntityForm'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function PropertyValuesForm() {
	const { propertyId } = useParams()
	const [property, setProperty] = useState(null)
	const [properties, setProperties] = useState([])
	const [showAddPropertyModal, setShowAddPropertyModal] = useState(false)

	useEffect(() => {
		if (propertyId) {
			propertiesApi.getById(propertyId)
				.then(response => {
					const raw = response.data
					setProperty({ ...raw, propertyType: raw.property_type })
				})
				.catch(() => {})
		} else {
			// Если нет propertyId, загружаем все свойства для выбора
			propertiesApi.getAll()
				.then(response => setProperties(response.data.items || []))
				.catch(() => {})
		}
	}, [propertyId])

	const formState = useEntityForm({
		createFunction: propertyValuesApi.create,
		successMessage: 'Значение успешно создано',
		errorMessage: 'Ошибка при создании значения',
		redirectPath: propertyId ? `/properties/${propertyId}/values` : '/property-values',
		initialValues: {}
	})

	const handleSubmit = (e) => {
		formState.handleSubmit(e, ({ title, customFields }) => {
			const payload = { title }
			if (propertyId) {
				payload.property_id = parseInt(propertyId)
			} else if (customFields?.property_id) {
				payload.property_id = customFields.property_id
			}
			return payload
		})
	}

	const customFields = (
		<>
			{!propertyId && (
				<div className="form-group">
					<label htmlFor="id_property">Свойство:</label>
					<div className="input-group">
						<select
							name="property"
							className="form-control"
							required
							id="id_property"
							value={formState.customFields?.property_id || ''}
							onChange={(e) => formState.setCustomFields({ ...formState.customFields, property_id: parseInt(e.target.value) })}
							disabled={formState.loading}
						>
							<option value="">Выберите свойство</option>
							{properties.map(prop => (
								<option key={prop.id} value={prop.id}>{prop.title}</option>
							))}
						</select>
						<div className="input-group-append">
							<button
								type="button"
								className="btn btn-outline-secondary"
								onClick={() => setShowAddPropertyModal(true)}
								disabled={formState.loading}
								title="Добавить свойство"
							>
								<i className="fa fa-plus" aria-hidden="true" />
							</button>
						</div>
					</div>
					<AddPropertyModal
						show={showAddPropertyModal}
						onClose={() => setShowAddPropertyModal(false)}
						onSuccess={(newProperty) => {
							setProperties(prev => [...prev, newProperty])
							formState.setCustomFields({ ...formState.customFields, property_id: newProperty.id })
							setShowAddPropertyModal(false)
						}}
					/>
				</div>
			)}
			<div className="form-group">
				<label htmlFor="id_property_value">Значение:</label>
				<input
					type='text'
					name="property_value"
					className="form-control"
					required
					id="id_property_value"
					placeholder="Введите значение (например: 255)"
					value={formState.title}
					onChange={(e) => formState.setTitle(e.target.value)}
					disabled={formState.loading}
				/>
			</div>
		</>
	)

	return (
		<YearForm
			title={property ? `Добавить значение для "${property.title}"` : 'Добавить значение'}
			pageTitle="CarsDB - Создать значение свойства"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default PropertyValuesForm
