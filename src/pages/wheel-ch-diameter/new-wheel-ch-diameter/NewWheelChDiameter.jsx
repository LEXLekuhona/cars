import { createWheelChDiameter } from '@entities/wheel-ch-diameter/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewWheelChDiameter() {
	const formState = useEntityForm({
		createFunction: createWheelChDiameter,
		successMessage: 'Диаметр ЦО успешно создан',
		errorMessage: 'Ошибка при создании диаметра ЦО',
		redirectPath: '/wheel-ch-diameter',
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
			<label htmlFor="id_wheel_ch_diameter">Диаметр ЦО:</label>
			<input
				type='text'
				name="wheel_ch_diameter"
				className="form-control"
				required
				id="id_wheel_ch_diameter"
				placeholder="Введите диаметр ЦО"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить диаметр ЦО"
			pageTitle="CarsDB - Создать новый диаметр ЦО"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewWheelChDiameter
