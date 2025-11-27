import { createTireInchHeight } from '@entities/tire-inch-height/api'
import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewTireInchHeight() {
	const formState = useEntityForm({
		createFunction: createTireInchHeight,
		successMessage: 'Высота успешно создана',
		errorMessage: 'Ошибка при создании высоты',
		redirectPath: '/tire-inch-height',
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
			<label htmlFor="id_tire_inch_height">Высота:</label>
			<input
				type='text'
				name="tire_inch_height"
				className="form-control"
				required
				id="id_tire_inch_height"
				placeholder="Введите высоту"
				value={formState.customFields.value}
				onChange={(e) => formState.updateCustomField('value', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title="Добавить высоту"
			pageTitle="CarsDB - Создать новую высоту"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

export default NewTireInchHeight
