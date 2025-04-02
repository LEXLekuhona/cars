import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import NewBrands from './new-brands/Newbrands'
import Table from './Table'

function Brands() {
	document.title = 'CarsDB - Бренды'
	const token = useSelector((state) => state.auth.token) || Cookies.get('token')
	const [brands, setBrands] = useState([])
	const [page, setPage] = useState(1)
	const [size, setSize] = useState(1)

	useEffect(() => {
		const fetchBrands = async () => {
			try {
				const response = await axios.get(`http://185.239.50.252:8080/brands?page=${page}&size=${size}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				setBrands(response.data.items)
			} catch (error) {

				console.error('Ошибка получения товаров:', error)
			}
		}

		if (token) {
			fetchBrands()
		}
	}, [token, page, size])

	return (
		<>
			<Routes>
				<Route path='new' element={<NewBrands />} />
			</Routes>

			{/* Content Wrapper. Contains page content */}
			< div className="content-wrapper" >
				{/* Content Header (Page header) */}
				<div className="content-header" >
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0">Бренды</h1>
							</div>{/* /.col */}
						</div>{/* /.row */}
					</div>{/* /.container-fluid */}
				</div >
				{/* /.content-header */}


				<Table
					brands={brands}
					size={size}
					page={page}
					onChangeSize={(i) => setSize(i)}
					onChangePage={(i) => setPage(i)}
				/>

			</div >
			{/* /.content-wrapper */}

			{/* Control Sidebar */}
			<aside className="control-sidebar control-sidebar-dark">
				{/* Control sidebar content goes here */}
			</aside>
			{/* /.control-sidebar */}
		</>
	)
}
export default Brands