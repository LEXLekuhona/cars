import { createWiper } from '@entities/wipers/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewWipers() {
	const formState = useEntityForm({
		createFunction: createWiper,
		successMessage: 'Дворники успешно созданы',
		errorMessage: 'Ошибка при создании дворников',
		redirectPath: '/wipers',
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
			<label htmlFor="id_wipers">Дворники:</label>
			<input
				type='text'
				name="wipers"
				className="form-control"
				required
				id="id_wipers"
				placeholder="Введите дворники"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить дворники"
			pageTitle="CarsDB - Создать новые дворники"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewWipers
