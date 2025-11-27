import { createWheelWidth } from '@entities/wheel-width/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewWheelWidth() {
	const formState = useEntityForm({
		createFunction: createWheelWidth,
		successMessage: 'Ширина успешно создана',
		errorMessage: 'Ошибка при создании ширины',
		redirectPath: '/wheel-width',
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
			<label htmlFor="id_wheel_width">Ширина:</label>
			<input
				type='text'
				name="wheel_width"
				className="form-control"
				required
				id="id_wheel_width"
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

export default NewWheelWidth
