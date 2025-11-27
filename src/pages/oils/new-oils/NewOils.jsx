import { createOil } from '@entities/oils/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewOils() {
	const formState = useEntityForm({
		createFunction: createOil,
		successMessage: 'Масла успешно созданы',
		errorMessage: 'Ошибка при создании масел',
		redirectPath: '/oils',
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
			<label htmlFor="id_oils">Масла:</label>
			<input
				type='text'
				name="oils"
				className="form-control"
				required
				id="id_oils"
				placeholder="Введите масла"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить масла"
			pageTitle="CarsDB - Создать новые масла"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewOils
