import { createWheelDrilling } from '@entities/wheel-drilling/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewWheelDrilling() {
	const formState = useEntityForm({
		createFunction: createWheelDrilling,
		successMessage: 'Сверловка успешно создана',
		errorMessage: 'Ошибка при создании сверловки',
		redirectPath: '/wheel-drilling',
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
			<label htmlFor="id_wheel_drilling">Сверловка:</label>
			<input
				type='text'
				name="wheel_drilling"
				className="form-control"
				required
				id="id_wheel_drilling"
				placeholder="Введите сверловку"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить сверловку"
			pageTitle="CarsDB - Создать новую сверловку"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewWheelDrilling
