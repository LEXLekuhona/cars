import { copyBrand, deleteBrand } from '@entities/brand/api'
import Table from '@pages/brands/Table'
import { API_PATHS, BASE_URL } from '@shared/config'
import ConfirmModal from '@shared/ConfirmModal'
import { useAllBrands } from '@shared/hooks/useAllBrands'
import ToastSuccess from '@shared/ToastSuccess'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function Brands() {
	document.title = 'CarsDB - Марка'
	const [searchParams, setSearchParams] = useSearchParams()
	const page = Number(searchParams.get('page')) || 1
	const size = Number(searchParams.get('size')) || 10
	const refresh = searchParams.get('refresh')
	const { data: brands, loading, refetch } = useAllBrands(`${BASE_URL}${API_PATHS.brands}`, 'items', size)
	const [allBrands, setAllBrands] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [deleteId, setDeleteId] = useState(null)
	const [showToast, setShowToast] = useState(false)
	const [toastText, setToastText] = useState('')

	useEffect(() => {
		setAllBrands(brands)
	}, [brands])

	// Обработка параметра refresh для обновления данных
	useEffect(() => {
		if (refresh === 'true') {
			refetch()
			// Убираем параметр refresh из URL
			setSearchParams({ page, size })
		}
	}, [refresh, refetch, setSearchParams, page, size])

	const handlePageChange = (newPage) => {
		setSearchParams({ page: newPage, size })
	}
	const handleSizeChange = (newSize) => {
		setSearchParams({ page: 1, size: newSize })
	}

	const handleDeleteClick = (id) => {
		setDeleteId(id)
		setShowModal(true)
	}

	const handleConfirmDelete = async () => {
		try {
			const token = Cookies.get('token')
			await deleteBrand(deleteId, token)
			setAllBrands(allBrands.filter(b => b.id !== deleteId))
			setToastText('Бренд успешно удалён')
			setShowToast(true)
		} catch {
			alert('Ошибка при удалении')
		}
		setShowModal(false)
		setDeleteId(null)
	}

	const getBaseTitle = (title) => title.replace(/ \(копия( \d+)?\)$/i, '')

	const handleCopy = async (brand) => {
		try {
			const token = Cookies.get('token')
			const baseTitle = getBaseTitle(brand.title)
			const titles = allBrands.map(b => b.title)
			let newTitle = baseTitle + ' (копия)'
			let copyIndex = 2
			while (titles.includes(newTitle)) {
				newTitle = `${baseTitle} (копия ${copyIndex})`
				copyIndex++
			}
			await copyBrand({ ...brand, title: newTitle }, token)
			setToastText('Запись успешно скопирована')
			setShowToast(true)
			refetch()
		} catch (error) {
			if (error.response && error.response.status === 409 && error.response.data && error.response.data.message) {
				setToastText(error.response.data.message)
				setShowToast(true)
			} else {
				alert('Ошибка при копировании')
			}
		}
	}

	const brandToDelete = allBrands.find(b => b.id === deleteId)
	const subtext = brandToDelete ? `Бренд "${brandToDelete.title}" будет удален навсегда. Это действие нельзя будет вернуть.` : ''

	return (
		<>
			<div className="content-wrapper">
				<div className="content-header" >
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0">Марка</h1>
							</div>
						</div>
					</div>
				</div>
				<div style={{ position: 'relative' }}>
					<Table
						brands={allBrands}
						loading={loading}
						page={page}
						size={size}
						onPageChange={handlePageChange}
						onSizeChange={handleSizeChange}
						onDelete={handleDeleteClick}
						onCopy={handleCopy}
					/>
					<ConfirmModal
						show={showModal}
						onConfirm={handleConfirmDelete}
						onCancel={() => setShowModal(false)}
						subtext={subtext}
					/>
					<ToastSuccess show={showToast} text={toastText} onClose={() => setShowToast(false)} />
				</div>
			</div>
			<aside className="control-sidebar control-sidebar-dark"></aside>
		</>
	)
}

export default Brands