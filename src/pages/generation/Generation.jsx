import { copyGeneration, deleteGeneration } from '@entities/generation/api'
import Table from '@pages/generation/Table'
import { API_PATHS, BASE_URL } from '@shared/config'
import ConfirmModal from '@shared/ConfirmModal'
import { useAllDirectory } from '@shared/hooks/useAllDirectory'
import ToastSuccess from '@shared/ToastSuccess'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function Generation() {
	const [searchParams, setSearchParams] = useSearchParams()
	const page = Number(searchParams.get('page')) || 1
	const size = Number(searchParams.get('size')) || 10
	const { data: generations, loading, refetch } = useAllDirectory(`${BASE_URL}${API_PATHS.generations}`, 'items', size)
	const [allGenerations, setAllGenerations] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [deleteId, setDeleteId] = useState(null)
	const [showToast, setShowToast] = useState(false)
	const [toastText, setToastText] = useState('')

	useEffect(() => {
		setAllGenerations(generations)
	}, [generations])

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
			await deleteGeneration(deleteId, token)
			setAllGenerations(allGenerations.filter(g => g.id !== deleteId))
			setShowToast(true)
		} catch {
			alert('Ошибка при удалении')
		}
		setShowModal(false)
		setDeleteId(null)
	}

	const getBaseTitle = (title) => title.replace(/ \(копия( \d+)?\)$/i, '')

	const handleCopy = async (generation) => {
		try {
			const token = Cookies.get('token')
			const baseTitle = getBaseTitle(generation.title)
			const titles = allGenerations.map(g => g.title)
			let newTitle = baseTitle + ' (копия)'
			let copyIndex = 2
			while (titles.includes(newTitle)) {
				newTitle = `${baseTitle} (копия ${copyIndex})`
				copyIndex++
			}
			await copyGeneration({ ...generation, title: newTitle }, token)
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

	const generationToDelete = allGenerations.find(g => g.id === deleteId)
	const subtext = generationToDelete ? `Поколение "${generationToDelete.title}" будет удалено навсегда. Это действие нельзя будет вернуть.` : ''

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
					<Table
						generations={allGenerations}
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

export default Generation