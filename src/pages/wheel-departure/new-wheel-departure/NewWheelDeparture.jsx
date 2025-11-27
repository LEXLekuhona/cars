import { createWheelDeparture } from '@entities/wheel-departure/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewWheelDeparture() {
	const formState = useEntityForm({
		createFunction: createWheelDeparture,
		successMessage: 'Вылет успешно создан',
		errorMessage: 'Ошибка при создании вылета',
		redirectPath: '/wheel-departure',
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
			<label htmlFor="id_wheel_departure">Вылет:</label>
			<input
				type='text'
				name="wheel_departure"
				className="form-control"
				required
				id="id_wheel_departure"
				placeholder="Введите вылет"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить вылет"
			pageTitle="CarsDB - Создать новый вылет"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewWheelDeparture
