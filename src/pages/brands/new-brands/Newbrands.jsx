import { createBrand } from '@entities/brand/api'
import EntityForm from '@shared/EntityForm/EntityForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'

function NewBrands() {
	const formState = useEntityForm({
		createFunction: createBrand,
		successMessage: 'Марка успешно создана',
		errorMessage: 'Ошибка при создании марки',
		redirectPath: '/brands'
	})

	const handleSubmit = (e) => {
		formState.handleSubmit(e, (data) => ({
			title: data.title,
			description: data.description
		}))
	}

	return (
		<EntityForm
			title="Добавить марку автомобиля"
			pageTitle="CarsDB - Создать новую марку"
			formState={formState}
			handleSubmit={handleSubmit}
			descriptionPlaceholder="Введите описание марки..."
		/>
	)
}
export default NewBrands