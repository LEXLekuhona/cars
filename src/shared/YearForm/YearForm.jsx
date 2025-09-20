import ToastSuccess from '@shared/ToastSuccess'
import React from 'react'

/**
 * Компонент формы для создания года
 * @param {Object} props - Пропсы компонента
 * @param {string} props.title - Заголовок страницы
 * @param {string} props.pageTitle - Заголовок документа
 * @param {Object} props.formState - Состояние формы из хука useEntityForm
 * @param {Function} props.handleSubmit - Обработчик отправки формы
 * @param {React.ReactNode} props.customFields - Дополнительные поля формы
 */
const YearForm = ({
	title,
	pageTitle,
	formState,
	handleSubmit,
	customFields
}) => {
	const {
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

export default YearForm
