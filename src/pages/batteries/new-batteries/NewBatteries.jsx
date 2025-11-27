import { createBattery } from '@entities/batteries/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewBatteries() {
	const formState = useEntityForm({
		createFunction: createBattery,
		successMessage: 'Аккумуляторы успешно созданы',
		errorMessage: 'Ошибка при создании аккумуляторов',
		redirectPath: '/batteries',
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
			<label htmlFor="id_batteries">Аккумуляторы:</label>
			<input
				type='text'
				name="batteries"
				className="form-control"
				required
				id="id_batteries"
				placeholder="Введите аккумуляторы"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить аккумуляторы"
			pageTitle="CarsDB - Создать новые аккумуляторы"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewBatteries
