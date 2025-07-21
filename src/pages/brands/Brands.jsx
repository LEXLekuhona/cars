import NewBrands from '@pages/brands/new-brands/Newbrands'
import Table from '@pages/brands/Table'
import { API_PATHS, BASE_URL } from '@shared/config'
import { useAllBrands } from '@shared/hooks/useAllBrands'
import { Route, Routes, useSearchParams } from 'react-router-dom'

function Brands() {
	document.title = 'CarsDB - Бренды'
	const [searchParams, setSearchParams] = useSearchParams()
	const page = Number(searchParams.get('page')) || 1
	const size = Number(searchParams.get('size')) || 10
	const { data: brands, loading } = useAllBrands(`${BASE_URL}${API_PATHS.brands}`, 'items', size)

	const handlePageChange = (newPage) => {
		setSearchParams({ page: newPage, size })
	}
	const handleSizeChange = (newSize) => {
		setSearchParams({ page: 1, size: newSize })
	}

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
				<div style={{ position: 'relative' }}>
					<Table
						brands={brands}
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

export default Brands