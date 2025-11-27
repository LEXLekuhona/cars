import { createBatteryPolarity } from '@entities/battery-polarity/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewBatteryPolarity() {
	const formState = useEntityForm({
		createFunction: createBatteryPolarity,
		successMessage: 'Полярность успешно создана',
		errorMessage: 'Ошибка при создании полярности',
		redirectPath: '/battery-polarity',
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
			<label htmlFor="id_battery_polarity">Полярность:</label>
			<input
				type='text'
				name="battery_polarity"
				className="form-control"
				required
				id="id_battery_polarity"
				placeholder="Введите полярность"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить полярность"
			pageTitle="CarsDB - Создать новую полярность"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewBatteryPolarity
