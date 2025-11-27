import { createTireInch } from '@entities/tires-inch/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewTiresInch() {
	const formState = useEntityForm({
		createFunction: createTireInch,
		successMessage: 'Шины (дюймовая) успешно созданы',
		errorMessage: 'Ошибка при создании шин (дюймовая)',
		redirectPath: '/tires-inch',
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
			<label htmlFor="id_tires_inch">Шины (дюймовая):</label>
			<input
				type='text'
				name="tires_inch"
				className="form-control"
				required
				id="id_tires_inch"
				placeholder="Введите шины (дюймовая)"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить шины (дюймовая)"
			pageTitle="CarsDB - Создать новые шины (дюймовая)"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewTiresInch
