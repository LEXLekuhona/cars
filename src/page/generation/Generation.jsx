import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from './Table'

function Generation() {

	const token = useSelector((state) => state.auth.token) || Cookies.get('token')
	const [generations, setGenerations] = useState([])

	useEffect(() => {
		const fetchBrands = async () => {
			try {
				const response = await axios.get('http://185.239.50.252:8080/generation', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				setGenerations(response.data.items)
			} catch (error) {

				console.error('Ошибка получения товаров:', error)
			}
		}

		if (token) {
			fetchBrands()
		}
	}, [token])

	return (
		<>
			{/* Content Wrapper. Contains page content */}
			< div className="content-wrapper" >
				{/* Content Header (Page header) */}
				< div className="content-header" >
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0">Поколения</h1>
							</div>{/* /.col */}
						</div>{/* /.row */}
					</div>{/* /.container-fluid */}
				</div >
				{/* /.content-header */}

				<Table generations={generations} />
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
export default Generation