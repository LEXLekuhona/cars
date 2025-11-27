import { createWheelDependency } from '@entities/wheel-dependencies/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewWheelDependencies() {
	const formState = useEntityForm({
		createFunction: createWheelDependency,
		successMessage: 'Связь успешно создана',
		errorMessage: 'Ошибка при создании связи',
		redirectPath: '/wheel-dependencies',
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
			<label htmlFor="id_wheel_dependencies">Связь:</label>
			<input
				type='text'
				name="wheel_dependencies"
				className="form-control"
				required
				id="id_wheel_dependencies"
				placeholder="Введите связь"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить связь"
			pageTitle="CarsDB - Создать новую связь"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewWheelDependencies
