import { createTire } from '@entities/tires/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewTires() {
	const formState = useEntityForm({
		createFunction: createTire,
		successMessage: 'Шины успешно созданы',
		errorMessage: 'Ошибка при создании шин',
		redirectPath: '/tires',
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
			<label htmlFor="id_tires">Шины:</label>
			<input
				type='text'
				name="tires"
				className="form-control"
				required
				id="id_tires"
				placeholder="Введите шины"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить шины"
			pageTitle="CarsDB - Создать новые шины"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewTires
