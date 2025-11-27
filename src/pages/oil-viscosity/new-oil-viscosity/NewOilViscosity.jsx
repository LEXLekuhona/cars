import { createOilViscosity } from '@entities/oil-viscosity/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewOilViscosity() {
	const formState = useEntityForm({
		createFunction: createOilViscosity,
		successMessage: 'Вязкость успешно создана',
		errorMessage: 'Ошибка при создании вязкости',
		redirectPath: '/oil-viscosity',
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
			<label htmlFor="id_oil_viscosity">Вязкость:</label>
			<input
				type='text'
				name="oil_viscosity"
				className="form-control"
				required
				id="id_oil_viscosity"
				placeholder="Введите вязкость"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить вязкость"
			pageTitle="CarsDB - Создать новую вязкость"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewOilViscosity
