import YearForm from '@shared/YearForm/YearForm'
import { useEntityForm } from '@shared/hooks/useEntityForm'
import { createSimpleEntityApi } from '@shared/entities/simpleEntityApi'
import PropTypes from 'prop-types'

const SimpleDirectoryForm = ({ config }) => {
	const {
		label,
		path,
		apiKey,
		inputLabel = 'Название',
		inputPlaceholder = 'Введите значение...'
	} = config

	const documentTitle = `CarsDB - Создать ${label.toLowerCase()}`
	const api = createSimpleEntityApi(apiKey)

	const formState = useEntityForm({
		createFunction: api.create,
		successMessage: `${label} успешно созданы`,
		errorMessage: `Ошибка при создании "${label}"`,
		redirectPath: `/${path}`,
		initialValues: {}
	})

	const handleSubmit = (e) => {
		formState.handleSubmit(e, ({ title }) => ({
			title
		}))
	}

	const customFields = (
		<div className="form-group">
			<label htmlFor={`id_${path}`}>{inputLabel}:</label>
			<input
				type='text'
				name={path}
				className="form-control"
				required
				id={`id_${path}`}
				placeholder={inputPlaceholder}
				value={formState.title}
				onChange={(e) => formState.setTitle(e.target.value)}
				disabled={formState.loading}
			/>
		</div>
	)

	return (
		<YearForm
			title={`Добавить ${label.toLowerCase()}`}
			pageTitle={documentTitle}
			formState={formState}
			handleSubmit={handleSubmit}
			customFields={customFields}
		/>
	)
}

SimpleDirectoryForm.propTypes = {
	config: PropTypes.shape({
		label: PropTypes.string.isRequired,
		path: PropTypes.string.isRequired,
		apiKey: PropTypes.string.isRequired,
		inputLabel: PropTypes.string,
		inputPlaceholder: PropTypes.string
	}).isRequired
}

export default SimpleDirectoryForm

