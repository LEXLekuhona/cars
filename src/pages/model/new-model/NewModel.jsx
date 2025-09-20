import { createModel } from '@entities/model/api'
import EntityForm from '@shared/EntityForm/EntityForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewModel() {
	const formState = useEntityForm({
		createFunction: createModel,
		successMessage: 'Модель успешно создана',
		errorMessage: 'Ошибка при создании модели',
		redirectPath: '/models'
	})

	const handleSubmit = (e) => {
		formState.handleSubmit(e, (data) => ({
			title: data.title,
			description: data.description
		}))
	}

	return (
		<EntityForm
			title="Добавить модель"
			pageTitle="CarsDB - Создать новую модель"
			formState={formState}
			handleSubmit={handleSubmit}
			descriptionPlaceholder="Введите описание модели..."
		/>
	)
}
export default NewModel