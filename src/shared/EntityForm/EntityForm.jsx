import ToastSuccess from '@shared/ToastSuccess'
import React from 'react'

/**
 * Базовый компонент формы для создания сущностей
 * @param {Object} props - Пропсы компонента
 * @param {string} props.title - Заголовок страницы
 * @param {string} props.pageTitle - Заголовок документа
 * @param {Object} props.formState - Состояние формы из хука useEntityForm
 * @param {Function} props.handleSubmit - Обработчик отправки формы
 * @param {React.ReactNode} props.customFields - Дополнительные поля формы
 * @param {string} props.descriptionPlaceholder - Плейсхолдер для поля описания
 */
const EntityForm = ({
	title,
	pageTitle,
	formState,
	handleSubmit,
	customFields,
	descriptionPlaceholder = 'Введите описание...'
}) => {
	const {
		title: titleValue,
		setTitle,
		description,
		setDescription,
		loading,
		showToast,
		toastText,
		closeToast
	} = formState

	// Устанавливаем заголовок документа
	React.useEffect(() => {
		document.title = pageTitle
	}, [pageTitle])

	return (
		<>
			<div className="content-wrapper">
				<div className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0">{title}</h1>
							</div>
						</div>
					</div>
				</div>
				<section className="content">
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-6 col-xs-12">
								<form onSubmit={handleSubmit}>
									<div className="form-group">
										<label htmlFor="id_title">Название:</label>
										<input
											type="text"
											name="title"
											maxLength="100"
											className="form-control"
											required
											id="id_title"
											value={titleValue}
											onChange={(e) => setTitle(e.target.value)}
											disabled={loading}
										/>
									</div>

									<div className="form-group">
										<label htmlFor="id_description">Описание:</label>
										<textarea
											name="description"
											className="form-control"
											id="id_description"
											cols="40"
											rows="10"
											value={description}
											onChange={(e) => setDescription(e.target.value)}
											disabled={loading}
											placeholder={descriptionPlaceholder}
										/>
									</div>

									{/* Дополнительные поля формы */}
									{customFields}

									<button
										id="submit"
										style={{ marginBottom: '30px', marginTop: '30px' }}
										className="btn btn-outline-success"
										type="submit"
										disabled={loading}
									>
										{loading ? 'Сохранение...' : 'Сохранить'}
									</button>
								</form>
							</div>
						</div>
					</div>
				</section>
			</div>
			<aside className="control-sidebar control-sidebar-dark">
			</aside>
			<ToastSuccess
				show={showToast}
				text={toastText}
				onClose={closeToast}
			/>
		</>
	)
}

export default EntityForm