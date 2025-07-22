import { copyYear, deleteYear } from '@entities/year/api'
import Table from '@pages/year/Table'
import { API_PATHS, BASE_URL, STORAGE_KEYS } from '@shared/config'
import ConfirmModal from '@shared/ConfirmModal'
import { useAllDirectory } from '@shared/hooks/useAllDirectory'
import ToastSuccess from '@shared/ToastSuccess'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

function Year() {
	const token = useSelector((state) => state.auth.token) || Cookies.get(STORAGE_KEYS.token)
	const [searchParams, setSearchParams] = useSearchParams()
	const page = Number(searchParams.get('page')) || 1
	const size = Number(searchParams.get('size')) || 10
	const { data: years, loading, refetch } = useAllDirectory(`${BASE_URL}${API_PATHS.years}`, 'items', size)
	const [allYears, setAllYears] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [deleteId, setDeleteId] = useState(null)
	const [showToast, setShowToast] = useState(false)
	const [toastText, setToastText] = useState('')

	useEffect(() => {
		setAllYears(years)
	}, [years])

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
			await deleteYear(deleteId, token)
			setAllYears(allYears.filter(y => y.id !== deleteId))
			setShowToast(true)
		} catch {
			alert('Ошибка при удалении')
		}
		setShowModal(false)
		setDeleteId(null)
	}

	const getBaseTitle = (title) => title.replace(/ \(копия( \d+)?\)$/i, '')

	const handleCopy = async (year) => {
		try {
			const token = Cookies.get('token')
			const baseTitle = getBaseTitle(year.title)
			const titles = allYears.map(y => y.title)
			let newTitle = baseTitle + ' (копия)'
			let copyIndex = 2
			while (titles.includes(newTitle)) {
				newTitle = `${baseTitle} (копия ${copyIndex})`
				copyIndex++
			}
			await copyYear({ ...year, title: newTitle }, token)
			setToastText('Запись успешно скопирована')
			setShowToast(true)
			refetch() // обновляем данные
		} catch (error) {
			if (error.response && error.response.status === 409 && error.response.data && error.response.data.message) {
				setToastText(error.response.data.message)
				setShowToast(true)
			} else {
				alert('Ошибка при копировании')
			}
		}
	}

	const yearToDelete = allYears.find(y => y.id === deleteId)
	const subtext = yearToDelete ? `Год "${yearToDelete.year_before}" будет удалён навсегда. Это действие нельзя будет вернуть.` : ''

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
						generations={allYears}
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

export default Year