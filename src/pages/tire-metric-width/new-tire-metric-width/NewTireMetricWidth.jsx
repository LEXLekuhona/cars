import { createTireMetricWidth } from '@entities/tire-metric-width/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewTireMetricWidth() {
	const formState = useEntityForm({
		createFunction: createTireMetricWidth,
		successMessage: 'Ширина успешно создана',
		errorMessage: 'Ошибка при создании ширины',
		redirectPath: '/tire-metric-width',
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
			<label htmlFor="id_tire_metric_width">Ширина:</label>
			<input
				type='text'
				name="tire_metric_width"
				className="form-control"
				required
				id="id_tire_metric_width"
				placeholder="Введите ширину"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить ширину"
			pageTitle="CarsDB - Создать новую ширину"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewTireMetricWidth
