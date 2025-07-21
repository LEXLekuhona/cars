import NewModel from '@pages/model/new-model/NewModel'
import Table from '@pages/model/Table'
import { API_PATHS, BASE_URL } from '@shared/config'
import { useAllDirectory } from '@shared/hooks/useAllDirectory'
import { Route, Routes, useSearchParams } from 'react-router-dom'

function Model() {
	const [searchParams, setSearchParams] = useSearchParams()
	const page = Number(searchParams.get('page')) || 1
	const size = Number(searchParams.get('size')) || 10
	const { data: models, loading } = useAllDirectory(`${BASE_URL}${API_PATHS.models}`)

	const handlePageChange = (newPage) => {
		setSearchParams({ page: newPage, size })
	}
	const handleSizeChange = (newSize) => {
		setSearchParams({ page: 1, size: newSize })
	}

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
				<div style={{ position: 'relative' }}>
					<Table
						models={models}
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

export default Model