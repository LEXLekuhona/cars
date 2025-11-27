import { createTireDiameter } from '@entities/tire-diameter/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewTireDiameter() {
	const formState = useEntityForm({
		createFunction: createTireDiameter,
		successMessage: 'Диаметр шин успешно создан',
		errorMessage: 'Ошибка при создании диаметра шин',
		redirectPath: '/tire-diameter',
		initialValues: {
			customFields: {
				value: ''
			}
		}
	})

	const handleSubmit = (e) => {
		formState.handleSubmit(e, (data) => ({
			title: data.customFields.value,
		}))
	}

	// Поле для диаметра шин
	const customFields = (
		<div className="form-group">
			<label htmlFor="id_tire_diameter">Диаметр шин:</label>
			<input
				type='text'
				name="tire_diameter"
				className="form-control"
				required
				id="id_tire_diameter"
				placeholder="Введите диаметр шин"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить диаметр шин"
			pageTitle="CarsDB - Создать новый диаметр шин"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewTireDiameter
