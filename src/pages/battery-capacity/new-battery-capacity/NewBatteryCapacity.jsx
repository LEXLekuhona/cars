import { createBatteryCapacity } from '@entities/battery-capacity/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewBatteryCapacity() {
	const formState = useEntityForm({
		createFunction: createBatteryCapacity,
		successMessage: 'Емкость успешно создана',
		errorMessage: 'Ошибка при создании емкости',
		redirectPath: '/battery-capacity',
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
			<label htmlFor="id_battery_capacity">Емкость:</label>
			<input
				type='text'
				name="battery_capacity"
				className="form-control"
				required
				id="id_battery_capacity"
				placeholder="Введите емкость"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить емкость"
			pageTitle="CarsDB - Создать новую емкость"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewBatteryCapacity
