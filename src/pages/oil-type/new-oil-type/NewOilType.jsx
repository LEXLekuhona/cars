import { createOilType } from '@entities/oil-type/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewOilType() {
	const formState = useEntityForm({
		createFunction: createOilType,
		successMessage: 'Тип успешно создан',
		errorMessage: 'Ошибка при создании типа',
		redirectPath: '/oil-type',
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
			<label htmlFor="id_oil_type">Типы:</label>
			<input
				type='text'
				name="oil_type"
				className="form-control"
				required
				id="id_oil_type"
				placeholder="Введите тип"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить тип"
			pageTitle="CarsDB - Создать новый тип"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewOilType
