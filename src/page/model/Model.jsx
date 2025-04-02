import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from './Table'
import { Route, Routes } from 'react-router-dom'
import NewModel from './new-model/NewModel'

function Model() {
	const token = useSelector((state) => state.auth.token) || Cookies.get('token')
	const [models, setModel] = useState([])
	const [page, setPage] = useState(1)
	const [size, setSize] = useState(1)

	useEffect(() => {
		const fetchModel = async () => {
			try {
				const response = await axios.get(`http://185.239.50.252:8080/models?page=${page}&size=${size}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				setModel(response.data.items)
			} catch (error) {

				console.error('Ошибка получения товаров:', error)
			}
		}

		if (token) {
			fetchModel()
		}
	}, [token, size, page])

	return (
		<>
			<Routes>
				<Route path='new' element={<NewModel />} />
			</Routes>
			< div className="content-wrapper" >
				{/* Content Header (Page header) */}
				< div className="content-header" >
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0">Модели</h1>
							</div>{/* /.col */}
						</div>{/* /.row */}
					</div>{/* /.container-fluid */}
				</div >
				{/* /.content-header */}

				<Table 
					size={size}
					page={page}
					models={models}
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
export default Model