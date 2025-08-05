import { copyModel, deleteModel } from '@entities/model/api'
import NewModel from '@pages/model/new-model/NewModel'
import Table from '@pages/model/Table'
import { API_PATHS, BASE_URL } from '@shared/config'
import ConfirmModal from '@shared/ConfirmModal'
import { useAllDirectory } from '@shared/hooks/useAllDirectory'
import ToastSuccess from '@shared/ToastSuccess'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Route, Routes, useSearchParams } from 'react-router-dom'

function Model() {
	const [searchParams, setSearchParams] = useSearchParams()
	const page = Number(searchParams.get('page')) || 1
	const size = Number(searchParams.get('size')) || 10
	const { data: models, loading, refetch } = useAllDirectory(`${BASE_URL}${API_PATHS.models}`, 'items', size)
	const [allModels, setAllModels] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [deleteId, setDeleteId] = useState(null)
	const [showToast, setShowToast] = useState(false)
	const [toastText, setToastText] = useState('')

	useEffect(() => {
		setAllModels(models)
	}, [models])

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
			await deleteModel(deleteId, token)
			setAllModels(allModels.filter(m => m.id !== deleteId))
			setShowToast(true)
		} catch {
			alert('Ошибка при удалении')
		}
		setShowModal(false)
		setDeleteId(null)
	}

	const getBaseTitle = (title) => title.replace(/ \(копия( \d+)?\)$/i, '')

	const handleCopy = async (model) => {
		try {
			const token = Cookies.get('token')
			const baseTitle = getBaseTitle(model.title)
			const titles = allModels.map(m => m.title)
			let newTitle = baseTitle + ' (копия)'
			let copyIndex = 2
			while (titles.includes(newTitle)) {
				newTitle = `${baseTitle} (копия ${copyIndex})`
				copyIndex++
			}
			await copyModel({ ...model, title: newTitle }, token)
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

	const modelToDelete = allModels.find(m => m.id === deleteId)
	const subtext = modelToDelete ? `Модель "${modelToDelete.title}" будет удалена навсегда. Это действие нельзя будет вернуть.` : ''

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
								<h1 className="m-0">Модель</h1>
							</div>
						</div>
					</div>
				</div>
				<div style={{ position: 'relative' }}>
					<Table
						models={allModels}
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

export default Model