import { copyTireInchHeight, deleteTireInchHeight } from '@entities/tire-inch-height/api'
import Table from '@pages/tire-inch-height/Table'
import { API_PATHS, BASE_URL } from '@shared/config'
import ConfirmModal from '@shared/ConfirmModal'
import { useAllDirectory } from '@shared/hooks/useAllDirectory'
import ToastSuccess from '@shared/ToastSuccess'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function TireInchHeight() {
	document.title = 'CarsDB - Высота (дюймовые шины)'
	const [searchParams, setSearchParams] = useSearchParams()
	const page = Number(searchParams.get('page')) || 1
	const size = Number(searchParams.get('size')) || 10
	const refresh = searchParams.get('refresh')
	const { data: tireInchHeights, loading, refetch } = useAllDirectory(`${BASE_URL}${API_PATHS.tireInchHeight}`, 'items', size)
	const [allTireInchHeights, setAllTireInchHeights] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [deleteId, setDeleteId] = useState(null)
	const [showToast, setShowToast] = useState(false)
	const [toastText, setToastText] = useState('')

	useEffect(() => {
		setAllTireInchHeights(tireInchHeights)
	}, [tireInchHeights])

	useEffect(() => {
		if (refresh === 'true') {
			refetch()
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
			await deleteTireInchHeight(deleteId, token)
			setAllTireInchHeights(allTireInchHeights.filter(tih => tih.id !== deleteId))
			setToastText('Высота успешно удалена')
			setShowToast(true)
		} catch {
			alert('Ошибка при удалении')
		}
		setShowModal(false)
		setDeleteId(null)
	}

	const getBaseTitle = (title) => title.replace(/ \(копия( \d+)?\)$/i, '')

	const handleCopy = async (tireInchHeight) => {
		try {
			const token = Cookies.get('token')
			const baseTitle = getBaseTitle(tireInchHeight.title)
			const titles = allTireInchHeights.map(tih => tih.title)
			let newTitle = baseTitle + ' (копия)'
			let copyIndex = 2
			while (titles.includes(newTitle)) {
				newTitle = `${baseTitle} (копия ${copyIndex})`
				copyIndex++
			}
			await copyTireInchHeight({ ...tireInchHeight, title: newTitle }, token)
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

	const tireInchHeightToDelete = allTireInchHeights.find(tih => tih.id === deleteId)
	const subtext = tireInchHeightToDelete ? `Высота "${tireInchHeightToDelete.title}" будет удалена навсегда. Это действие нельзя будет вернуть.` : ''

	return (
		<>
			<div className="content-wrapper">
				<div className="content-header" >
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0">Высота</h1>
							</div>
						</div>
					</div>
				</div>
				<div style={{ position: 'relative' }}>
					<Table
						tireInchHeights={allTireInchHeights}
						loading={loading}
						onDelete={handleDeleteClick}
						onCopy={handleCopy}
					/>
					{loading && (
						<div style={{
							position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
							background: 'rgba(255,255,255,0.5)', display: 'flex',
							alignItems: 'center', justifyContent: 'center', zIndex: 10
						}}>
						</div>
					)}
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

export default TireInchHeight
