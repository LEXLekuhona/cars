import { createWheelDiameter } from '@entities/wheel-diameter/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewWheelDiameter() {
	const formState = useEntityForm({
		createFunction: createWheelDiameter,
		successMessage: 'Диаметр успешно создан',
		errorMessage: 'Ошибка при создании диаметра',
		redirectPath: '/wheel-diameter',
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

	const customFields = (
		<div className="form-group">
			<label htmlFor="id_wheel_diameter">Диаметр:</label>
			<input
				type='text'
				name="wheel_diameter"
				className="form-control"
				required
				id="id_wheel_diameter"
				placeholder="Введите диаметр"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить диаметр"
			pageTitle="CarsDB - Создать новый диаметр"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewWheelDiameter
