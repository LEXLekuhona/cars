import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { fetchBrands } from '../../entities/brand/api'
import NewBrands from './new-brands/Newbrands'
import Table from './Table'

function Brands() {
	document.title = 'CarsDB - Бренды'
	const token = useSelector((state) => state.auth.token) || Cookies.get('token')
	const [brands, setBrands] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (!token) return
		setLoading(true)
		setError(null)
		fetchBrands(1, 100, token) // Получаем первую страницу, 100 брендов (или другой лимит)
			.then(response => {
				setBrands(response.data.items)
			})
			.catch(() => setError('Ошибка получения брендов'))
			.finally(() => setLoading(false))
	}, [token])

	return (
		<>
			<Routes>
				<Route path='new' element={<NewBrands />} />
			</Routes>
			<div className="content-wrapper">
				<div className="content-header" >
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0">Бренды</h1>
							</div>
						</div>
					</div>
				</div>
				{loading && <div>Загрузка...</div>}
				{error && <div style={{ color: 'red' }}>{error}</div>}
				<Table brands={brands} />
			</div>
			<aside className="control-sidebar control-sidebar-dark"></aside>
		</>
	)
}
export default Brands