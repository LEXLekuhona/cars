import { createWheel } from '@entities/wheels/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewWheels() {
	const formState = useEntityForm({
		createFunction: createWheel,
		successMessage: 'Диски успешно созданы',
		errorMessage: 'Ошибка при создании дисков',
		redirectPath: '/wheels',
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
			<label htmlFor="id_wheels">Диски:</label>
			<input
				type='text'
				name="wheels"
				className="form-control"
				required
				id="id_wheels"
				placeholder="Введите диски"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить диски"
			pageTitle="CarsDB - Создать новые диски"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewWheels
