import { createYear } from '@entities/year/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewYear() {
	const formState = useEntityForm({
		createFunction: createYear,
		successMessage: 'Год успешно создан',
		errorMessage: 'Ошибка при создании года',
		redirectPath: '/year',
		initialValues: {
			customFields: {
				year: '2024'
			}
		}
	})

	const handleSubmit = (e) => {
		formState.handleSubmit(e, (data) => ({
			title: data.customFields.year,
			year: data.customFields.year
		}))
	}

	// Поле для года
	const customFields = (
		<div className="form-group">
			<label htmlFor="id_year">Год:</label>
			<input
				type='Number'
				name="year"
				className="form-control"
				required
				id="id_year"
				placeholder="Введите год"
				value={formState.customFields.year}
				min="1970"
				max="2030"
				onChange={(e) => formState.updateCustomField('year', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить год"
			pageTitle="CarsDB - Создать новый год"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewYear