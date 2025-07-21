import Table from '@pages/year/Table'
import { API_PATHS, BASE_URL, STORAGE_KEYS } from '@shared/config'
import { useAllDirectory } from '@shared/hooks/useAllDirectory'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

function Year() {
	const token = useSelector((state) => state.auth.token) || Cookies.get(STORAGE_KEYS.token)
	const [searchParams, setSearchParams] = useSearchParams()
	const page = Number(searchParams.get('page')) || 1
	const size = Number(searchParams.get('size')) || 10
	const { data: generations, loading } = useAllDirectory(`${BASE_URL}${API_PATHS.generations}`)

	const handlePageChange = (newPage) => {
		setSearchParams({ page: newPage, size })
	}
	const handleSizeChange = (newSize) => {
		setSearchParams({ page: 1, size: newSize })
	}

	return (
		<>
			<div className="content-wrapper">
				<div className="content-header" >
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0">Год</h1>
							</div>
						</div>
					</div>
				</div>
				<div style={{ position: 'relative' }}>
					<Table
						generations={generations}
						loading={loading}
						page={page}
						size={size}
						onPageChange={handlePageChange}
						onSizeChange={handleSizeChange}
					/>
				</div>
			</div>
			<aside className="control-sidebar control-sidebar-dark"></aside>
		</>
	)
}

export default Year