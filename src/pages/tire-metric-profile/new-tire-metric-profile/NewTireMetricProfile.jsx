import { createTireMetricProfile } from '@entities/tire-metric-profile/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewTireMetricProfile() {
	const formState = useEntityForm({
		createFunction: createTireMetricProfile,
		successMessage: 'Профиль успешно создан',
		errorMessage: 'Ошибка при создании профиля',
		redirectPath: '/tire-metric-profile',
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
			<label htmlFor="id_tire_metric_profile">Профиль:</label>
			<input
				type='text'
				name="tire_metric_profile"
				className="form-control"
				required
				id="id_tire_metric_profile"
				placeholder="Введите профиль"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить профиль"
			pageTitle="CarsDB - Создать новый профиль"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewTireMetricProfile
