import { createGeneration } from '@entities/generation/api'
import EntityForm from '@shared/EntityForm/EntityForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewGeneration() {
	const formState = useEntityForm({
		createFunction: createGeneration,
		successMessage: 'Поколение успешно создано',
		errorMessage: 'Ошибка при создании поколения',
		redirectPath: '/generation',
		initialValues: {
			customFields: {
				after: '1970',
				befor: '2025'
			}
		}
	})

	const handleSubmit = (e) => {
		formState.handleSubmit(e, (data) => ({
			title: data.title,
			year_before: data.customFields.after,
			year_after: data.customFields.befor
		}))
	}

	// Дополнительные поля для поколения (годы)
	const customFields = (
		<div className="col-lg-3 col-xs-12">
			<input
				type='Number'
				className="form-control"
				placeholder="Начало"
				value={formState.customFields.after}
				min="1970"
				max="2025"
				onChange={(e) => formState.updateCustomField('after', e.target.value)}
				disabled={formState.loading}
			/>
			<input
				type='Number'
				className="form-control"
				placeholder="Конец"
				value={formState.customFields.befor}
				min="1970"
				max="2025"
				onChange={(e) => formState.updateCustomField('befor', e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<EntityForm
			title="Добавить поколение"
			pageTitle="CarsDB - Создать новое поколение"
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
			descriptionPlaceholder="Введите описание поколения..."
		/>
	)
}
export default NewGeneration