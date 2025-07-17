import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from './Table'

function Generation() {
	const token = useSelector((state) => state.auth.token) || Cookies.get('token')
	const [generations, setGenerations] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (!token) return
		setLoading(true)
		setError(null)
		axios.get('http://185.239.50.252:8080/generation?page=1&size=100', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then(response => setGenerations(response.data.items))
			.catch(() => setError('Ошибка получения поколений'))
			.finally(() => setLoading(false))
	}, [token])

	return (
		<>
			<div className="content-wrapper">
				<div className="content-header" >
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0">Поколения</h1>
							</div>
						</div>
					</div>
				</div>
				<div style={{ position: 'relative' }}>
					<Table generations={generations} loading={loading} />
					
				</div>
			</div>
			<aside className="control-sidebar control-sidebar-dark"></aside>
		</>
	)
}
export default Generation