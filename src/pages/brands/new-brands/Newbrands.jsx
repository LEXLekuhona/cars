import { createBrand } from '@entities/brand/api'
import ToastSuccess from '@shared/ToastSuccess'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NewBrands() {
	document.title = 'CarsDB - Создать новую марку'
	const navigate = useNavigate()
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [loading, setLoading] = useState(false)
	const [showToast, setShowToast] = useState(false)
	const [toastText, setToastText] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		try {
			const token = Cookies.get('token')
			await createBrand({
				title: title,
				description: description
			}, token)

			setToastText('Марка успешно создана')
			setShowToast(true)

			// Редирект на страницу брендов с параметром для обновления
			setTimeout(() => {
				navigate('/brands?refresh=true')
			}, 1000)
		} catch (error) {
			if (error.response && error.response.status === 409 && error.response.data && error.response.data.message) {
				setToastText(error.response.data.message)
				setShowToast(true)
			} else {
				alert('Ошибка при создании марки')
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<div className="content-wrapper">
				<div className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0">Добавить марку автомобиля</h1>
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
											value={title}
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
											placeholder="Введите описание марки..."
										/>
									</div>

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
			<ToastSuccess show={showToast} text={toastText} onClose={() => setShowToast(false)} />
		</>
	)
}
export default NewBrands