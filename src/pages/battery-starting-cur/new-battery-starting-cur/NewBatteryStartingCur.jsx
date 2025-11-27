import { createBatteryStartingCur } from '@entities/battery-starting-cur/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewBatteryStartingCur() {
	const formState = useEntityForm({
		createFunction: createBatteryStartingCur,
		successMessage: 'Пусковой ток успешно создан',
		errorMessage: 'Ошибка при создании пускового тока',
		redirectPath: '/battery-starting-cur',
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
			<label htmlFor="id_battery_starting_cur">Пусковой ток:</label>
			<input
				type='text'
				name="battery_starting_cur"
				className="form-control"
				required
				id="id_battery_starting_cur"
				placeholder="Введите пусковой ток"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить пусковой ток"
			pageTitle="CarsDB - Создать новый пусковой ток"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewBatteryStartingCur
