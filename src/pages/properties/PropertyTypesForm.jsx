import { propertyTypesApi } from '@entities/properties/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function PropertyTypesForm() {
	const formState = useEntityForm({
		createFunction: propertyTypesApi.create,
		successMessage: 'Тип успешно создан',
		errorMessage: 'Ошибка при создании типа',
		redirectPath: '/property-types',
		initialValues: {}
	})

	const handleSubmit = (e) => {
		formState.handleSubmit(e, ({ title }) => ({
			title
		}))
	}

	const customFields = (
		<div className="form-group">
			<label htmlFor="id_property_type">Название типа:</label>
			<input
				type='text'
				name="property_type"
				className="form-control"
				required
				id="id_property_type"
				placeholder="Введите название типа (например: Шины)"
				value={formState.title}
				onChange={(e) => formState.setTitle(e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить тип свойства"
			pageTitle="CarsDB - Создать тип свойства"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default PropertyTypesForm
