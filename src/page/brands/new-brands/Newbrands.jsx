import Cookies from 'js-cookie'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function NewBrands() {
	document.title = 'CarsDB - Создать бренд'
	const token = useSelector((state) => state.auth.token) || Cookies.get('token')
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')


	const postBrands = async () => {
		const data = {
			title: name,
			// model_ids: [
			// 	1000
			// ]
		}
		console.log(data)
		// try {
		// 	const response = await axios.post(`http://185.239.50.252:8080/brands`, data, {
		// 		headers: {
		// 			Authorization: `Bearer ${token}`,
		// 			Accept: 'application/json',
		// 			ContentType: 'application/json'
		// 		},
		// 	})
		// 	console.log(response.data)
		// } catch (error) {
		// 	console.error('Ошибка при отправке данных:', error)
		// }
		setName('')
		setDescription('')
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		postBrands()
	}
	return (
		<>
			< div className="content-wrapper" >
				<div className="content-header" >
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0">Создать бренд</h1>
							</div>
						</div>
					</div>
				</div >
				<section className="content">
					<div className="container-fluid">
						<div className="raw">
							<div className="col-md-6 col-xs-12">

								<form
									onSubmit={handleSubmit}
								>

									<input
										type="hidden"
										name="csrfmiddlewaretoken" value="wvFzEmmvQfKSLOGC538LNYGfXrewknjt71lzxsQNWBpAfgFV0tBi0N13zf23UNRd"
									/>

									<div>
										<label htmlFor="id_name">Название:</label>
										<input
											type="text"
											name="name"
											maxLength="100"
											className="form-control"
											required
											id="id_name"
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</div>

									<div>
										<label htmlFor="id_description">Описание:</label>
										<textarea
											name="description"
											cols="40"
											rows="10"
											className="form-control"
											id="id_description"
											value={description}
											onChange={(e) => setDescription(e.target.value)}
										>
										</textarea>
									</div>

									<input
										id="submit"
										style={{ marginBottom: '30px', marginTop: '30px' }} className="btn btn-outline-success"
										type="submit"
										value="Сохранить"
									/>
								</form>
							</div>
						</div>
					</div>
				</section>
			</div >
			<aside className="control-sidebar control-sidebar-dark">
			</aside>
		</>
	)
}
export default NewBrands