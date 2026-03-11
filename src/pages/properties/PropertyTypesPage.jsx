import { propertyTypesApi } from '@entities/properties/api'
import TableGeneric from '@shared/Table/Table'
import ConfirmModal from '@shared/ConfirmModal'
import ToastSuccess from '@shared/ToastSuccess'
import NavigationPreloader from '@widgets/Preloader/NavigationPreloader'
import { BASE_URL, API_PATHS } from '@shared/config'
import { useAllDirectory } from '@shared/hooks/useAllDirectory'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import TableActions from '@shared/Table/Actions'
import axios from 'axios'
import Cookies from 'js-cookie'

const getHeaders = () => {
	const token = Cookies.get('token')
	return {
		Authorization: `Bearer ${token}`,
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
}

const getBaseTitle = (title = '') => title.replace(/ \(копия( \d+)?\)$/i, '')

const buildCopyTitle = (existingTitles, baseTitle) => {
	let candidate = `${baseTitle} (копия)`
	let index = 2

	while (existingTitles.includes(candidate)) {
		candidate = `${baseTitle} (копия ${index})`
		index += 1
	}

	return candidate
}

function PropertyTypesPage() {
	useEffect(() => {
		document.title = 'CarsDB - Типы свойств'
	}, [])

	const [searchParams, setSearchParams] = useSearchParams()
	const size = Number(searchParams.get('size')) || 10
	const page = Number(searchParams.get('page')) || 1
	const refresh = searchParams.get('refresh')

	const endpoint = `${BASE_URL}${API_PATHS.propertyTypes}`
	const { data, loading, refetch } = useAllDirectory(endpoint, 'items', size)
	const [items, setItems] = useState([])
	const [isInitialLoad, setIsInitialLoad] = useState(true)
	const [showTable, setShowTable] = useState(false)
	const [tableRendered, setTableRendered] = useState(false)

	useEffect(() => {
		if (data) {
			setItems(data)
			if (isInitialLoad && !loading) {
				setIsInitialLoad(false)
				setShowTable(true)
			} else if (!isInitialLoad) {
				setShowTable(true)
			}
		}
	}, [data, isInitialLoad, loading])

	useEffect(() => {
		if (showTable && !tableRendered) {
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setTableRendered(true)
				})
			})
		}
	}, [showTable, tableRendered])

	useEffect(() => {
		if (refresh === 'true') {
			refetch()
			setSearchParams({ page, size })
		}
	}, [refresh, refetch, setSearchParams, page, size])

	const [showModal, setShowModal] = useState(false)
	const [deleteId, setDeleteId] = useState(null)
	const [showToast, setShowToast] = useState(false)
	const [toastText, setToastText] = useState('')

	const columns = useMemo(() => [
		{ Header: 'Тип', accessor: 'title' },
		{
			Header: 'Действия',
			id: 'actions',
			Cell: ({ row: { original } }) => (
				<TableActions
					onCopy={() => handleCopy(original)}
					onDelete={() => handleDeleteClick(original.id)}
				/>
			)
		}
	], [])

	const handleDeleteClick = (id) => {
		setDeleteId(id)
		setShowModal(true)
	}

	const handleConfirmDelete = async () => {
		try {
			await propertyTypesApi.delete(deleteId)
			setItems((prev) => prev.filter((item) => item.id !== deleteId))
			setToastText('Тип успешно удалён')
			setShowToast(true)
			window.dispatchEvent(new CustomEvent('directory-added'))
		} catch (err) {
			const msg = err.response?.data?.message || 'Ошибка при удалении'
			setToastText(msg)
			setShowToast(true)
		} finally {
			setShowModal(false)
			setDeleteId(null)
		}
	}

	const handleCopy = async (item) => {
		try {
			const titles = items.map((entry) => entry.title)
			const baseTitle = getBaseTitle(item.title)
			const newTitle = buildCopyTitle(titles, baseTitle)

			const payload = { ...item, title: newTitle }
			delete payload.id

			await propertyTypesApi.create(payload)

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

	const itemToDelete = items.find((entry) => entry.id === deleteId)
	const confirmText = itemToDelete
		? `Тип "${itemToDelete.title}" будет удален навсегда. Это действие нельзя будет вернуть.`
		: ''

	return (
		<>
			<NavigationPreloader show={loading && isInitialLoad || (showTable && !tableRendered)} />
			<div className="content-wrapper">
				<div className="content-header" >
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0">Типы свойств</h1>
							</div>
						</div>
					</div>
				</div>
				<div style={{ position: 'relative' }}>
					{showTable && !loading ? (
						<TableGeneric
							data={items}
							loading={loading}
							columns={columns}
							addLink="/property-types/new"
							addLabel="Добавить"
							lengthId="property_types_length"
							filterId="property_types_filter"
						/>
					) : null}
					<ConfirmModal
						show={showModal}
						onConfirm={handleConfirmDelete}
						onCancel={() => setShowModal(false)}
						subtext={confirmText}
					/>
					<ToastSuccess show={showToast} text={toastText} onClose={() => setShowToast(false)} />
				</div>
			</div>
			<aside className="control-sidebar control-sidebar-dark"></aside>
		</>
	)
}

export default PropertyTypesPage
