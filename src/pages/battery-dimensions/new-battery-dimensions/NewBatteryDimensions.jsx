import { createBatteryDimension } from '@entities/battery-dimensions/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewBatteryDimensions() {
	const formState = useEntityForm({
		createFunction: createBatteryDimension,
		successMessage: 'Габариты успешно созданы',
		errorMessage: 'Ошибка при создании габаритов',
		redirectPath: '/battery-dimensions',
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
			<label htmlFor="id_battery_dimensions">Габариты:</label>
			<input
				type='text'
				name="battery_dimensions"
				className="form-control"
				required
				id="id_battery_dimensions"
				placeholder="Введите габариты"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить габариты"
			pageTitle="CarsDB - Создать новые габариты"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewBatteryDimensions
