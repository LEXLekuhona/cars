import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import NewModel from './new-model/NewModel'
import Table from './Table'

function Model() {
	const token = useSelector((state) => state.auth.token) || Cookies.get('token')
	const [models, setModel] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (!token) return
		setLoading(true)
		setError(null)
		axios.get(`http://185.239.50.252:8080/models?page=1&size=100`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then(response => setModel(response.data.items))
			.catch(() => setError('Ошибка получения моделей'))
			.finally(() => setLoading(false))
	}, [token])

	return (
		<>
			<Routes>
				<Route path='new' element={<NewModel />} />
			</Routes>
			<div className="content-wrapper">
				<div className="content-header" >
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0">Модели</h1>
							</div>
						</div>
					</div>
				</div>
				{loading && <div>Загрузка...</div>}
				{error && <div style={{ color: 'red' }}>{error}</div>}
				<Table models={models} />
			</div>
			<aside className="control-sidebar control-sidebar-dark"></aside>
		</>
	)
}
export default Model